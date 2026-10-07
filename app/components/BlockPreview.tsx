import type { ReactNode } from "react";

type PreviewProps = {
  handle: string;
};

const sample = (content: ReactNode, needsSetup = false) => (
  <div className="block-preview">
    <div className="block-preview__surface">{content}</div>
    <span className="block-preview__caption">
      {needsSetup ? "Example · add your content in the theme editor" : "Example · matches the block's default style"}
    </span>
  </div>
);

export function BlockPreview({ handle }: PreviewProps) {
  switch (handle) {
    case "trust-strip":
      return sample(<div className="bb-block bb-trust bb-trust--soft"><span>✓ Secure checkout</span><span>✓ Easy returns</span><span>✓ Friendly support</span></div>);
    case "delivery-estimate":
      return sample(<div className="bb-block bb-delivery"><strong>🚚 Delivery information</strong><div>Estimated delivery in 3–5 business days</div><small>Delivery times are estimates and may vary by location.</small></div>);
    case "product-highlights":
      return sample(<div className="bb-block bb-highlights"><span>✦ Made for everyday use</span><span>✦ Built to last</span><span>✦ Easy to care for</span></div>);
    case "promo-banner":
      return sample(<div className="bb-block bb-promo bb-promo--dark"><strong>A little extra for your next order</strong><div>Explore our latest offers</div></div>);
    case "stock-note":
      return sample(<div className="bb-block bb-stock" role="status">● Available and ready to ship</div>);
    case "payment-methods":
      return sample(<div className="bb-block bb-payments"><strong>Secure payment options</strong><div className="block-preview__muted">Your store&apos;s enabled payment icons appear here</div></div>, true);
    case "product-badge":
      return sample(<div className="bb-badge-wrap"><span className="bb-badge bb-badge--soft">Featured product</span></div>);
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
    default:
      return null;
  }
}
