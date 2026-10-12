# SectionKit — product and implementation details

_Last updated: 8 October 2026. The local library has 32 cards backed by 30 Shopify theme block types. Guarantee card and Stock note are separate blocks; the floating WhatsApp icon shares the utility app embed. The merged gallery, Black Friday, and WhatsApp choices still need build and live theme testing._

## Goal and merchant journey

Block Builder helps merchants using Dawn or another Online Store 2.0 theme improve a product page with reusable, polished components. Merchants browse blocks inside the embedded Shopify app, choose **Install in theme**, place the block in Shopify's product-template editor, edit settings, preview desktop and mobile, and save. Blocks can later be reordered or removed in the editor. The app does not paste or modify Liquid in the merchant's theme. The earlier idea of handing merchants copyable prompts/code is not part of this implementation. The supplied `Launchgify-Prompts` collection is a local design reference; see [prompt-library-inventory.md](prompt-library-inventory.md) for every example and [prompt-library-audit.md](prompt-library-audit.md) for integration decisions.

The public root page is a product overview and store-login entry point. The embedded `/app` area is the authenticated block library; `/app/additional` is its installation guide. The library has category filters, illustrative previews, descriptions, and theme-editor deep links. The previews are examples, not pixel-exact renderings of each merchant's theme.

## Stack and key files

- Official Shopify React Router template, React/TypeScript, App Bridge, Polaris web components, and Shopify-managed installation.
- `app/shopify.server.ts`: Shopify authentication and API version (`2026-10`).
- `app/routes/_index/route.tsx`: public landing page, with metadata for search engines.
- `app/routes/app._index.tsx`: 31-card catalog with in-card previews and theme-editor links. One gallery card previews images and portrait videos; Black Friday shares the Promotion banner block type.
- `app/routes/app.additional.tsx`: merchant installation guide.
- `extensions/block-builder-theme/blocks/*.liquid`: theme app blocks. Each is available on product templates.
- `extensions/block-builder-theme/assets/`: shared CSS and stock-variant behavior.
- `extensions/block-builder-theme/locales/`: default English locale files required by the extension build.
- `app/routes/webhooks.compliance.tsx`: HMAC-verified mandatory App Store privacy webhooks.
- `app/routes/webhooks.app.uninstalled.tsx`: idempotent shop session deletion.
- `prisma/schema.prisma`: SQLite session storage, configured by `DATABASE_URL`.
- `shopify.app.toml`: linked client ID, app URL, empty scopes, redirect URL, webhook subscriptions, embedded setting.

The previous Laravel starter was replaced. A temporary archive was written to `/private/tmp/block-builder-laravel-backup.tar.gz` during the scaffold transition; it is not a durable project backup.

## Implemented block catalog

| Block | What it does | Limits and merchant responsibility |
| --- | --- | --- |
| Trust strip | Three editable reassurance messages | Merchants must make only claims their store can honor. |
| Delivery estimate | Merchant-set delivery heading and message | Clearly labels the date as an estimate; no carrier/rate calculation. |
| Product highlights | Three editable benefits | Does not read product metafields yet. |
| Promotion banner / Black Friday | Editable offer headline, text, link, and optional real campaign end time | Black Friday uses a bold design and seconds countdown. The promotion hides after its end time; it does not create a Shopify discount. |
| Stock note | Reads actual variant availability and updates when variant selection changes in supported product forms; merchant chooses Note or Badge display and a low-stock threshold | No invented countdown or quantity claim; test each target theme's variant selector. |
| Payment methods | Renders SVG logos for `shop.enabled_payment_types` | Reflects enabled methods for the current market; does not process payments. |
| Product badge | Editable short label | Default is neutral; merchant should avoid untrue badges. |
| Product FAQ | Three editable questions and answers in native `<details>` elements | Answers are merchant-owned content. |
| Image story | Merchant-chosen image and short text | Image is resized through Shopify CDN filters. |
| Comparison table | Merchant-entered side-by-side rows | Renders only configured rows; claims must be factual. |
| Before & after | Compares two merchant-selected images with a slider | Both images are required; the merchant must use genuine photos. |
| Information tabs | Organizes up to three product details | Keyboard arrow, Home, and End navigation supported. |
| Discount code | Shows a merchant-entered copyable code | The code must already exist and work in Shopify Discounts. |
| Scroll to top | Floating button across the storefront | Store-wide app embed; merchant activates it in the theme editor. |
| Product announcement | Editable message, scrolling text, or responsive copyable coupon code | Product template only; not a site-wide header bar. Coupon codes must already exist in Shopify Discounts. The ticker respects reduced-motion preferences. |
| Collection circles | Links up to three merchant-selected collections | Uses Shopify collection picker and collection imagery. |
| Product image & video gallery | Horizontally scrollable merchant-selected images or up to four portrait videos | The gallery type is selected in the theme editor. Videos are selected from Shopify files and do not sync from TikTok. |
| Media tabs | Up to three image/video tabs or a previous/next slider | Merchant chooses the media. Tabs support keyboard navigation; the slider has labeled controls. |
| How-to steps | Three editable usage steps | Merchants supply accurate instructions. |
| Guarantee card | Displays a merchant-authored guarantee and links to the store refund policy by default; a custom link can override it | Hidden until the merchant supplies policy text. If the store has no refund policy, no automatic link appears. |
| Shipping details | Displays merchant-authored shipping terms and links to the store shipping policy by default; a custom link can override it | Hidden until the merchant supplies terms; no rate calculation. If the store has no shipping policy, no automatic link appears. Standard, Outline, and Warm designs support optional background, text, border, accent, and link color overrides in the theme editor. |
| Size guide | Expandable size and measurement table | Hidden until measurements are entered. |
| Product video | Shopify-hosted video with controls | Hidden until a video is selected; no autoplay. |
| Gradient heading | Editable heading with two theme-editor colors | Decorative text only. |
| Specification list | Three label/value pairs | Values must describe the product accurately. |
| Care instructions | Merchant-authored care guidance | Hidden until text is entered. |
| Feature grid | Three benefit cards | Hidden until merchant supplies all three factual details. |
| Brand note | Merchant-authored editorial copy | Hidden until text is entered; does not imply a customer review. |
| Offer callout | Merchant-authored offer terms and optional link | Hidden until text is entered; does not create a discount. |
| Product checklist | Three concise points | Hidden until merchant supplies all three factual points. |

