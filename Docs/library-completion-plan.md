# Bringing the full reference pack into Block Builder

The 108 supplied examples are not 108 independent Shopify features. Many are color, layout, or seasonal versions of the same concept. Shopify currently permits at most 30 app blocks in one theme app extension, so the product should offer a smaller set of functional widgets with editable design presets. The exact source-to-destination mapping is in [prompt-library-inventory.md](prompt-library-inventory.md).

## Available in the current code

Twenty-nine product-page app blocks and one store-wide app embed are now in the local code. Seven catalog cards have in-app design previews with fourteen alternate styles; the merchant selects the same design in the theme editor to apply it. They cover trust messages, delivery copy, feature lists, promotions, real variant availability, enabled payment methods, badges, FAQs, image stories, comparisons, before/after images, information tabs, an existing discount code, collection links, a gallery, media tabs, usage steps, merchant-authored guarantee and shipping copy, a size guide, a Shopify-hosted video, a gradient heading, and scroll-to-top. The six newest blocks passed the Shopify extension build but have not been released or tested in a live theme. **Install in theme** opens Shopify's theme editor; the merchant customizes the widget and saves the theme.

## Still needed for full feature coverage

| Functional widget or improvement | Reference examples | Required work |
| --- | --- | --- |
| Site-wide announcement bar | Three announcement bars, infinite scrolling information | App embed, positioning and theme-header conflict testing, accessible close/rotation behavior |
| Richer media gallery and video tabs | Tiktok videos, tabs with video, three info sliders | Multi-video selection, richer carousel controls, mobile/keyboard testing, video loading and autoplay policy |
| Scheduled promotion timer | Animated countdown and seasonal/offer timers | Real merchant-set end date and timezone, expiry behavior, no perpetual reset |
| Shipping threshold/progress | Free shipping variants and unlocked free shipping | Real Shopify shipping policy or explicit merchant-defined threshold; cart/customer currency handling |
| Product bundles and gifts | Buy 3 Pay 2, free gift checkout, wholesale | Real product selection, Shopify discount/cart behavior, eligibility and checkout tests |
| Ratings and reviews | Review sliders, stars, Google/Trustpilot, verified purchases | Verified review source or consented integration; no invented reviews or fixed ratings |
| Store activity/social proof | Cart counts, sold counts, live sale, social views | Actual authorized events/metrics; examples with random/fixed counts must not be published as live data |
| Financing provider copy | Klarna | Detect enabled provider/market and validate terms before display |
| Design presets | Seasonal banners, badges, trust/money-back variants | Original scoped CSS for each distinct style; theme editor selects style and merchant copy |

The source snippets and media are not copied into the app. Confirm redistribution rights before shipping any source asset. A page-level HTML snippet cannot simply be pasted into a Shopify theme extension: it must be rebuilt as scoped Liquid, settings, CSS, and accessible JavaScript. The six newest block types and fourteen design choices still require live theme-editor testing after a Shopify app-version release.
