import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Pricing — SectionKit: Theme Sections & Blocks" },
  { name: "description", content: "Explore SectionKit's Free, Starter, and Pro plans for customizable Shopify theme sections and product page blocks." },
];

export default function Pricing() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Plans & pricing</div>
            <h1>Choose the plan that fits your store.</h1>
            <p>Explore SectionKit's Free, Starter, and Pro plans for your Shopify storefront.</p>
          </div>
        </section>
        <section className="section alt">
          <div className="wrap">
            <div className="card-grid">
              <article className="plan">
                <div className="plan-label">Start here</div>
                <h2>Free</h2>
                <div className="amount">
                  $0 <span>/ month</span>
                </div>
                <p>Start exploring sections and blocks for your product pages.</p>
                <ul>
                  <li>Browse the block library</li>
                  <li>Preview available designs</li>
                  <li>Customize blocks in Shopify's theme editor</li>
                </ul>
                <p>Select this plan through Shopify.</p>
              </article>
              <article className="plan popular">
                <div className="plan-label">For growing stores</div>
                <h2>Starter</h2>
                <div className="amount">
                  $4.99 <span>/ month</span>
                </div>
                <p>Explore SectionKit's paid Starter plan with a 7-day trial.</p>
                <ul>
                  <li>Product detail and trust blocks</li>
                  <li>Shipping and offer blocks</li>
                  <li>Theme editor design settings</li>
                </ul>
                <p>Select this plan through Shopify.</p>
              </article>
              <article className="plan">
                <div className="plan-label">Advanced needs</div>
                <h2>Pro</h2>
                <div className="amount">
                  $9.99 <span>/ month</span>
                </div>
                <p>Explore SectionKit's paid Pro plan with a 7-day trial.</p>
                <ul>
                  <li>Browse all widget categories</li>
                  <li>Preview available designs</li>
                  <li>Customize blocks in Shopify's theme editor</li>
                </ul>
                <p>Select this plan through Shopify.</p>
              </article>
            </div>
            <p className="plan-note">
              Paid plans include a 7-day trial. Confirm the plan and billing terms in Shopify before subscribing.
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
              <p>Starter and Pro each include a 7-day trial. Confirm the trial terms in Shopify before subscribing.</p>
            </details>
            <details>
              <summary>How do I add a block?</summary>
              <p>Browse the block library, open a block in Shopify's theme editor, choose its position, and save your theme.</p>
            </details>
            <details>
              <summary>Do I need to edit theme code?</summary>
              <p>No. Add and customize SectionKit blocks in Shopify's theme editor.</p>
            </details>
            <details>
              <summary>Can I preview a block before saving it?</summary>
              <p>Yes. Preview the block in the theme editor, adjust its settings, and save your theme when you are ready.</p>
            </details>
          </div>
        </section>
        <section className="closing">
          <div className="wrap">
            <h2>Ready to make more of your product pages?</h2>
            <p>Choose a plan in Shopify and customize your blocks in the theme editor.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
