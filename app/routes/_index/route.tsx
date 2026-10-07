import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const meta: MetaFunction = () => [
<<<<<<< HEAD
  { title: "Block Builder — Product deals, discounts & delivery dates for Shopify" },
  { name: "description", content: "Turn your Shopify product pages into a clearer reason to buy with bundles, product-specific discounts, delivery estimates, and AI-assisted product copy." },
  { property: "og:title", content: "Block Builder for Shopify" },
  { property: "og:description", content: "Turn your Shopify product pages into a clearer reason to buy with bundles, product-specific discounts, delivery estimates, and AI-assisted product copy." },
=======
  { title: "Block Builder | Product page blocks for Shopify" },
  { name: "description", content: "Add polished trust, shipping, product information, and offer blocks to Dawn and other Shopify Online Store 2.0 themes." },
  { property: "og:title", content: "Block Builder for Shopify" },
  { property: "og:description", content: "Thoughtful product-page blocks you can place and customize in Shopify's theme editor." },
>>>>>>> f1e661c6e6a349db8d6c5d25d9cc11e79a565c1e
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
<<<<<<< HEAD
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
                  Add Block Builder to Shopify <span aria-hidden="true">↗</span>
                </a>
                <a className="btn btn-outline" href="#features">
                  Explore the features
                </a>
              </div>
              <div className="tiny">No coding required · Plans from $4/month</div>
            </div>
            <div className="preview" aria-label="Illustrative product page showing Block Builder widgets">
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
                <p>Add Block Builder to your Shopify store and open its dashboard.</p>
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
              <p>No. Block Builder is designed for setup without coding. Follow the app’s installation guide to enable the blocks in your theme.</p>
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
              Add Block Builder to Shopify <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
=======
  return <main className={styles.page}>
    <header className={styles.header}><span className={styles.brandIcon}>▦</span><strong>Block Builder</strong><a href="#how-it-works">How it works</a></header>
    <section className={styles.hero}>
      <div className={styles.heroText}><span className={styles.eyebrow}>For Shopify storefronts</span><h1>Make every product page feel thoughtfully built.</h1><p>Add polished product-page details to Dawn and other Online Store 2.0 themes. Choose a block, customize it in Shopify&apos;s theme editor, and publish when it feels right.</p><a className={styles.primaryLink} href="#blocks">Explore blocks</a></div>
      <div className={styles.preview} aria-label="Example product page blocks"><div className={styles.previewTop}><span className={styles.previewDot}></span><span className={styles.previewDot}></span><span className={styles.previewDot}></span></div><div className={styles.previewBody}><div className={styles.productImage}><span>PRODUCT<br/>PREVIEW</span></div><div className={styles.previewDetails}><span className={styles.smallLabel}>A MORE CONSIDERED PRODUCT PAGE</span><h2>Everyday essentials</h2><p>Beautiful details that help shoppers decide.</p><div className={styles.previewLine}></div><div className={styles.previewBlock}>✓ Secure checkout &nbsp; ✓ Easy returns</div><div className={styles.previewBlock}>🚚 Estimated delivery in 3–5 days</div><div className={styles.previewButton}>Add to cart</div></div></div></div>
    </section>
    <section className={styles.section} id="blocks"><span className={styles.eyebrow}>The library</span><h2>Useful details, ready to place</h2><div className={styles.cards}><article><span>01 / TRUST</span><h3>Trust strip</h3><p>Reassure shoppers with clear, editable service messages.</p></article><article><span>02 / SHIPPING</span><h3>Delivery estimate</h3><p>Show an honest, merchant-controlled delivery message.</p></article><article><span>03 / PRODUCT</span><h3>Product highlights</h3><p>Make the most useful product benefits easy to scan.</p></article><article><span>04 / OFFERS</span><h3>Promotion banner</h3><p>Give a genuine promotion a polished place on the page.</p></article><article><span>05 / AVAILABILITY</span><h3>Stock note</h3><p>Display variant availability without invented urgency.</p></article><article><span>06 / TRUST</span><h3>Payment methods</h3><p>Show payment logos enabled for the store and market.</p></article><article><span>07 / PRODUCT</span><h3>Product badge</h3><p>Highlight a genuine product attribute in a refined label.</p></article><article><span>08 / DETAILS</span><h3>Product FAQ</h3><p>Answer the questions shoppers ask before buying.</p></article><article><span>09 / STORY</span><h3>Image story</h3><p>Pair a product image with a short, considered narrative.</p></article><article><span>10 / DETAILS</span><h3>Comparison table</h3><p>Show an honest side-by-side view of product details.</p></article><article><span>11 / VISUAL</span><h3>Before & after</h3><p>Let shoppers explore a real visual comparison.</p></article><article><span>12 / DETAILS</span><h3>Information tabs</h3><p>Keep product information organized and easy to browse.</p></article><article><span>13 / OFFERS</span><h3>Discount code</h3><p>Display a copyable code already created in Shopify.</p></article><article><span>14 / UTILITY</span><h3>Scroll to top</h3><p>Add a subtle navigation control across the store.</p></article></div></section>
    <section className={styles.workflow} id="how-it-works"><div><span className={styles.eyebrow}>Simple setup</span><h2>Your theme stays yours.</h2><p>Blocks live in Shopify&apos;s theme editor. Place, edit, reorder, or remove them without pasting Liquid into theme files.</p></div><ol><li><strong>Choose a block</strong><span>Browse the app&apos;s product-page library.</span></li><li><strong>Open the theme editor</strong><span>Place the block where it works best.</span></li><li><strong>Preview and publish</strong><span>Check desktop and mobile, then save.</span></li></ol></section>
    {showForm && <section className={styles.login}><div><span className={styles.eyebrow}>Already installed?</span><h2>Open Block Builder</h2><p>Enter your Shopify store domain to return to the app.</p></div><Form method="post" action="/auth/login"><label htmlFor="shop-domain">Store domain</label><div><input id="shop-domain" name="shop" type="text" placeholder="your-store.myshopify.com" required/><button type="submit">Open app</button></div></Form></section>}
    <footer className={styles.footer}><strong>Block Builder</strong><span>Built for thoughtful Shopify product pages.</span></footer>
  </main>;
>>>>>>> f1e661c6e6a349db8d6c5d25d9cc11e79a565c1e
}
