import type { MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getBlogs } from "../blog.server";
import "../landing.css";

export const meta: MetaFunction = () => [
  { title: "Our Blogs — SectionKit Shopify Theme Sections" },
  {
    name: "description",
    content: "Read our latest articles, guides, and tips on building high-converting Shopify product pages and customizing theme sections.",
  },
  { property: "og:title", content: "Our Blogs — SectionKit" },
  {
    property: "og:description",
    content: "Read our latest articles, guides, and tips on building high-converting Shopify product pages.",
  },
];

export const loader = async ({ request }: { request: Request }) => {
  const blogs = await getBlogs();
  const perPage = 6;
  const lastPage = Math.max(1, Math.ceil(blogs.length / perPage));
  const requestedPage = Number(new URL(request.url).searchParams.get("page") || "1");
  const page = Number.isSafeInteger(requestedPage) ? Math.min(Math.max(requestedPage, 1), lastPage) : 1;
  return { blogs: blogs.slice((page - 1) * perPage, page * perPage), page, lastPage, total: blogs.length, perPage };
};

export default function BlogsIndex() {
  const { blogs, page, lastPage, total, perPage } = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap" style={{ textAlign: "center" }}>
            <h1 style={{ margin: "0 auto" }}>Our Blogs</h1>
            <p style={{ margin: "15px auto 0" }}>
              Stay updated with our latest news and articles
            </p>
          </div>
        </section>

        <section className="section alt blogs-list-section">
          <div className="wrap">
            {blogs && blogs.length > 0 ? (
              <div className="blog-grid">
                {blogs.map((blog) => (
                  <Link to={`/blogs/${blog.slug}`} key={blog.id} className="blog-card">
                    {blog.cover_image ? (
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="blog-card-img"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "220px",
                          display: "grid",
                          placeItems: "center",
                          background: "#e9efe4",
                          color: "var(--green)",
                        }}
                      >
                        <i className="fa-solid fa-cube" style={{ fontSize: "32px" }}></i>
                      </div>
                    )}
                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <span>{blog.formatted_date}</span>
                        <span>•</span>
                        <span>{blog.read_time}</span>
                      </div>
                      <h2 className="blog-card-title">{blog.title}</h2>
                      <p className="blog-card-excerpt">{blog.excerpt}</p>
                      <span className="blog-card-link">
                        READ ARTICLE <i className="fa-solid fa-arrow-right" style={{ fontSize: "11px", marginLeft: "4px" }}></i>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
                <h3>No articles found</h3>
                <p>Check back soon for new guides and updates.</p>
              </div>
            )}
            {lastPage > 1 && (
              <nav className="blog-pagination" aria-label="Blog pages">
                <span className="blog-pagination__summary">
                  Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total} articles
                </span>
                <div className="blog-pagination__controls">
                  {page > 1 ? <Link className="blog-pagination__link" to={`/blogs?page=${page - 1}`} rel="prev">Previous</Link> : <span className="blog-pagination__disabled" aria-disabled="true">Previous</span>}
                  {Array.from({ length: lastPage }, (_, index) => index + 1)
                    .filter((number) => Math.abs(number - page) <= 2)
                    .map((number) => number === page
                      ? <span className="blog-pagination__current" aria-current="page" key={number}>{number}</span>
                      : <Link className="blog-pagination__link" to={`/blogs?page=${number}`} aria-label={`Page ${number}`} key={number}>{number}</Link>)}
                  {page < lastPage ? <Link className="blog-pagination__link" to={`/blogs?page=${page + 1}`} rel="next">Next</Link> : <span className="blog-pagination__disabled" aria-disabled="true">Next</span>}
                </div>
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
