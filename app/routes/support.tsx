import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Support — Block Builder" },
  { name: "description", content: "Get help with Block Builder setup, product coupons, bundles, delivery dates, and Shopify app blocks." },
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
            <p>Find setup answers, open the installation guide, or email the Block Builder team.</p>
          </div>
        </section>
        <section className="section alt">
          <div className="wrap">
            <div className="help-grid">
              <article className="help-card">
                <div className="symbol">✉</div>
                <h3>Email support</h3>
                <p>Describe the issue and include your store URL, the affected product, and a screenshot when relevant.</p>
                <a href="mailto:apps@task19.com?subject=Block%20Builder%20support">apps@task19.com ↗</a>
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
                <p>Browse common questions about setup, widgets, and customization to find instant solutions and keep building.</p>
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
            <div className="faq-grid">
              <div className="faq-card">
                <h3>Setup & Configuration</h3>
                <details>
                  <summary>How do I install the widget?</summary>
                  <p>
                    Open the <a href="https://apps.shopify.com/product-discount-3">Shopify App Store listing</a>, select Add app, then approve installation. Use the Shopify Theme Editor to add your blocks.
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
                  <summary>Can I use it on vintage themes?</summary>
                  <p>Block Builder is optimized for Shopify Online Store 2.0 themes. Vintage themes may require manual code placement.</p>
                </details>
                <details>
                  <summary>How do I uninstall?</summary>
                  <p>Remove the app from Apps in Shopify admin. Check the storefront afterward to confirm the blocks are no longer displayed.</p>
                </details>
              </div>

              <div className="faq-card">
                <h3>Blocks & Features</h3>
                <details>
                  <summary>Does the app slow down my store?</summary>
                  <p>No. Our app blocks are highly optimized and only load when necessary, ensuring zero impact on your store's page speed.</p>
                </details>
                <details>
                  <summary>Can I edit AI-generated features?</summary>
                  <p>Yes. Generate content using the app dashboard and then edit the generated text before displaying it.</p>
                </details>
                <details>
                  <summary>How do I change the delivery estimate?</summary>
                  <p>Open Delivery Settings in the app, update the day range or destination, and save.</p>
                </details>
                <details>
                  <summary>Can I change block colors and fonts?</summary>
                  <p>Yes! Blocks automatically inherit your theme's default fonts, and you can adjust colors directly in Shopify's Theme Editor.</p>
                </details>
                <details>
                  <summary>Where do I set up coupons?</summary>
                  <p>
                    Use the Product Coupons tab in the app dashboard. The <a href="/installation-guide">installation guide</a> walks through the process.
                  </p>
                </details>
              </div>

              <div className="faq-card">
                <h3>Privacy & GDPR</h3>
                <details>
                  <summary>Is Block Builder GDPR compliant?</summary>
                  <p>Yes, we are fully GDPR and CCPA compliant. We do not track personal customer data without explicit consent.</p>
                </details>
                <details>
                  <summary>What data do you store about customers?</summary>
                  <p>
                    We store minimal data strictly necessary for app functionality. Review the <a href="/privacy">Privacy Policy</a> for full details.
                  </p>
                </details>
                <details>
                  <summary>Are payment details stored by the app?</summary>
                  <p>No. Block Builder never accesses or stores any payment information. All transactions are securely handled by Shopify.</p>
                </details>
                <details>
                  <summary>How do I request data deletion?</summary>
                  <p>You can request complete data deletion for your store by emailing our support team with your store URL.</p>
                </details>
              </div>
            </div>
          </div>
        </section>
        <section className="closing">
          <div className="wrap">
            <h2>Still need help?</h2>
            <p>Send the team a description of your issue and the store page where it appears.</p>
            <a className="btn" href="mailto:apps@task19.com?subject=Block%20Builder%20support">
              Email support ↗
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
