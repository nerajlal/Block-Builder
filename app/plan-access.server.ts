import type { authenticate } from "./shopify.server";

type Admin = Awaited<ReturnType<typeof authenticate.admin>>["admin"];
export type SectionKitPlan = "free" | "starter" | "pro";

// Presets in the library reuse their underlying theme block and count once.
export const BLOCK_HANDLES = [
  "trust-strip", "delivery-estimate", "product-highlights", "promo-banner",
  "stock-note", "payment-methods", "product-badge", "product-faq",
  "image-story", "comparison-table", "before-after", "info-tabs",
  "discount-code", "scroll-to-top", "announcement-bar", "collection-circles",
  "image-gallery", "media-tabs", "how-to-steps", "guarantee-card",
  "shipping-details", "size-guide", "video-spotlight", "gradient-heading",
  "specification-list", "care-instructions", "feature-grid", "brand-note",
  "offer-callout", "product-checklist",
] as const;

export type BlockHandle = (typeof BLOCK_HANDLES)[number];
const knownHandles = new Set<string>(BLOCK_HANDLES);
const namespace = "sectionkit";
const planCache = new Map<string, { plan: SectionKitPlan; expires: number }>();

export const accessKey = (handle: string) => `allow_${handle.replaceAll("-", "_")}`;

type Installation = {
  id: string;
  selected: { value: string } | null;
  applied: { value: string } | null;
};

export function parseSelected(value: string | undefined): BlockHandle[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((handle): handle is BlockHandle =>
      typeof handle === "string" && knownHandles.has(handle)))].slice(0, 3);
  } catch {
    return [];
  }
}

export function selectFreeBlock(selected: BlockHandle[], handle: string, intent: string): BlockHandle[] {
  if (!knownHandles.has(handle)) throw new Error("Unknown block type.");
  if (intent === "remove") return selected.filter((item) => item !== handle);
  if (intent !== "add") throw new Error("Unknown selection action.");
  if (selected.includes(handle as BlockHandle)) return selected;
  if (selected.length >= 3) throw new Error("Free allows up to three block types. Remove one before choosing another.");
  return [...selected, handle as BlockHandle];
}

async function installationContext(admin: Admin): Promise<{ shopId: string; installation: Installation }> {
  const response = await admin.graphql(`#graphql
    query SectionKitInstallation {
      shop { id }
      currentAppInstallation {
        id
        selected: metafield(namespace: "sectionkit", key: "selected_blocks") { value }
        applied: metafield(namespace: "sectionkit", key: "applied_access") { value }
      }
    }
  `);
  const result = await response.json() as {
    data?: { shop?: { id: string }; currentAppInstallation?: Installation };
    errors?: unknown[];
  };
  if (result.errors?.length || !result.data?.shop?.id || !result.data.currentAppInstallation?.id) {
    throw new Error("Could not read this store's SectionKit installation.");
  }
  return { shopId: result.data.shop.id, installation: result.data.currentAppInstallation };
}

function partnerConfiguration() {
  const orgId = process.env.SHOPIFY_PARTNER_ORG_ID;
  const appId = process.env.SHOPIFY_PARTNER_APP_ID;
  const token = process.env.SHOPIFY_PARTNER_API_TOKEN;
  if (!orgId || !appId || !token || !/^\d+$/.test(orgId) || !/^\d+$/.test(appId)) {
    throw new Error("SectionKit plan verification is not configured.");
  }
  return { orgId, appId, token };
}

