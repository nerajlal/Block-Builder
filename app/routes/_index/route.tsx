import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, redirect, useLoaderData } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { getBlogs } from "../../blog.server";

// We import the CSS to apply the global styles
import "../../landing.css";

export const meta: MetaFunction = () => [
  { title: "SectionKit — Theme Sections & Blocks for Shopify" },
  { name: "description", content: "Add customizable product-page blocks, delivery estimates, trust details, and storefront utilities to Online Store 2.0 themes." },
  { property: "og:title", content: "SectionKit for Shopify" },
  { property: "og:description", content: "Add customizable product-page blocks, delivery estimates, trust details, and storefront utilities to Online Store 2.0 themes." },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  const blogs = await getBlogs();
  return { blogs };
};

export default function Home() {
  const { blogs } = useLoaderData<typeof loader>();
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">
                <span></span> For Shopify storefronts
              </div>
              <h1>
                Make every product page feel <em>thoughtfully built.</em>
              </h1>
              <p className="lead">
                Add polished product-page details to Dawn and other Online Store 2.0 themes. Choose a block, customize it in Shopify&apos;s theme editor, and publish when it feels right.
              </p>
              <div className="hero-actions">
                <a className="btn" href="/installation-guide">
                  View installation guide <span aria-hidden="true">↗</span>
                </a>
                <a className="btn btn-outline" href="#features">
                  Explore the features
                </a>
              </div>
              <div className="tiny">No coding required · Plans from $0/month</div>
            </div>
            <div style={{ position: "relative", width: "100%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.4)", transform: "rotate(1deg)", border: "6px solid #1a3a28" }}>
              <img src="/hero-app-mockup.jpg" alt="SectionKit Features Illustration" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </section>

        <section className="section alt" id="features">
          <div className="wrap">
            <div className="section-head">
              <div className="tag">FEATURES</div>
              <h2>Everything built in</h2>
              <p>Install once. Place and customize blocks directly in Shopify&apos;s theme editor.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><i className="fa-solid fa-shield-halved"></i></div>
                <h3>Trust strip</h3>
                <p>Reassure shoppers with clear, editable service messages and policies directly on the product page.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fa-solid fa-truck"></i></div>
                <h3>Delivery estimate</h3>
                <p>Show an honest, merchant-controlled delivery message to set expectations before checkout.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                <h3>Product highlights</h3>
                <p>Make the most useful product benefits easy to scan with beautiful iconography and layout.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fa-solid fa-ticket"></i></div>
                <h3>Promotion banner</h3>
                <p>Give a genuine promotion or discount code a polished place on the page to drive conversions.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fa-solid fa-box"></i></div>
                <h3>Stock note</h3>
                <p>Display variant availability without invented urgency to build trust and drive natural sales.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fa-solid fa-credit-card"></i></div>
                <h3>Payment methods</h3>
                <p>Show payment logos enabled for the store and market, letting shoppers know how they can pay.</p>
              </div>
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
                <p>Add SectionKit to your Shopify store and open its dashboard.</p>
              </div>
              <div className="step">
                <b>02</b>
                <h3>Choose what to show</h3>
                <p>Choose product blocks, set their content and designs, and place them in your theme editor.</p>
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
                <p>Plans start at $0/month. See current plan details and available features before installing.</p>
              </div>
              <div className="price-actions">
                <a className="btn" href="/pricing">
                  View all plans <span aria-hidden="true">↗</span>
                </a>
                <a href="/installation-guide">Read the installation guide</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="blogs">
          <div className="wrap">
            <div className="home-blog-top">
              <div className="section-head">
                <div className="tag">Resources & Updates</div>
                <h2>Our Blog</h2>
                <p>Actionable guides and strategies to elevate your Shopify product pages and theme blocks.</p>
              </div>
              <Link to="/blogs" className="home-blog-view-btn">
                View all articles <span aria-hidden="true">↗</span>
              </Link>
            </div>

            {blogs && blogs.length > 0 ? (
              <div className="home-blog-swiper-wrapper">
                <div className="home-blog-grid">
                  {blogs.slice(0, 3).map((blog) => (
                    <Link to={`/blogs/${blog.slug}`} key={blog.id} className="home-blog-card">
                      <div className="home-blog-card-media">
                        <span className="home-blog-card-tag">{blog.category_name || "Shopify Apps"}</span>
                        {blog.cover_image ? (
                          <img
                            src={blog.cover_image}
                            alt={blog.title}
                            className="home-blog-card-img"
                            loading="lazy"
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "var(--green)" }}>
                            <i className="fa-solid fa-cube" style={{ fontSize: "32px" }}></i>
                          </div>
                        )}
                      </div>
                      <div className="home-blog-card-body">
                        <div className="home-blog-card-meta">
                          <span><i className="fa-regular fa-calendar"></i> {blog.formatted_date}</span>
                          <span>•</span>
                          <span><i className="fa-regular fa-clock"></i> {blog.read_time}</span>
                        </div>
                        <h3 className="home-blog-card-title">{blog.title}</h3>
                        <p className="home-blog-card-desc">{blog.excerpt}</p>
                        <div className="home-blog-card-foot">
                          <div className="home-blog-card-author">
                            <i className="fa-solid fa-circle-user"></i> {blog.author_name}
                          </div>
                          <span className="home-blog-card-action">
                            Read <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <p style={{ color: "var(--muted)" }}>No blog articles available yet.</p>
            )}

            <div className="home-blog-bottom-btn">
              <Link to="/blogs" className="btn-outline-mobile">
                View all articles <span aria-hidden="true">↗</span>
              </Link>
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
              <p>No. SectionKit is designed for setup without coding. Follow the app’s installation guide to enable the blocks in your theme.</p>
            </details>
            <details>
              <summary>Does the discount-code block create a discount?</summary>
              <p>No. Create the discount in Shopify first, then display its code in the block.</p>
            </details>
            <details>
              <summary>Can I edit the block content?</summary>
              <p>Yes. Edit text and design settings in Shopify’s theme editor, then preview and save.</p>
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
            <a className="btn" href="/installation-guide">
              View installation guide <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
