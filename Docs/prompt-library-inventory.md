# Full Launchgify reference inventory

## Progress at a glance

| Measure | Count |
| --- | ---: |
| Source examples in this inventory | 108 |
| Source examples marked ✓ as represented | 73 |
| Source examples marked ✗ as not yet represented | 35 |
| Separate choices in the Block Builder library | 32 |
| Shopify theme block types in the extension | 30 (29 product blocks and 1 app embed) |
| Additional design or gallery options previewable within existing widget cards | 16 |
| Theme-editor layout options added beyond the original widgets (media slider, scrolling message, coupon, stock badge) | 4 |

The **35 remaining** are source examples to evaluate. Some are visual variations that can share a widget; others require real Shopify data or should not be offered as shown because they imply invented reviews, sales, stock, or urgency. The ✓/✗ counts below track the **108 source folders**. The local 32-card library has separate Guarantee card and Stock note blocks. Reference #73 is represented by placing both on the product page; no combined block is offered. Stock note has Note and Badge layouts and a merchant-set low-stock threshold. Black Friday shares Promotion banner, and the floating WhatsApp icon shares the Scroll to top app embed. The image and short-video galleries are one card with a Gallery type choice. Counts describe local code, not a confirmed Shopify release or storefront installation.

This indexes **all 108 named folders** in the supplied local pack. The inspection reads every text snippet and records source characteristics; it does not certify third-party code or media for redistribution. Each row maps the idea to a Shopify-native destination. Similar designs may eventually be grouped into editable presets instead of copied as separate full-page snippets.

The source pack is a local reference, excluded from Git. Its license is not documented. Never present fixed/random social proof, discount, stock, shipping, or financing claims as live store facts.

**Status key:** ✓ = a matching function is represented in the local Block Builder code, sometimes by configuring or placing more than one block; ✗ = the specific behavior is not represented yet. A ✓ does not certify a Shopify release, live theme test, or pixel-identical styling. A proposed “Shopify-native destination” does not mean it is already available.

