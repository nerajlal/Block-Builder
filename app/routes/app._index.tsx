import { useState } from "react";
import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

const blocks = [
  { handle: "trust-strip", title: "Trust strip", category: "Trust", description: "Compact reassurance badges below the add-to-cart button.", preview: "Secure checkout  ·  Easy returns  ·  Friendly support" },
  { handle: "delivery-estimate", title: "Delivery estimate", category: "Shipping", description: "A configurable delivery window with a clear estimate disclaimer.", preview: "🚚 Estimated delivery in 3–5 days" },
  { handle: "product-highlights", title: "Product highlights", category: "Product details", description: "Three scannable product benefits with a clean premium layout.", preview: "✦ Made for everyday use   ✦ Built to last   ✦ Easy to care for" },
  { handle: "promo-banner", title: "Promotion banner", category: "Offers", description: "A restrained promotional message for your product page.", preview: "A little extra for your next order" },
  { handle: "stock-note", title: "Stock note", category: "Availability", description: "An honest availability indicator using the selected variant's inventory.", preview: "Available and ready to ship" },
  { handle: "payment-methods", title: "Payment methods", category: "Trust", description: "Show only the payment types enabled for this store and market.", preview: "Secure payment options  ·  Visa  ·  Mastercard  ·  PayPal" },
  { handle: "product-badge", title: "Product badge", category: "Product details", description: "Call attention to a genuine product attribute with an editable badge.", preview: "FEATURED PRODUCT" },
  { handle: "product-faq", title: "Product FAQ", category: "Product details", description: "Answer three common questions in a compact accordion.", preview: "Good to know  +  Care  +  Delivery  +  Returns" },
  { handle: "image-story", title: "Image story", category: "Product details", description: "Pair a merchant-selected image with a short product story.", preview: "The details matter  ·  Made with care" },
  { handle: "comparison-table", title: "Comparison table", category: "Product details", description: "Compare factual product details in a clear three-column table.", preview: "Feature  |  This product  |  Alternative" },
  { handle: "before-after", title: "Before & after", category: "Product details", description: "Let shoppers compare two merchant-selected images with a slider.", preview: "Before  ◀────●────▶  After" },
  { handle: "info-tabs", title: "Information tabs", category: "Product details", description: "Organize product details into accessible, keyboard-friendly tabs.", preview: "Materials  |  Care  |  Delivery" },
  { handle: "discount-code", title: "Discount code", category: "Offers", description: "Show a copyable code that you have already created and tested in Shopify Discounts.", preview: "YOURCODE  ·  Copy code" },
  { handle: "scroll-to-top", title: "Scroll to top", category: "Utilities", description: "Add a floating back-to-top button across your storefront.", preview: "↑  Back to top", embed: true },
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
  const openEditor = (handle: string) => {
    const embed = blocks.find((block) => block.handle === handle && "embed" in block);
    const url = embed
      ? `https://${shop}/admin/themes/current/editor?context=apps&template=index&activateAppId=${encodeURIComponent(apiKey + "/" + handle)}`
      : `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${encodeURIComponent(apiKey + "/" + handle)}&target=newAppsSection`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return <s-page heading="Block Builder">
    <s-section heading="Upgrade your product page">
      <s-paragraph>Choose a widget and click Install in theme. Shopify opens its theme editor so you can preview the widget, customize it, and save the theme.</s-paragraph>
      <s-banner tone="info">Works with Online Store 2.0 themes, including Dawn. Your existing theme files are not edited.</s-banner>
    </s-section>
    <s-section heading="Block library">
      <s-stack direction="inline" gap="small">
        {categories.map((category) => <s-button key={category} variant={filter === category ? "primary" : "secondary"} onClick={() => setFilter(category)}>{category}</s-button>)}
      </s-stack>
      <div className="block-grid">
        {visible.map((block) => <article className="block-card" key={block.handle}>
          <div className="block-card__preview">{block.preview}</div>
          <div className="block-card__body"><span className="block-card__category">{block.category}</span><h3>{block.title}</h3><p>{block.description}</p><s-button onClick={() => openEditor(block.handle)}>Install in theme</s-button></div>
        </article>)}
      </div>
    </s-section>
    <s-section slot="aside" heading="How it works"><s-ordered-list><s-list-item>Choose a block.</s-list-item><s-list-item>Place it in your product template.</s-list-item><s-list-item>Adjust its settings and save your theme.</s-list-item></s-ordered-list><s-link href="/app/additional">View installation guide</s-link></s-section>
    <style>{`.block-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:20px}.block-card{border:1px solid #dedede;border-radius:12px;background:#fff;overflow:hidden}.block-card__preview{min-height:120px;background:linear-gradient(140deg,#f4f7f4,#e8eee9);display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;color:#193d2b;font-weight:600}.block-card__body{padding:20px}.block-card__category{color:#55705d;font-size:12px;text-transform:uppercase;letter-spacing:.06em}.block-card h3{margin:8px 0}.block-card p{min-height:48px;color:#5c5c5c;line-height:1.5}`}</style>
  </s-page>;
}
export const headers: HeadersFunction = (args) => boundary.headers(args);
