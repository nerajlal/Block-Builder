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
  { handle: "announcement-bar", title: "Product announcement", category: "Offers", description: "Add a concise announcement to your product template with an optional link." },
  { handle: "collection-circles", title: "Collection circles", category: "Product details", description: "Show up to three Shopify collections with circular images and links." },
  { handle: "image-gallery", title: "Product image gallery", category: "Product details", description: "Create a horizontal gallery from three images you choose in the theme editor." },
  { handle: "media-tabs", title: "Media tabs", category: "Product details", description: "Organize up to three product images and descriptions in accessible tabs." },
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
  { handle: "trust-strip", style: "outline", title: "Outlined trust strip", category: "Trust", description: "A light outlined design for merchant-provided reassurance text." },
  { handle: "trust-strip", style: "dark", title: "Dark trust strip", category: "Trust", description: "A high-contrast dark design for merchant-provided reassurance text." },
  { handle: "promo-banner", style: "cream", title: "Cream promotion", category: "Offers", description: "A warm promotion design; choose Cream under Design in the theme editor." },
  { handle: "promo-banner", style: "outline", title: "Outlined promotion", category: "Offers", description: "A minimal promotion design; choose Outline under Design in the theme editor." },
  { handle: "product-badge", style: "outline", title: "Outlined badge", category: "Product details", description: "A simple outlined product badge; choose Outline under Design." },
  { handle: "product-badge", style: "dark", title: "Dark badge", category: "Product details", description: "A strong dark product badge; choose Dark under Design." },
  { handle: "announcement-bar", style: "cream", title: "Cream announcement", category: "Offers", description: "A warm product announcement; choose Cream under Style." },
  { handle: "announcement-bar", style: "outline", title: "Outlined announcement", category: "Offers", description: "A minimal product announcement; choose Outline under Style." },
  { handle: "product-highlights", style: "outline", title: "Outlined highlights", category: "Product details", description: "Three outlined product benefits; choose Outline under Design." },
  { handle: "product-highlights", style: "warm", title: "Warm highlights", category: "Product details", description: "Three benefits on a warm background; choose Warm under Design." },
  { handle: "guarantee-card", style: "outline", title: "Outlined guarantee", category: "Trust", description: "An outlined policy card; enter your actual guarantee and choose Outline." },
  { handle: "guarantee-card", style: "warm", title: "Warm guarantee", category: "Trust", description: "A warm policy card; enter your actual guarantee and choose Warm." },
  { handle: "shipping-details", style: "outline", title: "Outlined shipping details", category: "Shipping", description: "Outlined shipping terms; enter your actual policy and choose Outline." },
  { handle: "shipping-details", style: "warm", title: "Warm shipping details", category: "Shipping", description: "Warm shipping terms; enter your actual policy and choose Warm." },
] as const;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop, apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function BlockLibrary() {
  const { shop, apiKey } = useLoaderData<typeof loader>();
  const shopify = useAppBridge();
  const [filter, setFilter] = useState("All");
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
      <s-paragraph>Installed status reflects block types saved on your published theme. Design choices share their underlying block type; select the pictured Design or Style setting in the theme editor. Return here or refresh after saving.</s-paragraph>
      <s-stack direction="inline" gap="small">
        {categories.map((category) => <s-button key={category} variant={filter === category ? "primary" : "secondary"} onClick={() => setFilter(category)}>{category}</s-button>)}
        <s-button variant="tertiary" onClick={() => { void refreshStatus(); }}>Refresh status</s-button>
      </s-stack>
      {statusError && <s-paragraph>Installation status is temporarily unavailable. Check your published theme in Shopify&apos;s theme editor.</s-paragraph>}
      <div className="block-grid">
        {visible.map((block) => <article className="block-card" key={`${block.handle}-${"style" in block ? block.style : "default"}`}>
          <BlockPreview handle={block.handle} style={"style" in block ? block.style : undefined} />
          <div className="block-card__body"><span className="block-card__category">{block.category}</span><h3>{block.title}</h3>{installed?.has(block.handle) && <s-badge tone="success">Installed</s-badge>}<p>{block.description}</p>{"style" in block && <p className="block-card__style-note">After opening the editor, set Design or Style to <strong>{block.style}</strong>, then save.</p>}
            <div className="block-card__actions">
              {installed?.has(block.handle)
                ? <s-button href={openThemeUrl("embed" in block)} target="_blank" accessibilityLabel={`Edit ${block.title} in theme`}>Edit in theme</s-button>
                : installed === null && !statusError
                  ? <s-button disabled>Checking status…</s-button>
                  : <s-button href={editorUrl(block.handle, "embed" in block)} target="_blank" accessibilityLabel={`Install ${block.title} in theme`}>Install in theme</s-button>}
              {!("embed" in block) && installed !== null && !installed.has(block.handle) && <s-link href={editorUrl(block.handle, false, "newAppsSection")} target="_blank">Add as separate section</s-link>}
            </div>
          </div>
        </article>)}
      </div>
    </s-section>
  </s-page>;
}
export const headers: HeadersFunction = (args) => boundary.headers(args);