| Sl. no. | Added? | Reference folder | Concept group | Shopify-native destination | Source flags | Supplied media |
| ---: | :---: | --- | --- | --- | --- | --- |
| 1 | ✓ | 14 days moneyback | Trust and assurances | Guarantee card; merchant enters the real 14-day policy | full-page HTML, page-level styling, external URL | png |
| 2 | ✗ | 15 people have | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | JavaScript, timed/random behavior | png |
| 3 | ✗ | 2000+ people voted | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, JavaScript | png |
| 4 | ✓ | 3 info sliders with images | Product information | Media tabs: three merchant-selected images or videos with tabs or previous/next slider controls | full-page HTML, page-level styling, JavaScript, timed/random behavior | png |
| 5 | ✓ | 8 item left & limited stock | Availability | Stock note in Note or Badge layout; opt-in low stock from actual selected-variant tracked inventory, with merchant-set threshold; no fixed count | full-page HTML, page-level styling, external URL | png |
| 6 | ✓ | 8 items left | Availability | Stock note in Note or Badge layout; actual selected-variant tracked inventory, not a fixed count | markup/CSS | png |
| 7 | ✓ | Animated countdown | Other utilities | Promotion banner with merchant-set campaign end time; visual animation differs from the source | full-page HTML, page-level styling | png |
| 8 | ✓ | Announcement Bar | Promotion and announcements | Product announcement block on product templates; site-wide version is still pending | full-page HTML, page-level styling, JavaScript, timed/random behavior | mp4 |
| 9 | ✓ | Announcement Bar 2 Mobil | Promotion and announcements | Product announcement: responsive coupon layout with a merchant-supplied existing code; product template only | full-page HTML, page-level styling, JavaScript, external URL | png |
| 10 | ✓ | Announcement Bar 2 Web | Promotion and announcements | Product announcement: responsive coupon layout with a merchant-supplied existing code; product template only | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | png |
| 11 | ✓ | Before and after image slider | Comparison and imagery | Before & after block with two merchant-selected images and a slider | JavaScript, external URL | png |
| 12 | ✓ | Best Seller | Product badges | Product badge; merchant verifies a best-seller claim | full-page HTML, page-level styling, external URL | mp4 |
| 13 | ✓ | Black Friday | Promotion and announcements | Black Friday card: Promotion banner with bold design and a real campaign end-time countdown; no timer reset | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | mp4 |
| 14 | ✗ | Buy 3 Pay 2 | Discount codes and offers | Coupon/offer block; discount must exist in Shopify | full-page HTML, page-level styling | png |
| 15 | ✓ | Christmas Day | Promotion and announcements | Promotion banner; merchant enters a real seasonal campaign | full-page HTML, page-level styling | png |
| 16 | ✗ | Click Discount | Discount codes and offers | Coupon/offer block; discount must exist in Shopify | full-page HTML, page-level styling, JavaScript | mp4 |
| 17 | ✓ | Clickable tabs with video or image | Product information | Media tabs: each tab can show a merchant-selected image or Shopify-hosted video | JavaScript, external URL | png |
| 18 | ✓ | Collection circles | Comparison and imagery | Collection circles block with merchant-selected Shopify collections | markup/CSS | png |
| 19 | ✓ | Comparison table | Comparison and imagery | Comparison table block with merchant-entered factual rows | full-page HTML, page-level styling, external URL | png |
| 20 | ✓ | Comparison Table 2 | Comparison and imagery | Comparison table; factual rows and headings | full-page HTML, page-level styling, external URL | png |
| 21 | ✓ | Copy this discount code | Discount codes and offers | Coupon/offer block; discount must exist in Shopify | JavaScript, external URL | png |
| 22 | ✓ | Copyable discount bar | Discount codes and offers | Discount code; merchant supplies an existing Shopify code | full-page HTML, page-level styling, JavaScript, external URL | mp4 |
| 23 | ✓ | Copyable discount bar 2 | Discount codes and offers | Discount code; merchant supplies an existing Shopify code | full-page HTML, page-level styling, JavaScript, external URL | png |
| 24 | ✓ | Copyable discount bar 3 | Discount codes and offers | Discount code; merchant supplies an existing Shopify code | full-page HTML, page-level styling, JavaScript, external URL | png |
| 25 | ✓ | Copyable discount bar 4 | Discount codes and offers | Discount code; merchant supplies an existing Shopify code | full-page HTML, page-level styling, JavaScript, external URL | png |
| 26 | ✗ | Countdown time + dicount code auto message + Text with image | Discount codes and offers | Coupon/offer block; discount must exist in Shopify | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | png |
| 27 | ✓ | Coupon code | Discount codes and offers | Discount code; merchant supplies an existing Shopify code | markup/CSS | png |
| 28 | ✗ | Customer  Review | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 29 | ✗ | Customer Live Sale | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | mp4 |
| 30 | ✗ | Customer Review 2 | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | mp4 |
| 31 | ✓ | Customer Review Star | Reviews and social proof | Product badge: real rating and count from standard product review metafields; no fixed values | full-page HTML, page-level styling, external URL | png |
| 32 | ✓ | Customer Review Star 2 | Reviews and social proof | Product badge: real rating and count from standard product review metafields; no fixed values | full-page HTML, page-level styling | png |
| 33 | ✓ | Customer Review Star 3 | Reviews and social proof | Product badge: real rating and count from standard product review metafields; no fixed values | full-page HTML, page-level styling, external URL | png |
| 34 | ✓ | Customer Review star 4 | Reviews and social proof | Product badge: real rating and count from standard product review metafields; no fixed values | markup/CSS | png |
| 35 | ✓ | Delivery Time & Guarantee | Trust and assurances | Delivery estimate + Guarantee card; merchant supplies actual terms | JavaScript, external URL | png |
| 36 | ✓ | Easter Sale | Promotion and announcements | Promotion banner; merchant enters a real seasonal campaign | full-page HTML, page-level styling, external URL | png |
| 37 | ✓ | Extra 20 | Promotion and announcements | Offer callout; merchant enters verified offer terms | full-page HTML, page-level styling, external URL | png |
| 38 | ✗ | Facebook Views | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling | png |
| 39 | ✗ | Facebook Viral | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 40 | ✗ | Fake FB Comment | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 41 | ✓ | FAQ | Product information | Product FAQ block with merchant-entered questions and answers | full-page HTML, page-level styling, JavaScript | png |
| 42 | ✓ | Fast shipping & 7.24 support | Trust and assurances | Trust strip; merchant verifies shipping and support claims | full-page HTML, page-level styling, external URL | png |
| 43 | ✓ | Fathers Day | Promotion and announcements | Promotion banner; merchant enters a real seasonal campaign | full-page HTML, page-level styling | png |
| 44 | ✓ | Free delivery CTA v2 | Trust and assurances | Shipping details; merchant enters actual delivery/returns terms | full-page HTML, page-level styling, external URL | png |
| 45 | ✗ | Free gift checkout | Discount codes and offers | Coupon/offer block; discount must exist in Shopify | markup/CSS | png |
| 46 | ✓ | Free Shipping | Trust and assurances | Shipping details; merchant enters actual shipping terms | external URL | png |
| 47 | ✓ | Free Shipping 2 | Trust and assurances | Shipping details; merchant enters actual shipping terms | full-page HTML, page-level styling | png |
| 48 | ✗ | Google Reviews | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | external URL | png |
| 49 | ✓ | Gradient Text | Promotion and announcements | Gradient heading block with editable text and colors | markup/CSS | png |
| 50 | ✓ | Hallowen | Promotion and announcements | Promotion banner; merchant enters a real seasonal campaign | full-page HTML, page-level styling, external URL | png |
| 51 | ✗ | Happy Customer | Product badges | Product badge; merchant-provided, verifiable wording | full-page HTML, page-level styling, external URL | png |
| 52 | ✓ | How to use v3 | Product information | How-to steps block with three editable steps | JavaScript, external URL | png |
| 53 | ✗ | Hurry up | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 54 | ✗ | Hurry up & items sold | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | mp4 |
| 55 | ✗ | Hurry up & items sold 2 | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | mp4 |
| 56 | ✓ | In Stock | Availability | Stock note in Note or Badge layout; selected-variant availability | markup/CSS | png |
| 57 | ✓ | Infinite scrolling information | Promotion and announcements | Product announcement: scrolling merchant-written message; product template only | full-page HTML, page-level styling | png |
| 58 | ✓ | Info section of your product v2 | Product information | Image story; merchant chooses imagery and copy | JavaScript, external URL | png |
| 59 | ✓ | Info Section with images v2 | Product information | Image story or Media tabs with merchant-selected imagery and copy | full-page HTML, page-level styling, external URL | png |
| 60 | ✓ | Info Tabs | Product information | Information tabs block with merchant-entered content | full-page HTML, page-level styling, JavaScript | png |
| 61 | ✗ | Instagram Viral | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 62 | ✗ | Items Sold | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 63 | ✗ | Klarna | Other utilities | Source shows a fixed “Pay in 4 parts with Klarna” claim, external logo, and link to Klarna. Payment methods can show an enabled Klarna logo but does not verify installment terms or shopper eligibility. Use Klarna's official On-site Messaging placement for product-specific financing copy. | full-page HTML, page-level styling, JavaScript, external URL | png |
| 64 | ✓ | Limited Stock | Availability | Stock note: opt-in low stock from actual selected-variant tracked inventory; no timer or invented count | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | png |
| 65 | ✓ | Limited stock 2 | Availability | Stock note: opt-in low stock from actual selected-variant tracked inventory; no fixed count | full-page HTML, page-level styling | png |
| 66 | ✓ | Limited Stock 3 | Availability | Stock note: opt-in low stock from actual selected-variant tracked inventory; no fixed count | full-page HTML, page-level styling, external URL | mp4 |
| 67 | ✗ | Loved by 10000 | Product badges | Product badge; merchant-provided, verifiable wording | markup/CSS | png |
| 68 | ✗ | Loved Product | Product badges | Product badge; merchant-provided, verifiable wording | full-page HTML, page-level styling, external URL | png |
| 69 | ✓ | Low Stock | Availability | Stock note: opt-in low stock from actual selected-variant tracked inventory; no fixed count | full-page HTML, page-level styling, external URL | mp4 |
| 70 | ✓ | Low Stock 2 | Availability | Stock note: opt-in low stock from actual selected-variant tracked inventory; no fixed count | markup/CSS | png |
| 71 | ✓ | Made in Usa | Trust and assurances | Trust strip; merchant verifies country-of-origin claim | full-page HTML, page-level styling, external URL | png |
| 72 | ✓ | Money Back | Trust and assurances | Guarantee card; merchant must provide the actual policy wording | markup/CSS | png |
| 73 | ✓ | Money Back & Limited Stock | Trust and assurances | Add Guarantee card and Stock note as separate blocks; merchant supplies real policy, and tracked selected-variant quantity appears below merchant-set threshold | full-page HTML, page-level styling, external URL | png |
| 74 | ✓ | Money Back 2 | Trust and assurances | Guarantee card; merchant enters actual policy terms | markup/CSS | png |
| 75 | ✓ | Money Back 3 | Trust and assurances | Guarantee card; merchant enters actual policy terms | markup/CSS | png |
| 76 | ✓ | Money back 4 | Trust and assurances | Guarantee card; merchant enters actual policy terms | full-page HTML, page-level styling, external URL | png |
| 77 | ✓ | Mothers Day | Promotion and announcements | Promotion banner; merchant enters a real seasonal campaign | full-page HTML, page-level styling | png |
| 78 | ✓ | New Year | Promotion and announcements | Promotion banner; merchant enters a real seasonal campaign | full-page HTML, page-level styling | png |
| 79 | ✗ | One Million Happy Customers | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | external URL | png |
| 80 | ✓ | Order Arrive | Other utilities | Delivery estimate; merchant supplies honest arrival window | full-page HTML, page-level styling, external URL | png |
| 81 | ✓ | Payment Badge | Other utilities | Payment methods block using the store and market's enabled payment types | full-page HTML, page-level styling, external URL | png |
| 82 | ✓ | Populer Product | Product badges | Product badge; merchant verifies popularity claim | full-page HTML, page-level styling, JavaScript | png |
| 83 | ✓ | Product features | Product information | Product highlights or Feature grid with merchant-entered factual benefits | full-page HTML, page-level styling, external URL | png |
| 84 | ✓ | Product features 2 | Product information | Feature grid / Product highlights; merchant supplies factual benefits | full-page HTML, page-level styling, external URL | png |
| 85 | ✓ | Product features 3 | Product information | Feature grid / Product highlights; merchant supplies factual benefits | full-page HTML, page-level styling, external URL | png |
| 86 | ✗ | Reviews Slider v3 | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | png |
| 87 | ✓ | Risk Free | Trust and assurances | Guarantee card; merchant enters actual risk-free policy | markup/CSS | png |
| 88 | ✓ | Risk Free 2 | Trust and assurances | Guarantee card; merchant enters actual risk-free policy | full-page HTML, page-level styling | jpg |
| 89 | ✓ | Scroll to top button | Other utilities | Scroll to top store-wide app embed; merchant enables and saves it in the theme editor | JavaScript | png |
| 90 | ✗ | Scrolling Reviews | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | mp4 |
| 91 | ✗ | Special Code (Spacing) | Other utilities | Delivery / Payment methods / optional utility; financing needs merchant eligibility | full-page HTML, page-level styling | mp4 |
| 92 | ✓ | Special Sale Orange | Promotion and announcements | Promotion banner; custom colors and actual offer copy | full-page HTML, page-level styling, external URL | png |
| 93 | ✓ | Summer Sale | Promotion and announcements | Promotion banner; merchant enters a real summer campaign | markup/CSS | png |
| 94 | ✓ | Super Deals | Promotion and announcements | Promotion banner with merchant-set campaign end time; expires without resetting for each shopper | full-page HTML, page-level styling, JavaScript, external URL, timed/random behavior | png |
| 95 | ✓ | Tabs with images | Product information | Media tabs block with merchant-selected images and captions | full-page HTML, page-level styling, JavaScript, external URL | png |
| 96 | ✓ | Tiktok videos | Comparison and imagery | Product image & video gallery: Portrait videos mode with four merchant-selected Shopify-hosted clips; no TikTok account integration | full-page HTML, page-level styling, JavaScript, external URL | png |
| 97 | ✗ | TikTok Views | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling | png |
| 98 | ✗ | TikTok Viral | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 99 | ✓ | Top Selling | Product badges | Product badge; merchant verifies a top-selling claim | full-page HTML, page-level styling, external URL | png |
| 100 | ✗ | Trustpilot | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 101 | ✗ | Trustpilot Comment | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 102 | ✗ | Unlocked Free Shipping | Trust and assurances | Trust strip / Delivery estimate; merchant confirms policy and shipping terms | markup/CSS | png |
| 103 | ✓ | Us vs Them | Comparison and imagery | Comparison table; merchant supplies factual comparisons | JavaScript, external URL | png |
| 104 | ✓ | Valentines Day | Promotion and announcements | Promotion banner; merchant enters a real seasonal campaign | full-page HTML, page-level styling, external URL | png |
| 105 | ✗ | Verified Purchases | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling, external URL | png |
| 106 | ✗ | Viral Facebook | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | external URL | png |
| 107 | ✗ | Whole Sale | Discount codes and offers | Coupon/offer block; discount must exist in Shopify | full-page HTML, page-level styling, external URL | png |
| 108 | ✗ | ÿnstagram Views | Reviews and social proof | Requires verified reviews or real activity data; no invented counts or testimonials | full-page HTML, page-level styling | png |

