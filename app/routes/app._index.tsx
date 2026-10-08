import { useCallback, useEffect, useState } from "react";
import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { BlockPreview } from "../components/BlockPreview";
import "../../extensions/block-builder-theme/assets/block-builder.css";
import "../styles/block-library.css";

const blocks = [
  { handle: "trust-strip", title: "Trust strip", category: "Trust", description: "Compact reassurance badges below the add-to-cart button." },
  { handle: "delivery-estimate", title: "Delivery estimate", category: "Shipping", description: "A configurable delivery window with a clear estimate disclaimer." },
  { handle: "product-highlights", title: "Product highlights", category: "Product details", description: "Three scannable product benefits with a clean premium layout." },
  { handle: "promo-banner", title: "Promotion banner", category: "Offers", description: "A restrained promotional message for your product page." },
  { handle: "stock-note", title: "Stock note", category: "Availability", description: "An honest availability indicator using the selected variant's inventory." },
  { handle: "payment-methods", title: "Payment methods", category: "Trust", description: "Show only the payment types enabled for this store and market." },
  { handle: "product-badge", title: "Product badge", category: "Product details", description: "Call attention to a genuine product attribute with an editable badge." },
  { handle: "product-faq", title: "Product FAQ", category: "Product details", description: "Answer three common questions in a compact accordion." },
  { handle: "image-story", title: "Image story", category: "Product details", description: "Pair a merchant-selected image with a short product story." },
  { handle: "comparison-table", title: "Comparison table", category: "Product details", description: "Compare factual product details in a clear three-column table." },
  { handle: "before-after", title: "Before & after", category: "Product details", description: "Let shoppers compare two merchant-selected images with a slider." },
  { handle: "info-tabs", title: "Information tabs", category: "Product details", description: "Organize product details into accessible, keyboard-friendly tabs." },
  { handle: "discount-code", title: "Discount code", category: "Offers", description: "Show a copyable code that you have already created and tested in Shopify Discounts." },
  { handle: "scroll-to-top", title: "Scroll to top", category: "Utilities", description: "Add a floating back-to-top button across your storefront.", embed: true },
  { handle: "announcement-bar", title: "Product announcement", category: "Offers", description: "Add a product-page message, scrolling information, or responsive copyable coupon code." },
  { handle: "collection-circles", title: "Collection circles", category: "Product details", description: "Show up to three Shopify collections with circular images and links." },
  { handle: "image-gallery", title: "Product image gallery", category: "Product details", description: "Create a horizontal gallery from three images you choose in the theme editor." },
  { handle: "media-tabs", title: "Media tabs", category: "Product details", description: "Show up to three selected images or videos as tabs or a slider." },
  { handle: "how-to-steps", title: "How-to steps", category: "Product details", description: "Explain how to use your product in three clear steps." },
  { handle: "guarantee-card", title: "Guarantee card", category: "Trust", description: "Show a store policy you provide, with an optional link to its details." },
  { handle: "shipping-details", title: "Shipping details", category: "Shipping", description: "Present your actual shipping terms and link to your policy." },
  { handle: "size-guide", title: "Size guide", category: "Product details", description: "Add a compact measurement table shoppers can expand." },
  { handle: "video-spotlight", title: "Product video", category: "Product details", description: "Feature a video selected from your Shopify files." },
  { handle: "gradient-heading", title: "Gradient heading", category: "Product details", description: "Add a colorful, editable heading to the product page." },
  { handle: "specification-list", title: "Specification list", category: "Product details", description: "Display three factual product specifications in a clean list." },
  { handle: "care-instructions", title: "Care instructions", category: "Product details", description: "Show care guidance you provide for this product." },
  { handle: "feature-grid", title: "Feature grid", category: "Product details", description: "Present three product benefits with short supporting details." },
  { handle: "brand-note", title: "Brand note", category: "Product details", description: "Share a short message written by your brand, with optional attribution." },
  { handle: "offer-callout", title: "Offer callout", category: "Offers", description: "Highlight a real offer and its terms with an optional link." },
  { handle: "product-checklist", title: "Product checklist", category: "Product details", description: "List three factual product points at a glance." },
  { cardId: "black-friday", handle: "promo-banner", title: "Black Friday", category: "Offers", description: "A bold campaign banner with a real end-time countdown. The banner hides when the campaign ends.", setup: "In the theme editor, set Design to Black Friday, enter your offer, and add its real end date and time." },
  { cardId: "short-video-gallery", handle: "image-gallery", title: "Short video gallery", category: "Product details", description: "A swipeable row of four portrait videos selected from your Shopify files.", setup: "In the theme editor, set Gallery type to Portrait videos and choose your video files." },
] as const;

