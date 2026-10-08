import type { ReactNode } from "react";

type PreviewProps = {
  handle: string;
  style?: string;
};

const sample = (content: ReactNode, needsSetup = false, designPreview = false) => (
  <div className="block-preview">
    <div className="block-preview__surface">{content}</div>
    <span className="block-preview__caption">
      {designPreview ? "Design preview · select this style in the theme editor" : needsSetup ? "Example · add your content in the theme editor" : "Example · matches the block's default style"}
    </span>
  </div>
);

export function BlockPreview({ handle, style }: PreviewProps) {
  switch (handle) {
    case "trust-strip":
      return sample(<div className={`bb-block bb-trust bb-trust--${style || "soft"}`}><span>✓ Secure checkout</span><span>✓ Easy returns</span><span>✓ Friendly support</span></div>, false, true);
    case "delivery-estimate":
      return sample(<div className="bb-block bb-delivery"><strong>🚚 Delivery information</strong><div>Estimated delivery in 3–5 business days</div><small>Delivery times are estimates and may vary by location.</small></div>);
    case "product-highlights":
      return sample(<div className={`bb-block bb-highlights bb-highlights--${style || "standard"}`}><span>✦ Made for everyday use</span><span>✦ Built to last</span><span>✦ Easy to care for</span></div>, false, true);
    case "promo-banner":
      return sample(<div className={`bb-block bb-promo bb-promo--${style || "dark"}`}><strong>A little extra for your next order</strong><div>Explore our latest offers</div></div>, false, true);
    case "black-friday":
      return sample(<div className="bb-block bb-promo bb-promo--black-friday"><strong>◷ Black Friday Special</strong><div>Add your real offer and campaign end time</div><span className="bb-promo__countdown">Countdown appears here</span></div>, true, true);
    case "stock-note":
      return sample(<div className="bb-block bb-stock" role="status">● Available and ready to ship</div>);
    case "payment-methods":
      return sample(<div className="bb-block bb-payments"><strong>Secure payment options</strong><div className="block-preview__muted">Your store&apos;s enabled payment icons appear here</div></div>, true);
    case "product-badge":
      return sample(<div className="bb-badge-wrap"><span className={`bb-badge bb-badge--${style || "soft"}`}>Featured product</span></div>, false, true);
    case "product-faq":
      return sample(<div className="bb-block bb-faq"><h3>Good to know</h3><details open><summary>How do I care for this?</summary><p>Add your care instructions here.</p></details><details><summary>When will it arrive?</summary></details></div>);
    case "image-story":
      return sample(<div className="bb-block bb-story bb-story--no-image"><div className="bb-story__copy"><span>The details matter</span><h3>Made with care</h3><p>Tell shoppers what makes this product special.</p></div></div>, true);
    case "comparison-table":
      return sample(<div className="bb-block bb-comparison"><h3>Compare the details</h3><div className="bb-comparison__scroll"><table><thead><tr><th>Feature</th><th>This product</th><th>Alternative</th></tr></thead><tbody><tr><th>Material</th><td>Example</td><td>Example</td></tr></tbody></table></div></div>, true);
    case "before-after":
      return sample(<div className="bb-block bb-before-after"><div className="block-preview__compare"><span>Before</span><span className="block-preview__divider"/><span>After</span></div><div className="block-preview__muted">Choose two images to enable the slider</div></div>, true);
    case "info-tabs":
      return sample(<div className="bb-block bb-info-tabs"><div className="bb-info-tabs__list" role="tablist" aria-label="Example product information"><span className="block-preview__tab block-preview__tab--active">Materials</span><span className="block-preview__tab">Care</span><span className="block-preview__tab">Delivery</span></div><div className="block-preview__tab-content">Add product information in the theme editor.</div></div>, true);
    case "discount-code":
      return sample(<div className="bb-block bb-discount"><div className="bb-discount__copy"><strong>An offer for you</strong><span>Enter this code at checkout</span></div><div className="bb-discount__action"><code>YOURCODE</code><span className="bb-discount__button">Copy code</span></div></div>, true);
    case "scroll-to-top":
      return sample(<div className="block-preview__scroll"><span className="bb-scroll-top" aria-hidden="true">↑</span><span>Floating button on the storefront</span></div>);
    case "announcement-bar":
      return sample(<div className={`bb-block bb-announcement bb-announcement--${style || "dark"}`}><strong>Store update</strong><span>Something good is here</span></div>, false, true);
    case "collection-circles":
      return sample(<div className="bb-block bb-collection-circles"><h3>Explore collections</h3><div className="bb-collection-circles__grid">{["Everyday", "Essentials", "New arrivals"].map((name) => <span className="bb-collection-circles__item" key={name}><span className="bb-collection-circles__image">{name.charAt(0)}</span><span>{name}</span></span>)}</div></div>, true);
    case "image-gallery":
      return style === "portrait_videos"
        ? sample(<div className="bb-block bb-gallery bb-gallery--portrait"><h3>Short videos</h3><div className="bb-gallery__track">{[1, 2, 3, 4].map((number) => <span className="bb-gallery__item block-preview__media-placeholder" key={number}>▶ Video {number}</span>)}</div></div>, true, true)
        : sample(<div className="bb-block bb-gallery"><h3>A closer look</h3><div className="bb-gallery__track">{[1, 2, 3].map((number) => <span className="bb-gallery__item block-preview__media-placeholder" key={number}>Image {number}</span>)}</div></div>, true, true);
    case "media-tabs":
      return sample(<div className="bb-block bb-media-tabs"><div className="bb-media-tabs__tabs" role="tablist" aria-label="Example media tabs"><span className="block-preview__tab block-preview__tab--active">Detail 1</span><span className="block-preview__tab">Detail 2</span><span className="block-preview__tab">Detail 3</span></div><div className="block-preview__media-placeholder block-preview__media-panel">Selected image or video</div><div className="bb-media-tabs__controls"><span>←</span><span>→</span></div></div>, true);
    case "how-to-steps":
      return sample(<div className="bb-block bb-steps"><h3>How to use it</h3><div className="bb-steps__grid">{[1, 2, 3].map((number) => <span className="bb-steps__item" key={number}><span className="bb-steps__number">{number}</span><strong>Step {number}</strong></span>)}</div></div>);
    case "guarantee-card":
      return sample(<div className={`bb-block bb-guarantee bb-guarantee--${style || "standard"}`}><span className="bb-guarantee__icon">✓</span><div><strong>Our promise</strong><p>Your store&apos;s actual policy appears here.</p></div></div>, true, true);
    case "shipping-details":
      return sample(<div className={`bb-block bb-shipping-details bb-shipping-details--${style || "standard"}`}><span className="bb-shipping-details__icon">↗</span><div><strong>Shipping details</strong><p>Your store&apos;s shipping terms appear here.</p></div></div>, true, true);
    case "size-guide":
      return sample(<div className="bb-block bb-size-guide"><strong>Size guide</strong><table><thead><tr><th>Size</th><th>Measurement</th></tr></thead><tbody><tr><td>S</td><td>Example</td></tr><tr><td>M</td><td>Example</td></tr></tbody></table></div>, true);
    case "video-spotlight":
      return sample(<div className="bb-block bb-video"><h3>See it in action</h3><div className="block-preview__video-placeholder"><span aria-hidden="true">▶</span><small>Choose a video in Shopify</small></div></div>, true);
    case "gradient-heading":
      return sample(<div className="bb-block bb-gradient-heading"><span>The little details</span><h2>Made for everyday</h2></div>);
    case "specification-list":
      return sample(<div className="bb-block bb-specs"><h3>Product details</h3><dl><div><dt>Material</dt><dd>Product material</dd></div><div><dt>Dimensions</dt><dd>Product size</dd></div></dl></div>, true);
    case "care-instructions":
      return sample(<div className="bb-block bb-care"><span className="bb-care__icon">✦</span><div><h3>Care instructions</h3><p>Add care guidance for this product.</p></div></div>, true);
    case "feature-grid":
      return sample(<div className="bb-block bb-feature-grid"><h3>Why choose this product</h3><div className="bb-feature-grid__items">{[1,2,3].map(i => <div key={i}><span>✦</span><strong>Feature {i}</strong><p>Product detail</p></div>)}</div></div>, true);
    case "brand-note":
      return sample(<div className="bb-block bb-brand-note"><span>From our team</span><blockquote>Share the story behind this product.</blockquote></div>, true);
    case "offer-callout":
      return sample(<div className="bb-block bb-offer-callout"><div><span>Special offer</span><h3>Explore this offer</h3><p>Add your actual terms.</p></div></div>, true);
    case "product-checklist":
      return sample(<div className="bb-block bb-checklist"><h3>At a glance</h3><ul><li>Product fact 1</li><li>Product fact 2</li><li>Product fact 3</li></ul></div>, true);
    default:
      return null;
  }
}
