import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Installation Guide — Block Builder" },
  { name: "description", content: "Install Block Builder and configure product coupons, bundles, delivery estimates, and AI features in Shopify." },
];

export default function InstallationGuide() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Installation guide</div>
            <h1>Set up Block Builder, step by step.</h1>
            <p>Install the app, configure your offers and delivery settings, then place the blocks in your Shopify theme.</p>
          </div>
        </section>
        <section className="section">
          <div className="wrap layout">
            <aside className="side" aria-label="Guide sections">
              <strong>On this page</strong>
              <a href="#step-1">1. Install the app</a>
              <a href="#step-2">2. Explore the library</a>
              <a href="#step-3">3. Open Theme Editor</a>
              <a href="#step-4">4. Add and customize</a>
              <a href="#step-5">5. Preview and publish</a>
            </aside>
            <div>
              <section className="guide-step" id="step-1">
                <h2>
                  <span className="round">1</span>Install the app
                </h2>
                <ol>
                  <li>
                    Open <a href="https://apps.shopify.com/product-discount-3">Block Builder on the Shopify App Store</a>.
                  </li>
                  <li>
                    Click <strong>Add app</strong>, review the permissions, and select <strong>Install app</strong>.
                  </li>
                  <li>
                    Open Block Builder from <strong>Apps</strong> in your Shopify admin.
                  </li>
                </ol>
                <div className="callout">
                  The app installs without editing theme code. You can add and position its app blocks directly in the Shopify Theme Editor.
                </div>
              </section>
              <section className="guide-step" id="step-2">
                <h2>
                  <span className="round">2</span>Explore the Block Library
                </h2>
                <ol>
                  <li>
                    Inside the Block Builder app dashboard, browse the 14+ available blocks.
                  </li>
                  <li>Familiarize yourself with features like Trust strips, Delivery estimates, Product highlights, and Promotion banners.</li>
                  <li>Decide which blocks best fit your store's needs.</li>
                </ol>
              </section>
              <section className="guide-step" id="step-3">
                <h2>
                  <span className="round">3</span>Open the Theme Editor
                </h2>
                <ol>
                  <li>
                    In your Shopify admin, go to <strong>Online Store → Themes → Customize</strong>.
                  </li>
                  <li>At the top center of the editor, click the dropdown and navigate to the <strong>Products</strong> → <strong>Default product</strong> template.</li>
                  <li>On the left sidebar, locate the <strong>Product information</strong> section.</li>
                </ol>
              </section>
              <section className="guide-step" id="step-4">
                <h2>
                  <span className="round">4</span>Add and Customize Blocks
                </h2>
                <ol>
                  <li>
                    Click <strong>Add block</strong> at the bottom of the Product Information section.
                  </li>
                  <li>Scroll down to the <strong>Apps</strong> category and select the Block Builder block you want to add (e.g., Trust strip).</li>
                  <li>Drag the block up or down to position it perfectly on your page.</li>
                  <li>Click on the block itself to open its settings on the right panel. Here you can customize text, icons, colors, and layout.</li>
                </ol>
                <div className="callout">
                  You can add as many blocks as your plan allows. Each block operates independently and has its own custom settings!
                </div>
              </section>
              <section className="guide-step" id="step-5">
                <h2>
                  <span className="round">5</span>Preview and Publish
                </h2>
                <ol>
                  <li>Switch between Desktop and Mobile views using the icons at the top right of the editor to ensure your layout is responsive.</li>
                  <li>Once you are happy with the layout, click <strong>Save</strong> in the top right corner.</li>
                  <li>Visit your live storefront to see the blocks in action!</li>
                </ol>
              </section>
              
              <div className="pricing" style={{ marginTop: 35, backgroundColor: "#f4f6f8", padding: "2rem", borderRadius: "8px" }}>
                <div>
                  <h2 style={{ marginTop: 0 }}>Need a hand?</h2>
                  <p style={{ margin: 0 }}>Tell us where you’re stuck and include your store URL if useful.</p>
                </div>
                <div className="price-actions">
                  <a className="btn" href="/support" style={{ backgroundColor: "#008060", color: "#ffffff", border: "none", padding: "0.75rem 1.5rem", borderRadius: "4px", fontWeight: "bold", textDecoration: "none" }}>
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