The implementation plan and current block coverage are in [prompt-library-audit.md](prompt-library-audit.md).

## Six blocks and fourteen reusable designs added 7 October 2026

This batch added six functional blocks and fourteen alternate designs inside seven existing widget cards. The app selector previews a design; Shopify's deep link opens the underlying block, and the merchant must select the same Design or Style in the theme editor before saving. These ✓ marks refer to implemented options, not separate duplicate cards, pixel-identical source copies, or a live release.

| Added? | Block or design option | Theme block | Editor step |
| :---: | --- | --- | --- |
| ✓ | Specification list | `specification-list` | Enter factual labels and values |
| ✓ | Care instructions | `care-instructions` | Enter product care text |
| ✓ | Feature grid | `feature-grid` | Enter three factual benefits |
| ✓ | Brand note | `brand-note` | Enter original brand copy |
| ✓ | Offer callout | `offer-callout` | Enter verified offer terms |
| ✓ | Product checklist | `product-checklist` | Enter three factual points |
| ✓ | Outlined trust strip | `trust-strip` | Design: Outline |
| ✓ | Dark trust strip | `trust-strip` | Design: Dark |
| ✓ | Cream promotion | `promo-banner` | Design: Cream |
| ✓ | Outlined promotion | `promo-banner` | Design: Outline |
| ✓ | Outlined badge | `product-badge` | Design: Outline |
| ✓ | Dark badge | `product-badge` | Design: Dark |
| ✓ | Cream announcement | `announcement-bar` | Style: Cream |
| ✓ | Outlined announcement | `announcement-bar` | Style: Outline |
| ✓ | Outlined highlights | `product-highlights` | Design: Outline |
| ✓ | Warm highlights | `product-highlights` | Design: Warm |
| ✓ | Outlined guarantee | `guarantee-card` | Add actual policy; Design: Outline |
| ✓ | Warm guarantee | `guarantee-card` | Add actual policy; Design: Warm |
| ✓ | Outlined shipping details | `shipping-details` | Add actual terms; Design: Outline |
| ✓ | Warm shipping details | `shipping-details` | Add actual terms; Design: Warm |