export async function activePlan(shopId: string, force = false): Promise<SectionKitPlan | null> {
  const cached = planCache.get(shopId);
  if (!force && cached && cached.expires > Date.now()) return cached.plan;
  const { orgId, appId, token } = partnerConfiguration();
  const response = await fetch(`https://partners.shopify.com/${orgId}/api/2026-10/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    body: JSON.stringify({
      query: `query SectionKitSubscription($appId: ID!, $shopId: ID!) {
        activeSubscription(appId: $appId, shopId: $shopId) { items { handle } }
      }`,
      variables: { appId: `gid://shopify/App/${appId}`, shopId },
    }),
  });
  if (!response.ok) throw new Error("Shopify plan verification is temporarily unavailable.");
  const result = await response.json() as {
    data?: { activeSubscription: { items: Array<{ handle: string | null }> } | null };
    errors?: unknown[];
  };
  if (result.errors?.length || !result.data) throw new Error("Shopify plan verification failed.");
  const subscription = result.data.activeSubscription;
  if (!subscription) return null;
  const handles = subscription.items.map((item) => item.handle?.toLowerCase());
  let plan: SectionKitPlan;
  if (handles.includes((process.env.SHOPIFY_PRO_PLAN_HANDLE || "pro").toLowerCase())) plan = "pro";
  else if (handles.includes((process.env.SHOPIFY_STARTER_PLAN_HANDLE || "starter").toLowerCase())) plan = "starter";
  else if (handles.includes((process.env.SHOPIFY_FREE_PLAN_HANDLE || "free").toLowerCase())) plan = "free";
  else throw new Error("This Shopify subscription does not match a SectionKit plan.");
  planCache.set(shopId, { plan, expires: Date.now() + 60_000 });
  return plan;
}

async function applyAccess(admin: Admin, installation: Installation, plan: SectionKitPlan, selected: BlockHandle[]) {
  const desired = JSON.stringify({ plan, selected: [...selected].sort() });
  if (installation.applied?.value === desired) return;

  const enabled = plan === "free" ? new Set(selected) : new Set<string>(BLOCK_HANDLES);
  const metafields = BLOCK_HANDLES.map((handle) => ({
    ownerId: installation.id, namespace, key: accessKey(handle), type: "boolean",
    value: enabled.has(handle) ? "true" : "false",
  }));
  // metafieldsSet accepts at most 25 items. Record applied_access only in the
  // final batch so an interrupted sync is retried on the next authenticated load.
  metafields.push({ ownerId: installation.id, namespace, key: "applied_access", type: "json", value: desired });
  for (let index = 0; index < metafields.length; index += 25) {
    const response = await admin.graphql(`#graphql
      mutation SectionKitAccess($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) { userErrors { field message } }
      }
    `, { variables: { metafields: metafields.slice(index, index + 25) } });
    const result = await response.json() as {
      data?: { metafieldsSet?: { userErrors: Array<{ message: string }> } };
      errors?: unknown[];
    };
    if (result.errors?.length || result.data?.metafieldsSet?.userErrors.length || !result.data?.metafieldsSet) {
      throw new Error("Could not update theme block access. Please try again.");
    }
  }
}

export async function readPlanAccess(admin: Admin, forcePlanCheck = false) {
  const { shopId, installation } = await installationContext(admin);
  const plan = await activePlan(shopId, forcePlanCheck);
  const selected = parseSelected(installation.selected?.value);
  if (plan) await applyAccess(admin, installation, plan, selected);
  return { plan, selected, installation };
}

export async function updateFreeSelection(admin: Admin, handle: string, intent: string) {
  const { shopId, installation } = await installationContext(admin);
  const plan = await activePlan(shopId);
  if (plan !== "free") throw new Error("Block selection is only needed on the Free plan.");
  const selected = selectFreeBlock(parseSelected(installation.selected?.value), handle, intent);
  const response = await admin.graphql(`#graphql
    mutation SectionKitSelection($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) { userErrors { field message } }
    }
  `, { variables: { metafields: [{
    ownerId: installation.id, namespace, key: "selected_blocks", type: "json", value: JSON.stringify(selected),
  }] } });
  const result = await response.json() as {
    data?: { metafieldsSet?: { userErrors: Array<{ message: string }> } };
    errors?: unknown[];
  };
  if (result.errors?.length || result.data?.metafieldsSet?.userErrors.length || !result.data?.metafieldsSet) {
    throw new Error("Could not save your block selection. Please try again.");
  }
  await applyAccess(admin, installation, plan, selected);
  return selected;
}
