import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Installation Guide — Page Booster" },
  { name: "description", content: "Install Page Booster and configure product coupons, bundles, delivery estimates, and AI features in Shopify." },
];

export default function InstallationGuide() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Installation guide</div>
            <h1>Set up Page Booster, step by step.</h1>
            <p>Install the app, configure your offers and delivery settings, then place the blocks in your Shopify theme.</p>
          </div>
        </section>
        <section className="section">
          <div className="wrap layout">
            <aside className="side" aria-label="Guide sections">
              <strong>On this page</strong>
              <a href="#step-1">1. Install the app</a>
              <a href="#step-2">2. Set your delivery estimate</a>
              <a href="#step-3">3. Create a product coupon</a>
              <a href="#step-4">4. Create a bundle</a>
              <a href="#step-5">5. Generate product features</a>
              <a href="#step-6">6. Place and style your product blocks</a>
              <a href="#step-7">7. Show bundles on the home page</a>
              <a href="#step-8">8. Check the storefront</a>
            </aside>
            <div>
              <section className="guide-step" id="step-1">
                <h2>
                  <span className="round">1</span>Install the app
                </h2>
                <ol>
                  <li>
                    Open <a href="https://apps.shopify.com/product-discount-3">Page Booster on the Shopify App Store</a>.
                  </li>
                  <li>
                    Click <strong>Add app</strong>, review the permissions, and select <strong>Install app</strong>.
                  </li>
                  <li>
                    Open Page Booster from <strong>Apps</strong> in your Shopify admin.
                  </li>
                </ol>
                <div className="callout">
                  The app installs without editing theme code. You can add and position its app blocks in the Shopify Theme Editor.
                </div>
              </section>
              <section className="guide-step" id="step-2">
                <h2>
                  <span className="round">2</span>Set your delivery estimate
                </h2>
                <ol>
                  <li>
                    In Page Booster, open <strong>Delivery Settings</strong>.
                  </li>
                  <li>Set the delivery day range and destination shown to shoppers.</li>
                  <li>
                    Switch the display on and select <strong>Save Settings</strong>.
                  </li>
                </ol>
              </section>
              <section className="guide-step" id="step-3">
                <h2>
                  <span className="round">3</span>Create a product coupon
                </h2>
                <ol>
                  <li>
                    Open <strong>Product Coupons</strong> and select <strong>Create Coupon</strong>.
                  </li>
                  <li>Choose the product and enter a unique coupon code.</li>
                  <li>Select a percentage or fixed amount discount and enter its value.</li>
                  <li>Optionally set valid dates, activate the coupon, and save.</li>
                </ol>
                <div className="callout">
                  Check the offer on the product and cart pages before sharing it with customers.
                </div>
              </section>
              <section className="guide-step" id="step-4">
                <h2>
                  <span className="round">4</span>Create a bundle
                </h2>
                <ol>
                  <li>
                    Open <strong>Product Bundles</strong> and select <strong>Create Bundle</strong>.
                  </li>
                  <li>Name the bundle, set its price, and add at least two products.</li>
                  <li>Turn on its active status and save.</li>
                </ol>
              </section>
              <section className="guide-step" id="step-5">
                <h2>
                  <span className="round">5</span>Generate product features
                </h2>
                <ol>
                  <li>
                    Open <strong>Product Features</strong> and find a product.
                  </li>
                  <li>
                    Select <strong>Generate Features with AI</strong>.
                  </li>
                  <li>Review the suggested benefits, edit them for accuracy and brand voice, then save.</li>
                </ol>
              </section>
              <section className="guide-step" id="step-6">
                <h2>
                  <span className="round">6</span>Place and style your product blocks
                </h2>
                <ol>
                  <li>
                    In Shopify admin, go to <strong>Online Store → Themes → Customize</strong>.
                  </li>
                  <li>
                    Open a product page template and locate <strong>Product information</strong>.
                  </li>
                  <li>
                    Select <strong>Add block → Apps</strong>, then add each Page Booster block you want to show.
                  </li>
                  <li>Drag blocks into position and adjust their colors and titles. Save the theme.</li>
                </ol>
                <div className="callout">
                  Add each feature as an app block when you want its theme color controls. Preview a product with actual coupon, bundle, and delivery data.
                </div>
              </section>
              <section className="guide-step" id="step-7">
                <h2>
                  <span className="round">7</span>Show bundles on the home page
                </h2>
                <ol>
                  <li>Open the home page in the Theme Editor.</li>
                  <li>
                    Select <strong>Add section</strong> or <strong>Add block</strong>, then choose <strong>Apps → Exclusive Bundles</strong>.
                  </li>
                  <li>Place it where you want and save.</li>
                </ol>
                <p>
                  The current app guide also lists a bundles page at <code>your-store.myshopify.com/apps/bundles</code> that you can add to your navigation.
                </p>
              </section>
              <section className="guide-step" id="step-8">
                <h2>
                  <span className="round">8</span>Check the storefront
                </h2>
                <ol>
                  <li>Open a product page as a shopper and confirm the blocks display in the correct place.</li>
                  <li>Test an active coupon and inspect the delivery estimate.</li>
                  <li>Check the mobile layout and a bundle before promoting the page.</li>
                </ol>
              </section>
              <div className="pricing" style={{ marginTop: 35 }}>
                <div>
                  <h2>Need a hand?</h2>
                  <p>Tell us where you’re stuck and include your store URL if useful.</p>
                </div>
                <div className="price-actions">
                  <a className="btn" href="/support">
                    Visit support ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