const designs: Record<string, { value: string; label: string }[]> = {
  "trust-strip": [{ value: "soft", label: "Soft" }, { value: "outline", label: "Outline" }, { value: "dark", label: "Dark" }],
  "promo-banner": [{ value: "dark", label: "Dark" }, { value: "cream", label: "Cream" }, { value: "outline", label: "Outline" }],
  "product-badge": [{ value: "soft", label: "Soft" }, { value: "outline", label: "Outline" }, { value: "dark", label: "Dark" }],
  "announcement-bar": [{ value: "dark", label: "Dark" }, { value: "cream", label: "Cream" }, { value: "outline", label: "Outline" }],
  "product-highlights": [{ value: "standard", label: "Standard" }, { value: "outline", label: "Outline" }, { value: "warm", label: "Warm" }],
  "guarantee-card": [{ value: "standard", label: "Standard" }, { value: "outline", label: "Outline" }, { value: "warm", label: "Warm" }],
  "shipping-details": [{ value: "standard", label: "Standard" }, { value: "outline", label: "Outline" }, { value: "warm", label: "Warm" }],
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop, apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function BlockLibrary() {
  const { shop, apiKey } = useLoaderData<typeof loader>();
  const shopify = useAppBridge();
  const [filter, setFilter] = useState("All");
  const [selectedDesign, setSelectedDesign] = useState<Record<string, string>>({});
  const [installed, setInstalled] = useState<Set<string> | null>(null);
  const [statusError, setStatusError] = useState(false);
  const refreshStatus = useCallback(async () => {
    try {
      const extensions = await shopify.app.extensions();
      const activeHandles = extensions
        .filter((extension) => extension.type === "theme_app_extension")
        .flatMap((extension) => extension.activations as Array<{ handle: string; status: string; activations: unknown[] }>)
        .filter((activation) => activation.status === "active" && activation.activations.length > 0)
        .map((activation) => activation.handle);
      setInstalled(new Set(activeHandles));
      setStatusError(false);
    } catch {
      setInstalled(null);
      setStatusError(true);
    }
  }, [shopify]);
  useEffect(() => {
    const initialCheck = window.setTimeout(() => { void refreshStatus(); }, 0);
    const onFocus = () => { void refreshStatus(); };
    const onVisible = () => { if (document.visibilityState === "visible") void refreshStatus(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(initialCheck);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refreshStatus]);
  const categories = ["All", ...new Set(blocks.map((block) => block.category))];
  const visible = filter === "All" ? blocks : blocks.filter((block) => block.category === filter);
  const editorUrl = (handle: string, embed: boolean, target = "mainSection") => {
    const blockId = `${apiKey}/${handle}`;
    const query = embed
      ? `context=apps&template=index&activateAppId=${blockId}`
      : `template=product&addAppBlockId=${blockId}&target=${target}`;
    return `https://${shop}/admin/themes/current/editor?${query}`;
  };
  const openThemeUrl = (embed: boolean) =>
    `https://${shop}/admin/themes/current/editor?${embed ? "context=apps&template=index" : "template=product"}`;
  return <s-page heading="Block Builder" inlineSize="large">
    <div className="block-intro">
      <s-section heading="Upgrade your product page">
        <s-paragraph>Choose a widget and click Install in theme. Shopify opens its theme editor so you can preview the widget, customize it, and save the theme.</s-paragraph>
        <s-banner tone="info">Works with Online Store 2.0 themes, including Dawn. Your existing theme files are not edited.</s-banner>
      </s-section>
      <s-section heading="How it works">
        <s-paragraph>Choose a block, open it in Shopify’s theme editor, then place it on your product template and save. For the Scroll to top utility, enable the app embed in the editor instead.</s-paragraph>
        <s-link href="/app/additional">View installation guide</s-link>
      </s-section>
    </div>
    <s-section heading="Block library">
      <s-paragraph>Browse 32 widget choices. Black Friday and Short video gallery have their own cards and share existing Shopify block types. Select their named design in the theme editor after adding them. Installed status is shown only when a choice has its own block type.</s-paragraph>
      <s-stack direction="inline" gap="small">
        {categories.map((category) => <s-button key={category} variant={filter === category ? "primary" : "secondary"} onClick={() => setFilter(category)}>{category}</s-button>)}
        <s-button variant="tertiary" onClick={() => { void refreshStatus(); }}>Refresh status</s-button>
      </s-stack>
      {statusError && <s-paragraph>Installation status is temporarily unavailable. Check your published theme in Shopify&apos;s theme editor.</s-paragraph>}
      <div className="block-grid">
        {visible.map((block) => {
          const cardId = "cardId" in block ? block.cardId : block.handle;
          const isPreset = "cardId" in block;
          return <article className="block-card" key={cardId}>
          <BlockPreview handle={cardId} style={selectedDesign[cardId]} />
          <div className="block-card__body"><span className="block-card__category">{block.category}</span><h3>{block.title}</h3>{!isPreset && installed?.has(block.handle) && <s-badge tone="success">Installed</s-badge>}<p>{block.description}</p>
            {"setup" in block && <p><strong>After adding:</strong> {block.setup}</p>}
            {designs[cardId] && <div className="block-card__design">
              <label htmlFor={`design-${cardId}`}>Preview design</label>
              <select id={`design-${cardId}`} value={selectedDesign[cardId] ?? designs[cardId][0].value} onChange={(event) => setSelectedDesign((current) => ({ ...current, [cardId]: event.target.value }))}>
                {designs[cardId].map((design) => <option key={design.value} value={design.value}>{design.label}</option>)}
              </select>
              <small>Choose this design in Shopify’s theme editor before saving.</small>
            </div>}
            <div className="block-card__actions">
              {isPreset
                ? <s-button href={editorUrl(block.handle, false)} target="_blank" accessibilityLabel={`Add ${block.title} in theme`}>Add in theme</s-button>
                : installed?.has(block.handle)
                ? <s-button href={openThemeUrl("embed" in block)} target="_blank" accessibilityLabel={`Edit ${block.title} in theme`}>Edit in theme</s-button>
                : installed === null && !statusError
                  ? <s-button disabled>Checking status…</s-button>
                  : <s-button href={editorUrl(block.handle, "embed" in block)} target="_blank" accessibilityLabel={`Install ${block.title} in theme`}>Install in theme</s-button>}
              {!("embed" in block) && (isPreset || (installed !== null && !installed.has(block.handle))) && <s-link href={editorUrl(block.handle, false, "newAppsSection")} target="_blank">Add as separate section</s-link>}
            </div>
          </div>
        </article>})}
      </div>
    </s-section>
  </s-page>;
}
export const headers: HeadersFunction = (args) => boundary.headers(args);
