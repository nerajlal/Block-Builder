import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const meta: MetaFunction = () => [
  { title: "Block Builder | Product page blocks for Shopify" },
  { name: "description", content: "Add polished trust, shipping, product information, and offer blocks to Dawn and other Shopify Online Store 2.0 themes." },
  { property: "og:title", content: "Block Builder for Shopify" },
  { property: "og:description", content: "Thoughtful product-page blocks you can place and customize in Shopify's theme editor." },
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
}
