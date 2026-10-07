import { useState } from "react";
import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
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
] as const;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop, apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function BlockLibrary() {
  const { shop, apiKey } = useLoaderData<typeof loader>();
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(blocks.map((block) => block.category))];
  const visible = filter === "All" ? blocks : blocks.filter((block) => block.category === filter);
  const editorUrl = (handle: string, embed: boolean) => {
    const blockId = `${apiKey}/${handle}`;
    const query = embed
      ? `context=apps&template=index&activateAppId=${blockId}`
      : `template=product&addAppBlockId=${blockId}&target=newAppsSection`;
    return `https://${shop}/admin/themes/current/editor?${query}`;
  };
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
      <s-stack direction="inline" gap="small">
        {categories.map((category) => <s-button key={category} variant={filter === category ? "primary" : "secondary"} onClick={() => setFilter(category)}>{category}</s-button>)}
      </s-stack>
      <div className="block-grid">
        {visible.map((block) => <article className="block-card" key={block.handle}>
          <BlockPreview handle={block.handle} />
          <div className="block-card__body"><span className="block-card__category">{block.category}</span><h3>{block.title}</h3><p>{block.description}</p><s-button href={editorUrl(block.handle, "embed" in block)} target="_blank" accessibilityLabel={`Install ${block.title} in theme`}>Install in theme</s-button></div>
        </article>)}
      </div>
    </s-section>
  </s-page>;
}
export const headers: HeadersFunction = (args) => boundary.headers(args);
