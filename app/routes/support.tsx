import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Support — Page Booster" },
  { name: "description", content: "Get help with Page Booster setup, product coupons, bundles, delivery dates, and Shopify app blocks." },
];

export default function Support() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Support</div>
            <h1>Get unstuck and keep selling.</h1>
            <p>Find setup answers, open the installation guide, or email the Page Booster team.</p>
          </div>
        </section>
        <section className="section alt">
          <div className="wrap">
            <div className="help-grid">
              <article className="help-card">
                <div className="symbol">✉</div>
                <h3>Email support</h3>
                <p>Describe the issue and include your store URL, the affected product, and a screenshot when relevant.</p>
                <a href="mailto:apps@task19.com?subject=Page%20Booster%20support">Email apps@task19.com ↗</a>
              </article>
              <article className="help-card">
                <div className="symbol">▤</div>
                <h3>Installation guide</h3>
                <p>Follow the setup steps for delivery dates, coupons, bundles, AI features, and theme blocks.</p>
                <a href="/installation-guide">Read the guide ↗</a>
              </article>
              <article className="help-card">
                <div className="symbol">?</div>
                <h3>Quick answers</h3>
                <p>Browse the most common questions about setup, widgets, and customization.</p>
                <a href="#faq">Browse FAQs ↓</a>
              </article>
            </div>
          </div>
        </section>
        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head" style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
              <div className="tag">Frequently asked questions</div>
              <h2>Answers for the next step.</h2>
            </div>
            <div className="faq-group">
              <h3>Getting started</h3>
              <details>
                <summary>How do I install Page Booster?</summary>
                <p>
                  Open the <a href="https://apps.shopify.com/product-discount-3">Shopify App Store listing</a>, select Add app, then approve installation. Follow the <a href="/installation-guide">setup guide</a> to configure and place each block.
                </p>
              </details>
              <details>
                <summary>Do I need to edit my theme code?</summary>
                <p>No coding is required. Use Shopify’s Theme Editor to add and position the app blocks.</p>
              </details>
              <details>
                <summary>How do I move a widget?</summary>
                <p>Go to Online Store → Themes → Customize, open a product page template, and drag the app block to the desired location.</p>
              </details>
              <details>
                <summary>How do I uninstall?</summary>
                <p>Remove the app from Apps in Shopify admin. Check the storefront afterward to confirm the blocks are no longer displayed.</p>
              </details>
            </div>
            <div className="faq-group">
              <h3>Features & appearance</h3>
              <details>
                <summary>Can I edit AI-generated features?</summary>
                <p>Yes. Open Product Features, select the product, and edit the generated text before displaying it.</p>
              </details>
              <details>
                <summary>How do I change the delivery estimate?</summary>
                <p>Open Delivery Settings in the app, update the day range or destination, and save.</p>
              </details>
              <details>
                <summary>Can I change widget colors?</summary>
                <p>Yes. Select an app block in Shopify’s Theme Editor to adjust its available colors and titles.</p>
              </details>
              <details>
                <summary>Where do I set up coupons and bundles?</summary>
                <p>
                  Use Product Coupons and Product Bundles in the app dashboard. The <a href="/installation-guide">installation guide</a> walks through both.
                </p>
              </details>
            </div>
            <div className="faq-group">
              <h3>Privacy</h3>
              <details>
                <summary>Where can I read the data policy?</summary>
                <p>
                  Review the app’s <a href="https://productdiscount.task19.com/privacy-policy">Privacy Policy</a> for its current data handling details.
                </p>
              </details>
            </div>
          </div>
        </section>
        <section className="closing">
          <div className="wrap">
            <h2>Still need help?</h2>
            <p>Send the team a description of your issue and the store page where it appears.</p>
            <a className="btn" href="mailto:apps@task19.com?subject=Page%20Booster%20support">
              Email support ↗
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
