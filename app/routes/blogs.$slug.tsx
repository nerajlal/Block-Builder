import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getBlogBySlug } from "../blog.server";
import "../landing.css";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.blog) {
    return [{ title: "Blog Not Found — SectionKit" }];
  }
  const { blog } = data;
  return [
    { title: `${blog.title} — SectionKit Blog` },
    { name: "description", content: blog.excerpt },
    { property: "og:title", content: blog.title },
    { property: "og:description", content: blog.excerpt },
    ...(blog.cover_image ? [{ property: "og:image", content: blog.cover_image }] : []),
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) {
    throw new Response("Slug not provided", { status: 400 });
  }

  const blog = await getBlogBySlug(slug);
  if (!blog) {
    throw new Response("Blog post not found", { status: 404 });
  }

  return { blog };
};

export default function BlogShow() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <div className="blog-article-page">
      <Header />
      <main>
        {/* Dark Hero Banner with Ambient Glows */}
        <section className="blog-hero">
          <div className="blog-hero-glow-left" aria-hidden="true"></div>
          <div className="blog-hero-glow-right" aria-hidden="true"></div>
          <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
            <Link to="/blogs" className="blog-back-link">
              <i className="fa-solid fa-arrow-left"></i> All Articles
            </Link>

            <div>
              <span className="blog-category-tag">{blog.category_name || "General"}</span>
              <h1>{blog.title}</h1>

              <div className="blog-hero-meta">
                <div className="blog-hero-meta-item">
                  <i className="fa-regular fa-calendar"></i>
                  <span>{blog.formatted_date}</span>
                </div>
                <div className="blog-hero-meta-item">
                  <i className="fa-regular fa-clock"></i>
                  <span>{blog.read_time}</span>
                </div>
                <div className="blog-hero-meta-item">
                  <i className="fa-regular fa-user"></i>
                  <span>{blog.author_name}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="blog-main-container">
          <div className="wrap">
            <div className="blog-layout">
              {/* Authentic Article Body */}
              <article className="blog-article">
                {blog.cover_image && (
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="blog-cover-image"
                  />
                )}

                <div className="blog-content">
                  {blog.sections && blog.sections.length > 0 ? (
                    blog.sections.map((section, idx) => (
                      <div key={section.id || idx} style={{ marginBottom: "28px" }}>
                        {section.image_url && (
                          <img
                            src={section.image_url}
                            alt=""
                            loading="lazy"
                          />
                        )}
                        {section.text_content && (
                          <div
                            dangerouslySetInnerHTML={{ __html: section.text_content }}
                          />
                        )}
                      </div>
                    ))
                  ) : blog.content ? (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : null}
                </div>
              </article>

              {/* Sidebar Components */}
              <aside className="blog-sidebar" aria-label="Sidebar">
                {/* 1. About the Author */}
                <div className="blog-sidebar-card">
                  <div className="blog-author-title">About the Author</div>
                  <div className="blog-author-profile">
                    <div className="blog-author-avatar">TA</div>
                    <div>
                      <h4 className="blog-author-name">{blog.author_name}</h4>
                      <p className="blog-author-role">{blog.author_title}</p>
                    </div>
                  </div>
                  <p className="blog-author-bio">
                    Task19 Technologies is a dedicated e-commerce expert team focusing on scalable growth strategies, conversion optimization, and comprehensive Shopify implementations.
                  </p>
                </div>

                {/* 2. Themed CTA Card */}
                <div className="blog-cta-card">
                  <h3 className="blog-cta-title">Need Help With Your Store?</h3>
                  <p className="blog-cta-subtitle">
                    Get a free technical audit and find out how we can improve your storefront conversion and theme blocks.
                  </p>
                  <a
                    href="https://task19.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-cta-btn"
                  >
                    Get Free Audit <i className="fa-solid fa-arrow-right" style={{ fontSize: "13px", marginLeft: "6px" }}></i>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
