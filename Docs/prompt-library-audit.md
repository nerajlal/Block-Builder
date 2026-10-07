# Launchgify prompt library — integration audit

_Last reviewed: 7 October 2026. Every named folder and text snippet was indexed; selected snippets received deeper code review. This is not a line-by-line security or rights approval. See [prompt-library-inventory.md](prompt-library-inventory.md) for all 108 entries._

## What the folder contains

`Launchgify-Prompts/All 107+ Codes` has 108 named component folders. Across the whole `Launchgify-Prompts` folder there are 111 text files, 94 PNG images, 16 MP4 videos, one JPG, and one DOCX. The examples appear to be standalone HTML/CSS/JavaScript snippets with screenshots or demonstrations. A simple scan found 80 snippets containing a full HTML document, 43 using `body`-level styles, 69 containing external HTTP URLs, and 33 containing script tags. These counts are text-pattern estimates, not a security review. The folder does not contain a clear license or redistribution statement.

These snippets are **reference material**, not production extension code. The Block Builder extension implements its own Liquid, scoped CSS, Shopify theme-editor settings, and small purpose-built JavaScript. The raw folder is excluded from Git so it is not accidentally shipped with the app; keep the source collection in a separate backed-up location if it must be retained.

## Ideas now represented in Block Builder

| Reference ideas | Block Builder implementation |
| --- | --- |
| Product features, Product features 2/3 | Product highlights and Image story |
| Free Shipping, Delivery Time & Guarantee, Order Arrive | Delivery estimate; merchant wording, no invented delivery date |
| In Stock, Low Stock variants | Stock note; real selected variant availability, no fake stock count |
| Payment Badge | Payment methods; uses `shop.enabled_payment_types` |
| FAQ, Info Tabs | Product FAQ and Information tabs |
| Comparison table, Comparison Table 2, Us vs Them | Comparison table; merchant-entered factual rows |
| Before and after image slider | Before & after; merchant-selected images and an accessible range control |
| Best Seller, Top Selling, Special Sale Orange | Product badge and Promotion banner; neutral editable copy by default |
| Info Section with images v2, Info section of your product v2 | Image story |
| Copyable discount bar/code variants | Discount code; merchant supplies an existing Shopify discount code |
| Scroll to top button | Scroll to top store-wide app embed |

The existing Trust strip also covers several simple reassurance layouts in the reference collection. The new blocks are intentionally fresh implementations; no reference snippet HTML or CSS was copied into the theme extension.

## Candidate additions after merchant testing

- **Announcement bar:** Could be a separate app embed for site-wide display. It needs position controls, close behavior, and conflict checks with theme announcement bars. The current Promotion banner is product-page-only.
- **Discount-code verification:** The current copyable code block tells merchants to create and test a matching Shopify discount. A later version could verify the code via a narrowly scoped Admin API integration.
- **Design presets:** The prompt pack contains many visual variants of the same feature. These need settings/presets in each functional block, not one Liquid file per screenshot. Shopify currently limits one theme app extension to 30 app blocks.
- **Collection circles / image sliders / video tabs:** Need image/video pickers, mobile handling, keyboard controls, and media performance checks.
- **Scroll-to-top button:** Best as an optional app embed rather than a product section.
- **How-to-use and product information variations:** Could be variants of Image story, Product FAQ, and Information tabs rather than many near-duplicate blocks.

## Requires a real data source or separate product logic

- **Reviews and ratings:** Customer Review, Customer Review Star variants, Reviews Slider, Scrolling Reviews, Verified Purchases, Google Reviews, Trustpilot, and similar concepts need genuine review records or a consented integration. Static five-star ratings and invented testimonials must not be published as customer feedback.
- **Bundles, gifts, wholesale, and discounts:** Buy 3 Pay 2, Free gift checkout, Whole Sale, coupon/discount-code layouts, and several sale cards need real Shopify products, discount rules, cart behavior, and entitlement tests. A visual banner alone cannot apply these offers.
- **Shipping thresholds and arrival dates:** Free Shipping 2, Unlocked Free Shipping, Free delivery CTA, Order Arrive, and related layouts need the merchant's shipping rules or clearly editable factual statements.
- **Inventory and urgency:** Low Stock, Limited Stock, Items Sold, Hurry up, 8 items left, countdowns, and live-sale concepts should use real inventory, order, or campaign data. A random number or arbitrary countdown is not a valid product signal.
- **Payment or financing claims:** Klarna and similar provider-specific layouts should appear only when the provider and terms actually apply to the store and market.

## Do not import as-is

Names such as **Fake FB Comment**, **15 people have**, **2000+ people voted**, **One Million Happy Customers**, **Customer Live Sale**, and several “viral” or social-platform views templates suggest simulated social proof. Representative snippets include fixed or random activity counts. Block Builder should not display these as real customer behavior. Seasonal examples such as Black Friday, Christmas, Easter, and Valentine's Day can instead be styling presets for a merchant-authored promotion, with no hardcoded dates or false availability.

## Acceptance rules for any future port

1. Use a theme app extension block or embed with scoped selectors, not a full HTML document or global `body` styling.
2. Move merchant text, colors, links, images, and settings into the Shopify theme editor; escape user text in Liquid.
3. Use Shopify CDN image filters and avoid unnecessary third-party asset calls.
4. Ensure a claim about payment, reviews, inventory, delivery, or discounts comes from real data or clear merchant-provided copy.
5. Support keyboard use, mobile layouts, and theme editor section reloads; verify in Dawn before release.
6. Check rights to redistribute the original prompt pack or its assets before offering raw snippets or images to merchants. Current Block Builder blocks do not distribute that source material.

The remaining implementation work is in [library-completion-plan.md](library-completion-plan.md); the project-wide release checklist is in [details.md](details.md).