## Updates added 8 October 2026

| Choice | Theme block | Merchant setup |
| --- | --- | --- |
| Stock note Badge layout | `stock-note` | Choose Display: Badge, enable actual low stock, and set the threshold. Note is still the default layout. |
| Guarantee and limited stock, as separate blocks | `guarantee-card` and `stock-note` | Add both to the product template. Enter the store's real guarantee; Stock note uses the selected Shopify-tracked variant's quantity. No combined block is offered. |
| Floating WhatsApp icon | `scroll-to-top` app embed | Enable WhatsApp, enter the store's international number and optional prefilled message, then save the theme. Scroll to top and WhatsApp are separate controls within the same embed. This is a new catalog choice, not a Launchgify source folder or an additional theme block type. |

## Remaining work, sorted by what it needs

The entries below remain ✗ until their specific behavior is implemented and verified. A visual match alone does not establish a real discount, review, live sale, financing offer, or inventory claim. A store-wide announcement still needs its own implementation. Black Friday is a distinct library card backed by Promotion banner. Product image & video gallery is one card with a Gallery type choice. Merchants select the same design or gallery type in the theme editor.

### Real reviews or live social activity (24)

**2** 15 people have, **3** 2000+ people voted, **28** Customer  Review, **29** Customer Live Sale, **30** Customer Review 2, **38** Facebook Views, **39** Facebook Viral, **40** Fake FB Comment, **48** Google Reviews, **53** Hurry up, **54** Hurry up & items sold, **55** Hurry up & items sold 2, **61** Instagram Viral, **62** Items Sold, **79** One Million Happy Customers, **86** Reviews Slider v3, **90** Scrolling Reviews, **97** TikTok Views, **98** TikTok Viral, **100** Trustpilot, **101** Trustpilot Comment, **105** Verified Purchases, **106** Viral Facebook, **108** ÿnstagram Views.

### Trust claims and assurances (1)

**102** Unlocked Free Shipping.

### Actual discounts and offers (5)

**14** Buy 3 Pay 2, **16** Click Discount, **26** Countdown time + dicount code auto message + Text with image, **45** Free gift checkout, **107** Whole Sale.

### Badges and product metadata (3)

**51** Happy Customer, **67** Loved by 10000, **68** Loved Product.

### Other utilities (2)

**63** Klarna financing message, **91** Special Code (Spacing).

**Next implementation priorities:** real Shopify discount application and store-wide announcements. Review sliders and social activity need a trusted review/activity source. Financing and wholesale examples need their actual provider or pricing integration.