Eight widget cards provide a design selector in the embedded app, covering fifteen alternate styles across trust strip, promotion banner, product badge, product announcement, highlights, guarantee, shipping, and the image/video gallery. Media tabs now have a theme-editor choice between tabs and a slider; Product announcement has Standard, Scrolling message, and Responsive coupon layouts. Changing this selector previews the design in the app; it does not alter the storefront. Shopify deep links do not prefill block settings, so the merchant must choose the same Design or Style in the theme editor and save. Installed status applies to the 30 underlying block types. The Black Friday card always offers Add in theme because an active Promotion banner does not reveal which design the merchant chose. All thirty Shopify block types have optional background, text, border, and accent color settings in Shopify’s theme editor. Shipping details also retains a separate link color setting. Blank color settings preserve each widget’s built-in design; merchants should check text contrast after customizing. All widgets load through one theme app extension, with separate Liquid files and shared responsive CSS. Product app blocks are limited to product templates to avoid placement in unrelated pages. Interactive widgets load small JavaScript assets. Scroll to top is a store-wide app embed. The **Install in theme** link uses Shopify's `addAppBlockId={client_id}/{block_handle}` format for product blocks or `activateAppId` for the app embed and opens the current theme's product editor in a new tab. The merchant must save the editor. Shopify may fall back to a different app-block area if the selected theme section does not support app blocks.

## Credentials and local development

The local `shopify.app.toml` is linked to the Block Builder app. It uses `https://blockbuilder.task19.com` as the intended production App URL, remains embedded, and allows `https://blockbuilder.task19.com/auth/callback`. The legacy install flow is off. The application does not require Admin API scopes for these thirty block types. The client secret belongs only in an ignored `.env` or host secret manager, never in committed files.

Install Node.js 22.12+ and run:

```bash
npm ci
npm run setup
npm run typecheck
npm run lint
npm run build
npm run shopify -- app build
npm run shopify -- app config validate --json
npm run dev
```

