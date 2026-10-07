import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

// We import the CSS to apply the global styles
import "../../landing.css";

export const meta: MetaFunction = () => [
  { title: "Page Booster — Product deals, discounts & delivery dates for Shopify" },
  { name: "description", content: "Turn your Shopify product pages into a clearer reason to buy with bundles, product-specific discounts, delivery estimates, and AI-assisted product copy." },
  { property: "og:title", content: "Page Booster for Shopify" },
  { property: "og:description", content: "Turn your Shopify product pages into a clearer reason to buy with bundles, product-specific discounts, delivery estimates, and AI-assisted product copy." },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  return { showForm: Boolean(login) };
};

export default function Home() {
  const { showForm } = useLoaderData<typeof loader>();
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">
                <span></span> Shopify product page app
              </div>
              <h1>
                Give shoppers more reasons to <em>add to cart.</em>
              </h1>
              <p className="lead">
                Bring product bundles, relevant discounts, delivery estimates, and clearer product benefits together on your Shopify product pages.
              </p>
              <div className="hero-actions">
                <a className="btn" href="https://apps.shopify.com/product-discount-3">
                  Add Page Booster to Shopify <span aria-hidden="true">↗</span>
                </a>
                <a className="btn btn-outline" href="#features">
                  Explore the features
                </a>
              </div>
              <div className="tiny">No coding required · Plans from $4/month</div>
            </div>
            <div className="preview" aria-label="Illustrative product page showing Page Booster widgets">
              <div className="preview-head">
                <b>NORTH</b>
                <span>Shop &nbsp; Collections &nbsp; Cart (0)</span>
              </div>
              <div className="preview-body">
                <div className="product-art" role="img" aria-label="Illustrative product photo placeholder">
                  <div className="bottle"></div>
                </div>
                <div className="demo-info">
                  <div className="mini-kicker">EVERYDAY ESSENTIALS</div>
                  <h3>North / 04 Eau de Parfum</h3>
                  <div className="stars">★★★★★ &nbsp; 4.8</div>
                  <div className="price">
                    $48.00 <s>$60.00</s>
                  </div>
                  <div className="widget coupon">
                    <div className="coupon-row">
                      <div>
                        <strong>A little extra off</strong>
                        <small>Use this code at checkout</small>
                      </div>
                      <span className="code">SAVE10</span>
                    </div>
                  </div>
                  <div className="widget">
                    <strong>Arrives as soon as Oct 3–6</strong>
                    <small>Estimated delivery for this item</small>
                  </div>
                  <div className="widget bundle">
                    <span className="thumb"></span>
                    <div>
                      <strong>Complete the set</strong>
                      <small>Add a companion item as a bundle</small>
                    </div>
                  </div>
                  <span className="add">Add to cart</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="features">
          <div className="wrap">
            <div className="section-head">
              <div className="tag">One product page. More useful answers.</div>
              <h2>Help shoppers decide while they’re still considering.</h2>
              <p>Give the right offer and the right information at the point where the buying decision happens.</p>
            </div>
            <div className="features">
              <article className="feature">
                <img className="feature-visual" src="/assets/bundles.png" alt="Two complementary skincare items shown as a bundle" loading="lazy" width="1254" height="1254" />
                <div className="num">01 / BUNDLES</div>
                <h3>Make the next item an easy choice.</h3>
                <p>Pair products in a bundle so shoppers can discover complementary items without searching your store.</p>
              </article>
              <article className="feature">
                <img className="feature-visual" src="/assets/discounts.png" alt="A percent discount ticket alongside a product box" loading="lazy" width="1254" height="1254" />
                <div className="num">02 / DISCOUNTS</div>
                <h3>Show an offer that fits the product.</h3>
                <p>Create product-specific coupon codes with percentage or fixed discounts, ready for customers to use at checkout.</p>
              </article>
              <article className="feature">
                <img className="feature-visual" src="/assets/delivery.png" alt="Parcel, calendar, and location marker for estimated delivery" loading="lazy" width="1254" height="1254" />
                <div className="num">03 / DELIVERY DATES</div>
                <h3>Answer “when will it arrive?” early.</h3>
                <p>Show estimated delivery dates on product pages so shoppers have more information before adding to cart.</p>
              </article>
              <article className="feature">
                <img className="feature-visual" src="/assets/ai-copy.png" alt="Product bottle alongside a feature card and sparkle" loading="lazy" width="1254" height="1254" />
                <div className="num">04 / AI-ASSISTED COPY</div>
                <h3>Say what makes the product worth buying.</h3>
                <p>Generate a starting point for product features and benefits, then review and tailor the copy to your brand.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="wrap">
            <div className="section-head">
              <div className="tag">Simple setup</div>
              <h2>From installation to a more helpful product page.</h2>
            </div>
            <div className="flow">
              <div className="step">
                <b>01</b>
                <h3>Install the app</h3>
                <p>Add Page Booster to your Shopify store and open its dashboard.</p>
              </div>
              <div className="step">
                <b>02</b>
                <h3>Choose what to show</h3>
                <p>Set up your bundles, product discounts, delivery estimates, and product copy.</p>
              </div>
              <div className="step">
                <b>03</b>
                <h3>Publish your blocks</h3>
                <p>Display the selected features on your product pages without editing theme code.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="pricing">
          <div className="wrap">
            <div className="pricing">
              <div>
                <div className="tag">Pricing</div>
                <h2>Start with the features you need.</h2>
                <p>Plans start at $4/month. See current plan details and available features before installing.</p>
              </div>
              <div className="price-actions">
                <a className="btn" href="/pricing">
                  View all plans <span aria-hidden="true">↗</span>
                </a>
                <a href="https://apps.shopify.com/product-discount-3">View on Shopify App Store</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap faq">
            <div className="tag" style={{ textAlign: "center" }}>
              Common questions
            </div>
            <h2>Good to know before you install.</h2>
            <details>
              <summary>Do I need to edit my theme code?</summary>
              <p>No. Page Booster is designed for setup without coding. Follow the app’s installation guide to enable the blocks in your theme.</p>
            </details>
            <details>
              <summary>Can I use a fixed amount discount?</summary>
              <p>Yes. Product-specific coupons can use a percentage or a fixed amount discount.</p>
            </details>
            <details>
              <summary>Can I edit the AI-generated content?</summary>
              <p>Yes. Treat generated features and benefits as a draft, then review and customize them for your product.</p>
            </details>
            <details>
              <summary>Where can I get help setting it up?</summary>
              <p>
                Visit the <a href="/installation-guide" style={{ color: "var(--green)", textDecoration: "underline" }}>installation guide</a> or contact <a href="/support" style={{ color: "var(--green)", textDecoration: "underline" }}>support</a>.
              </p>
            </details>
          </div>
        </section>

        <section className="closing">
          <div className="wrap">
            <h2>Make every product page work a little harder.</h2>
            <p>Put offers, delivery information, and product benefits where shoppers can act on them.</p>
            <a className="btn" href="https://apps.shopify.com/product-discount-3">
              Add Page Booster to Shopify <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
