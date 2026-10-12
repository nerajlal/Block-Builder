const API_URL = "https://blogs.task19.com/api/v1/projects/blogs";
const API_KEY = process.env.BLOG_API_KEY || "pk_QRnasMMO72O29e8qbGFYECEc9h2TDYt4";
const BASE_MEDIA_DOMAIN = "https://blogs.task19.com";

export interface BlogSection {
  id: number;
  blog_id: number;
  text_content: string | null;
  image_path: string | null;
  image_url: string | null;
  order?: number;
}

export interface BlogItem {
  id: number;
  project_id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  cover_image: string;
  status?: string;
  published_at?: string;
  formatted_date: string;
  read_time: string;
  author_name: string;
  author_title: string;
  category_name: string;
  sections: BlogSection[];
}

let cachedBlogs: BlogItem[] | null = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveMediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_MEDIA_DOMAIN}/${cleanPath}`;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "Recent";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Recent";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recent";
  }
}

// Normalize blog data per documentation specifications
export function normalizeBlog(raw: any): BlogItem {
  const sections: BlogSection[] = Array.isArray(raw.sections)
    ? raw.sections.map((sec: any) => ({
        id: Number(sec.id || 0),
        blog_id: Number(sec.blog_id || raw.id || 0),
        text_content: sec.text_content || null,
        image_path: sec.image_path || null,
        image_url: sec.image_path ? resolveMediaUrl(sec.image_path) : null,
        order: sec.order !== undefined ? Number(sec.order) : 0,
      }))
    : [];

  // Excerpt calculation: Use excerpt if present, otherwise strip HTML from first section text
  let excerpt = "";
  if (raw.excerpt && typeof raw.excerpt === "string" && raw.excerpt.trim()) {
    excerpt = raw.excerpt.trim();
  } else if (sections.length > 0 && sections[0].text_content) {
    const plain = stripHtml(sections[0].text_content);
    excerpt = plain.length > 150 ? plain.slice(0, 150).trim() + "..." : plain;
  }

  // Calculated read time based on total words across all sections
  let totalWords = 0;
  sections.forEach((sec) => {
    if (sec.text_content) {
      const plain = stripHtml(sec.text_content);
      const words = plain.split(/\s+/).filter(Boolean).length;
      totalWords += words;
    }
  });
  if (raw.content) {
    const plain = stripHtml(raw.content);
    totalWords += plain.split(/\s+/).filter(Boolean).length;
  }
  const readMinutes = Math.max(1, Math.ceil(totalWords / 200));

  return {
    id: Number(raw.id || 0),
    project_id: raw.project_id ? Number(raw.project_id) : undefined,
    title: String(raw.title || "Untitled Blog"),
    slug: String(raw.slug || ""),
    excerpt,
    content: raw.content || "",
    cover_image: resolveMediaUrl(raw.cover_image),
    status: raw.status || "published",
    published_at: raw.published_at || null,
    formatted_date: formatDate(raw.published_at),
    read_time: `${readMinutes} min read`,
    author_name: raw.author_name || "Task19 Technologies",
    author_title: raw.author_title || "Shopify App Development Team",
    category_name: raw.category_name || "Shopify Apps",
    sections,
  };
}

export async function getBlogs(forceRefresh = false): Promise<BlogItem[]> {
  const now = Date.now();
  if (!forceRefresh && cachedBlogs && now < cacheExpiry) {
    return cachedBlogs;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": API_KEY,
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`Blog API failed with status ${response.status}`);
      return cachedBlogs || [];
    }

    const data = await response.json();
    const rawBlogs: any[] = Array.isArray(data.blogs) ? data.blogs : [];
    const normalized = rawBlogs.map(normalizeBlog);

    // Sort by published_at desc
    normalized.sort((a, b) => {
      const timeA = a.published_at ? new Date(a.published_at).getTime() : 0;
      const timeB = b.published_at ? new Date(b.published_at).getTime() : 0;
      return timeB - timeA;
    });

    cachedBlogs = normalized;
    cacheExpiry = now + CACHE_TTL_MS;
    return normalized;
  } catch (error) {
    console.error("Failed to fetch blogs from Task19 API:", error);
    return cachedBlogs || [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogItem | null> {
  const blogs = await getBlogs();
  const found = blogs.find((b) => b.slug === slug);
  return found || null;
}