`.env.example` lists `SHOPIFY_APP_URL`, `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, and `DATABASE_URL`. The server loads `.env` if present; host-provided environment variables take precedence. `npm run setup` generates Prisma Client and applies session migrations. `npm run dev` uses Shopify CLI and may use a temporary development tunnel URL. The public landing page can be smoke-tested from a direct local server after a build.

On 12 October 2026, TypeScript, the production build, targeted ESLint, and Shopify extension build passed locally. Smart delivery date calculations also passed focused cutoff, weekend, holiday, and invalid-timezone checks. Live theme and plan-transition testing still require a Shopify development store.

## Privacy and data

The app stores shop sessions and Shopify credentials in Prisma, but it does not request customer/order scopes or store customer records. Shopify's mandatory `customers/data_request` and `customers/redact` webhooks are HMAC-verified and acknowledged because there is no customer data to export or erase. `shop/redact` and `app/uninstalled` remove the shop's session records. A public App Store launch still needs a privacy policy, support contact, and live webhook delivery tests.

## Deployment and release sequence

### Shopify App Pricing rollout (in progress)

The local pricing implementation uses Shopify App Pricing's Partner API `activeSubscription`, not a URL parameter or the Admin Billing API, to determine Free, Starter, or Pro. Configure public plan handles `free`, `starter`, and `pro` in Shopify, with the approved $0, $4.99/month, and $9.99/month prices and 7-day paid trials. Free merchants may choose any three underlying block types; repeated placements and design presets of one type count once. Starter and Pro can use the entire current library. Starter and Pro unlock custom theme-editor colors. Pro additionally unlocks calculated delivery dates (cutoff, weekends, holidays, per-country ranges) and display targeting by product, collection, tag, country, and language. Translation of merchant-authored text still requires Shopify's translation workflow. Analytics, A/B testing, and custom CSS are not implemented or advertised as entitlements.

Create a Partner API client with **Manage apps** permission. Set `SHOPIFY_PARTNER_ORG_ID`, `SHOPIFY_PARTNER_APP_ID`, `SHOPIFY_PARTNER_API_TOKEN`, and `SHOPIFY_APP_HANDLE` in the server environment; do not commit the token. Verify the actual Shopify plan handles against the defaults and set the optional handle variables in `.env.example` if needed. The app redirects shops without an active pricing subscription to Shopify's hosted plan page. The app must be public for the Active Subscription API.

The theme extension now uses `available_if` app-data metafields for all 30 unique block handles. An unset flag hides its block in the theme editor **and on the storefront**. Therefore do not release this extension version to existing installations until their access metafields have been initialized from verified subscriptions. `SECTIONKIT_PRICING_ENABLED` defaults to false in server code, so the embedded library keeps working while the rollout is prepared. Reopening the embedded Block library initializes one store only after the flag is enabled. `npm run pricing:backfill` audits installed shops without writing; `npm run pricing:backfill -- --apply` syncs access. A Free shop with no saved choices must be audited against its installed theme blocks before release; the script cannot inspect theme files with the app's empty Admin scopes. Deploy the server code and Partner credentials, audit/backfill every store, then release the theme extension and enable the pricing flag. After release, schedule `npm run pricing:backfill -- --sync` every 15 minutes to refresh access for plan changes that happen outside an app redirect (including cancellation). Shopify App Pricing does not send subscription-change webhooks. Test Free choice changes, all three plans, upgrades, downgrades, cancellation, reinstall, app embed visibility, smart delivery in multiple time zones and markets, targeting, and the exact Shopify-hosted pricing URL on a development store before a public release. A failed Partner API check must never be interpreted as a Free plan.

1. Update the droplet from the intended reviewed code revision, build the Node app, and restart its service. This updates the embedded block library and previews.
2. Release a new Shopify app version containing the updated theme extension. Updating the droplet alone does not make new Liquid blocks available in the theme editor.
3. Install each new block in a development store, test it in Dawn on desktop and mobile, then test another compatible Online Store 2.0 theme before wider use.
4. Verify app onboarding, webhooks, backups, and rollback steps separately before public release.

## Live validation still required

- Confirm the app listing, support/privacy pages, Shopify App Pricing configuration, Partner API access, and rollout backfill before release.
- Test first install, reopening, session expiry, uninstall/reinstall, and redirect behavior in Shopify Admin.
- Test all twenty-nine product blocks and the app embed in Dawn and at least one other Online Store 2.0 theme, including editors where app blocks cannot be placed in the main product section.
- Test stock note switching among available and unavailable variants, plus its initial state and section reloads in the editor.
- Test payment logos against a store with different enabled methods/markets, and image loading with and without a selected image.
- Check keyboard behavior, contrast, responsive layout, and honest customer-facing copy.
- Send test privacy/uninstall webhooks, inspect delivery, and verify session deletion where applicable.
- Set up backups, logs, restart policy, and a deployment rollback before inviting merchants.

## Later ideas, not yet implemented

Product bundles or frequently-bought-together blocks would need real product selection, cart and discount behavior, and dedicated testing. Other possibilities are review integrations, merchant presets, richer product-data bindings, search/favorites, and more visual styles. Avoid urgency or scarcity indicators unless backed by genuine Shopify data.

## References

- [Shopify app scaffolding](https://shopify.dev/docs/apps/build/scaffold-app)
- [Theme app extensions and deep links](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration)
- [Privacy webhook requirements](https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance)
- [React Router deployment](https://shopify.dev/docs/apps/launch/deployment/deploy-to-hosting-service)
