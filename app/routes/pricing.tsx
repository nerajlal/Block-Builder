import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Pricing — Page Booster for Shopify" },
  { name: "description", content: "Compare Page Booster plans for bundles, coupons, delivery dates, and AI product features." },
];

export default function Pricing() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Plans & pricing</div>
            <h1>Choose the tools that fit your store.</h1>
            <p>Start with product page essentials and move to a higher plan as you use more bundles, discounts, and AI features.</p>
          </div>
        </section>
        <section className="section alt">
          <div className="wrap">
            <div className="card-grid">
              <article className="plan">
                <div className="plan-label">Start here</div>
                <h2>Starter</h2>
                <div className="amount">
                  $4 <span>/ month</span>
                </div>
                <p>Core offers and product page information for a growing store.</p>
                <ul>
                  <li>AI features for 11–50 products</li>
                  <li>Up to 20 discount coupons</li>
                  <li>Product-specific discounts</li>
                  <li>Up to 5 product bundles</li>
                  <li>Delivery date display</li>
                  <li>Priority email support</li>
                </ul>
                <a className="btn" href="https://apps.shopify.com/product-discount-3">
                  Start 7-day trial ↗
                </a>
              </article>
              <article className="plan popular">
                <div className="plan-label">Most popular</div>
                <h2>Pro</h2>
                <div className="amount">
                  $10 <span>/ month</span>
                </div>
                <p>More room to run offers across your catalog.</p>
                <ul>
                  <li>Unlimited AI generations</li>
                  <li>Unlimited discount coupons</li>
                  <li>Unlimited product bundles</li>
                  <li>Everything in Starter</li>
                  <li>Bulk feature management</li>
                  <li>Priority support</li>
                </ul>
                <a className="btn" href="https://apps.shopify.com/product-discount-3">
                  Choose Pro ↗
                </a>
              </article>
              <article className="plan">
                <div className="plan-label">Advanced needs</div>
                <h2>Enterprise</h2>
                <div className="amount">
                  $15 <span>/ month</span>
                </div>
                <p>Additional service and customization options listed for larger operations.</p>
                <ul>
                  <li>Dedicated account manager</li>
                  <li>Custom feature development</li>
                  <li>White-label options</li>
                  <li>Multi-store management</li>
                  <li>SLA guarantees</li>
                  <li>Custom API integrations</li>
                </ul>
                <a className="btn" href="https://apps.shopify.com/product-discount-3">
                  Choose Enterprise ↗
                </a>
              </article>
            </div>
            <p className="plan-note">
              Prices and features reflect the current Page Booster pricing page. Confirm the applicable plan and billing terms in Shopify before subscribing.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="wrap faq">
            <div className="tag" style={{ textAlign: "center" }}>
              Pricing questions
            </div>
            <h2>Know what you’re paying for.</h2>
            <details>
              <summary>Is there a trial?</summary>
              <p>The current Starter plan lists a 7-day trial. Check the Shopify billing screen for the trial terms that apply to your store.</p>
            </details>
            <details>
              <summary>Can I change plans?</summary>
              <p>The app’s current pricing information says you can change your plan from its dashboard. Shopify handles app charges on your Shopify invoice.</p>
            </details>
            <details>
              <summary>What happens when I reach a coupon limit?</summary>
              <p>The current plan information says new coupons stop displaying when the limit is reached, until the next billing cycle or a plan upgrade.</p>
            </details>
            <details>
              <summary>What is a voucher?</summary>
              <p>A voucher is a unique discount code generated and claimed through a Page Booster widget.</p>
            </details>
          </div>
        </section>
        <section className="closing">
          <div className="wrap">
            <h2>Ready to put more value on your product pages?</h2>
            <p>Install the app and select the plan that suits your store.</p>
            <a className="btn" href="https://apps.shopify.com/product-discount-3">
              Add to Shopify ↗
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
