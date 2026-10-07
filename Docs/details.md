# Block Builder — project details

_Last updated: 7 October 2026. This document describes the local codebase, not a published Shopify app._

## Product goal

Block Builder helps merchants using Dawn or another Online Store 2.0 theme make product pages feel more polished without buying a premium theme. A merchant installs the app, browses a library of product-page components, opens the theme editor for a chosen component, adjusts its settings, previews it, and saves the theme. The initial product is intentionally small: reusable, merchant-controlled blocks that can be added or removed without changing theme source files.

The original idea included a website where merchants copied prompts or Liquid snippets into a theme. The chosen app architecture uses **Shopify theme app extensions** for installation. This is easier to manage and remove, and keeps the merchant in Shopify's theme editor. A copyable-code library is a possible later feature, but it is not implemented now. We should not describe the current app as automatically redesigning a whole store or installing code into theme files.

## Current implementation

The project lives at `/Users/mac/Projects/Task19 Apps/block-builder`. It uses Shopify's official React Router app template, React/TypeScript, App Bridge, Polaris web components, Prisma session storage, and a theme app extension. The earlier Laravel starter was replaced; an archive of that starter was saved to `/private/tmp/block-builder-laravel-backup.tar.gz` during the scaffold change. That temporary archive is not part of the product or a durable backup.

The embedded app authenticates through the template's Shopify integration in `app/shopify.server.ts`. The block library is in `app/routes/app._index.tsx`; the installation guide is in `app/routes/app.additional.tsx`. `app/routes/app.tsx` provides the embedded app shell and navigation. The theme extension lives in `extensions/block-builder-theme`, with one Liquid file per block and shared styles in `assets/block-builder.css`. The extension blocks target theme sections and expose text settings in Shopify's theme editor. The app has no product-write scope in `shopify.app.toml` because this first release does not modify products.

The library currently has five blocks:

| Block | Merchant value | Current behavior |
| --- | --- | --- |
| Trust strip | Shows three short reassurance messages | Text is editable in the theme editor; claims are merchant-provided and should be truthful. |
| Delivery estimate | Shows a delivery message | The message is merchant-configured and explicitly says delivery times are estimates. It does not calculate dates or use shipping rates. |
| Product highlights | Shows three concise product benefits | Text is editable; it does not pull product metafields yet. |
| Promotion banner | Shows a headline and message | Display only; it does not create a discount or alter checkout prices. |
| Stock note | Shows availability | Reads the product's selected-or-first-available variant on Liquid page render. It does not promise a live, after-selection JavaScript update or display a fabricated stock count. |

The app library has category filters, short previews, descriptions, an **Add to theme** action, and an installation guide. The Add to theme action opens the current theme's product-template editor with Shopify's `addAppBlockId` deep link. The merchant still decides placement and must save the theme. If the active theme or section does not support app blocks, Shopify's editor may require a different section or template. The in-app previews are illustrative rather than an exact rendering of every theme's fonts and spacing.

## Merchant workflow

1. Install and open Block Builder in Shopify Admin.
2. Browse the library and choose a component.
3. Select **Add to theme**. The product-template theme editor opens in a new tab.
4. Place the app block in a suitable section, edit text, and preview desktop and mobile views.
5. Save the theme. Remove or rearrange blocks later in the editor.

There is no in-app billing, onboarding wizard, analytics dashboard, bundle engine, prompt generator, or automatic theme transformation in the current code. Those are possible roadmap items, not existing features.

## Local development and checks

Requires Node.js 22.12 or newer. From the project directory:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

These three code checks passed on 7 October 2026. The build may print React Router future-flag notices; those are framework notices, not failed checks. They do **not** prove that a block has been installed or rendered in a live Shopify theme.

The intended production domain is `https://blockbuilder.task19.com`. The Shopify App URL and production `SHOPIFY_APP_URL` environment variable must use that origin. Embedded mode is enabled, and `https://blockbuilder.task19.com/auth/callback` is configured as an allowed redirect URL. Keep the legacy install flow disabled. The code has not yet been linked to a Shopify Partner/Dev Dashboard app: `shopify.app.toml` still has `client_id = ""`. After creating the app in the correct organization, run `npm run config:link`, choose that app, confirm the resulting identity and URLs, then run `npm run dev`. Use a development store and a Dawn product template for the first end-to-end test. Do not insert an API key or secret into this document or commit environment secrets.

The scaffold uses SQLite in `prisma/schema.prisma` for local session storage. Before hosting publicly, choose a durable production database, configure the production app URL and credentials, apply migrations, and verify session persistence and webhook delivery. The Partner app, hosting, theme extension deployment, pricing, and App Store listing are not set up yet. No publication-readiness claim should be made from local build checks alone.

## Release validation still required

- Create and link the Shopify app, choose its distribution model, and review requested scopes and webhook/API versions.
- Install on a development store. Confirm first install, reopening, auth/session recovery, uninstall, and reinstall.
- Add, configure, reorder, save, and remove all five blocks in Dawn. Check product pages on desktop and mobile, including products with multiple variants and unavailable inventory.
- Confirm the theme-editor deep links open the intended product template and handle an unsupported theme gracefully.
- Check accessibility: keyboard use, contrast, readable text, and responsive layouts. Check that merchant-entered claims are not misleading.
- Set up production hosting, durable database, logs/monitoring, backups, privacy requirements, support contact, listing content, and a deployment process.
- Decide pricing and entitlements before building any paid plan flow; no prices or plan handles have been provided for this app.

## Roadmap ideas, not implemented

Potential follow-on components include richer product information blocks, payment/trust badges, product badges, offer cards, frequently-bought-together suggestions, bundle presentations, and more visual layouts. Each needs a clear data source and honest behavior. For example, a real bundle needs cart and pricing logic; an urgency indicator must reflect genuine inventory or offer timing. A future block marketplace could add search, favorites, saved presets, and theme-specific previews. Prioritize merchant demand and Shopify platform compatibility before expanding the library.

## Key files

- `app/routes/app._index.tsx` — catalog, previews, filters, theme-editor links.
- `app/routes/app.additional.tsx` — installation instructions.
- `app/routes/app.tsx` and `app/shopify.server.ts` — embedded shell and Shopify authentication.
- `extensions/block-builder-theme/blocks/*.liquid` — storefront blocks and editor settings.
- `extensions/block-builder-theme/assets/block-builder.css` — shared block presentation.
- `shopify.app.toml` — app identity placeholder, scopes, and webhooks.
- `prisma/schema.prisma` — current local session database schema.
- `README.md` — quick setup instructions.

## References

- [Shopify app scaffolding](https://shopify.dev/docs/apps/build/scaffold-app)
- [Theme app extensions](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions)
- [Theme extension configuration and app-block deep links](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration)
- [Shopify app authentication](https://shopify.dev/docs/apps/build/authentication-authorization)
