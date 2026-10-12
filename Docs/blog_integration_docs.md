# Custom Blog Integration: Architecture & Strategy Guide

This document outlines the architecture, data flows, and design strategies used to integrate external API-driven blogs into the Laravel application. Use this guide as a complete blueprint for replicating the exact same system in other projects.

---

## 0. Design Reference
The UI aesthetics, CSS structures, and interactive elements were explicitly modeled after the design system of **[custompricing.task19.com](https://custompricing.task19.com)**. This includes:
- "Resources & Updates" header tag styling.
- White category pill tag overlays on cover images.
- Desktop 3-card grid and mobile horizontal touch swiper.
- Compact typography scale (18px card headings).
- Sticky 2-card sidebar on article pages (Author Profile + "Need Help With Your Store?" themed CTA).
- Homepage "COMMON QUESTIONS" FAQ accordion before the closing banner.

---

## 1. Routing & API Architecture

Instead of storing blog posts in a local database, the system consumes data dynamically from an external REST API with high-performance caching.

### API Credentials & Endpoint:
- **API Endpoint:** `https://blogs.task19.com/api/v1/projects/blogs`
- **Authentication:** `X-API-KEY: pk_QRnasMMO72O29e8qbGFYECEc9h2TDYt4`
- **Base Media Domain:** `https://blogs.task19.com`

### Service Layer: `App\Services\BlogService`
Authentication, HTTP fetching, error handling, caching, and data normalization are encapsulated in a dedicated service:

```php
namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class BlogService
{
    const API_URL = 'https://blogs.task19.com/api/v1/projects/blogs';
    const API_KEY = 'pk_QRnasMMO72O29e8qbGFYECEc9h2TDYt4';
    const BASE_IMAGE_DOMAIN = 'https://blogs.task19.com';

    public static function getBlogs(): array
    {
        return Cache::remember('task19_api_blogs', 1800, function () {
            try {
                $apiKey = config('services.blogs.key', env('BLOG_API_KEY', self::API_KEY));
                $apiUrl = config('services.blogs.url', env('BLOG_API_URL', self::API_URL));

                $response = Http::withHeaders([
                    'Accept' => 'application/json',
                    'X-API-KEY' => $apiKey,
                ])->timeout(10)->get($apiUrl);

                if (!$response->successful()) {
                    return [];
                }

                $data = $response->json();
                $blogs = $data['blogs'] ?? [];

                return array_map(function ($blog) {
                    return self::normalizeBlog($blog);
                }, $blogs);
            } catch (\Throwable $e) {
                return [];
            }
        });
    }

    public static function findBySlug(string $slug): ?array
    {
        $blogs = self::getBlogs();
        return collect($blogs)->firstWhere('slug', $slug);
    }
}
```

### Controller Layer: `App\Http\Controllers\BlogController`
- **Listing (`/blogs`):** Fetches blogs and wraps them in Laravel's `LengthAwarePaginator` (6 items per page) for standard pagination support.
- **Single Article (`/blogs/{slug}`):** Fetches the post by slug; triggers `abort(404)` if not found.

### Routes in `routes/web.php`:
```php
Route::get('/blogs', [\App\Http\Controllers\BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blogs.show');
```

---

## 2. Data Normalization & Defensive Fallbacks

The external API returns rich, dynamic JSON payloads. `BlogService::normalizeBlog()` standardizes fields before rendering:

1. **Cover Image Path Correction:**
   The API provides relative paths like `/storage/blogs/banners/...`. The service strips leading slashes and prepends `https://blogs.task19.com/` to prevent broken 404 image URLs.
2. **Dynamic Section Parsing:**
   Iterates over `$blog['sections']` and normalizes both `image_url` and `text_content`.
3. **Excerpt Fallback:**
   If the top-level `excerpt` field is empty, the system automatically pulls the first section's `text_content`, strips HTML tags, and truncates to 150 characters.
4. **Calculated Read Time:**
   Computes approximate reading time dynamically based on the total word count of all sections: `max(1, ceil($wordCount / 200))`.
5. **Formatted Date:**
   Formats raw timestamps (`2026-10-10T...`) into human-readable format: `Oct 10, 2026`.

---

## 3. Homepage Integration (`loyalty_landing.blade.php`)

The Blog section is placed **directly before the Pricing section** (`#pricing`), followed by the **Common Questions (FAQ)** section before the closing banner.

### Desktop View:
- Displays **3 cards** in a clean responsive grid (`grid-template-columns: repeat(auto-fit, minmax(300px, 360px)); gap: 28px;`).
- Top-right header contains a `"View all articles →"` button.

### Mobile View (Touch-Optimized Side Swiper):
- Smooth horizontal side-swiper (`overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;`).
- Cards snap to viewport: `flex: 0 0 85%; max-width: 330px; scroll-snap-align: start;`.
- Scrollbars hidden for a native app feel.
- Directly beneath the swiper: a full-width outline button (`.btn-outline-mobile`):
  `View all articles ↗` with transparent background, branded border, and tap transition.

---

## 4. Blog Listing Page (`resources/views/blogs.blade.php`)

Modeled after `custompricing.task19.com/blogs`:
- **Page Hero:** Centered dark banner with `"Our Blogs"` and subtitle.
- **Card Design:**
  - **Cover Image:** `220px` height with subtle bottom border separator.
  - **Category Pill:** White rounded badge with dark text positioned top-left over the image (`Shopify Apps` / Category).
  - **Meta Line:** `Oct 10, 2026 • 5 min read` in muted gray.
  - **Card Title Heading:** Reduced to **18px**, bold `700`, Manrope font with compact `1.35` line height.
  - **Excerpt:** Clamped to 3 lines (`14px`, `1.6` line height).
  - **Bottom Action:** Bold uppercase `READ ARTICLE →` link with hover slide effect.
  - **Card Hover:** Subtle `translateY(-4px)` lift and soft drop shadow.

---

## 5. Single Article Page (`resources/views/blog-show.blade.php`)

### Exact Blog Content Only (No Extra Buttons):
- The article body strictly renders the authentic API content:
  - 16:9 rounded cover image.
  - Section loop rendering `image_path` and rich-text `text_content`.
  - **No artificial bottom CTA buttons** or intrusive install buttons inside the article flow.

### Dark Hero Banner:
- `var(--dark)` background with ambient glow effects.
- `← All Articles` back link.
- Green category pill tag.
- Fluid `h1` title.
- Meta row with icons: Date, Read time, and Author (`Task19 Technologies`).

### Fixed / Sticky 2-Card Sidebar:
Configured with `position: sticky; top: 96px; align-self: start; z-index: 10;` so it remains locked in view as the user reads:

1. **About the Author Card:**
   - Dark theme avatar badge (`TA`) with lime text.
   - Title: `About the Author`.
   - Name: `Task19 Technologies` · `Shopify App Development Team`.
   - Bio: *"Task19 Technologies is a dedicated e-commerce expert focusing on scalable growth strategies and comprehensive Shopify implementations."*

2. **Need Help With Your Store? (Themed CTA Card):**
   - Background: Dark forest green gradient (`linear-gradient(145deg, #0d2319 0%, #164630 100%)`) with `#23583d` border matching Profit Saver's brand.
   - Subtitle: *"Get a free technical audit and find out how we can improve your custom pricing."*
   - Button: Brand **lime pill button** (`var(--lime)` / `#d5f56e`) with bold dark text: **`Get Free Audit`** (linking to `https://task19.com/contact`).

---

## 6. Homepage Common Questions (FAQ Section)

Positioned between the Pricing section and the Closing banner:
- **Eyebrow Tag:** `COMMON QUESTIONS` (centered, green uppercase).
- **Heading:** `Good to know before you install.`
- **Interactive Accordion:**
  1. *Do I need to edit my theme code?*
  2. *Can I set a fixed price instead of a percentage discount?*
  3. *How do customers see their points?*
  4. *Where can I get help setting it up?*
- Clean border-separated rows with `+` / `−` indicators that toggle on click.

---

## 7. Global Navigation & Footer
- Removed redundant blog link from main header navigation for a cleaner top bar.
- Added permanent `<a href="{{ route('blogs.index') }}">Blogs</a>` link to the footer navigation in `layouts/public.blade.php`.
