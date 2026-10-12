import { useState } from "react";
import type { FormEvent } from "react";
import type { MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Pricing — SectionKit: Theme Sections & Blocks" },
  { name: "description", content: "Explore SectionKit's Free, Starter, and Pro plans for customizable Shopify theme sections and product page blocks." },
];

export const loader = async () => ({
  appHandle: process.env.SHOPIFY_APP_HANDLE || "block-builder",
});

export default function Pricing() {
  const { appHandle } = useLoaderData<typeof loader>();
  const [selectedPlan, setSelectedPlan] = useState<"Free" | "Starter" | "Pro">("Free");
  const [shop, setShop] = useState("");
  const [shopError, setShopError] = useState("");

  const continueToShopify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const handle = shop.trim().toLowerCase().replace(/\.myshopify\.com$/, "");
    if (!/^[a-z0-9][a-z0-9-]*$/.test(handle)) {
      setShopError("Enter your store handle or its .myshopify.com domain.");
      return;
    }
    window.location.assign(`https://admin.shopify.com/store/${handle}/charges/${encodeURIComponent(appHandle)}/pricing_plans`);
  };

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <div className="tag">Plans & pricing</div>
            <h1>Choose the plan that fits your store.</h1>
            <p>Explore SectionKit&apos;s Free, Starter, and Pro plans for your Shopify storefront.</p>
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
                <p>Choose any three block types for your store.</p>
                <ul>
                  <li>Any three block types from the library</li>
                  <li>Use each chosen type more than once</li>
                  <li>Use built-in designs on chosen blocks</li>
                </ul>
                <a className="btn" href="#plan-selector" onClick={() => setSelectedPlan("Free")}>Choose Free</a>
              </article>
              <article className="plan popular">
                <div className="plan-label">For growing stores</div>
                <h2>Starter</h2>
                <div className="amount">
                  $4.99 <span>/ month</span>
                </div>
                <p>Use the full current block library with a 7-day trial.</p>
                <ul>
                  <li>All current product and utility blocks</li>
                  <li>All current design and color settings</li>
                  <li>Fixed-message delivery estimate</li>
                </ul>
                <a className="btn" href="#plan-selector" onClick={() => setSelectedPlan("Starter")}>Choose Starter</a>
              </article>
              <article className="plan">
                <div className="plan-label">Advanced needs</div>
                <h2>Pro</h2>
                <div className="amount">
                  $9.99 <span>/ month</span>
                </div>
                <p>Use advanced display and delivery controls with a 7-day trial.</p>
                <ul>
                  <li>Everything currently in Starter</li>
                  <li>Smart delivery dates with cutoff, holidays, and country rules</li>
                  <li>Target product blocks by product, collection, tag, country, or language</li>
                </ul>
                <a className="btn" href="#plan-selector" onClick={() => setSelectedPlan("Pro")}>Choose Pro</a>
              </article>
            </div>
            <div className="plan-selector" id="plan-selector">
              <div>
                <h2>Continue with {selectedPlan}</h2>
                <p>Enter your Shopify store to open SectionKit’s plan page. Choose {selectedPlan} there; Shopify handles plan approval and billing.</p>
              </div>
              <form onSubmit={continueToShopify}>
                <label htmlFor="pricing-shop">Your Shopify store</label>
                <div className="plan-selector__fields">
                  <input id="pricing-shop" name="shop" type="text" value={shop} onChange={(event) => { setShop(event.target.value); setShopError(""); }} placeholder="your-store.myshopify.com" autoComplete="url" aria-invalid={Boolean(shopError)} aria-describedby={shopError ? "pricing-shop-error" : undefined} required />
                  <button className="btn" type="submit">Continue to Shopify ↗</button>
                </div>
                {shopError && <p className="plan-selector__error" id="pricing-shop-error" role="alert">{shopError}</p>}
              </form>
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
              <p>Browse the block library, open a block in Shopify&apos;s theme editor, choose its position, and save your theme.</p>
            </details>
            <details>
              <summary>Do I need to edit theme code?</summary>
              <p>No. Add and customize SectionKit blocks in Shopify&apos;s theme editor.</p>
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
