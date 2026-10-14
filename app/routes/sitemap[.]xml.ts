import { getBlogs } from "../blog.server";

const baseUrl = "https://sectionkit.task19.com";
const pages = ["/", "/pricing", "/installation-guide", "/support", "/privacy", "/terms", "/blogs"];

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[char] || char);
}

export async function loader() {
  const blogs = await getBlogs();
  const urls = [
    ...pages.map((path) => `${baseUrl}${path}`),
    ...blogs.filter((blog) => blog.slug && blog.status === "published")
      .map((blog) => `${baseUrl}/blogs/${encodeURIComponent(blog.slug)}`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(urls)].map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join("\n")}\n</urlset>\n`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=900" },
  });
}
