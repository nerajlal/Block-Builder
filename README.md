# Block Builder

Block Builder is an embedded Shopify app with a public landing page and a library of thirteen product-page blocks plus one store-wide app embed. Merchants choose a widget, click **Install in theme**, customize it in Shopify's theme editor, and save the theme. The app uses a theme app extension and does not edit theme source files.

The current blocks are Trust strip, Delivery estimate, Product highlights, Promotion banner, Stock note, Payment methods, Product badge, Product FAQ, Image story, Comparison table, Before & after, Information tabs, and Discount code. Scroll to top is a store-wide app embed. Payment logos come from the store's enabled payment types. The stock note reads real variant availability; the offer banner is presentation only and does not create discounts or change checkout prices.

## Local setup

Node.js 22.12+ is required. The app is linked to the Block Builder Shopify app. Keep credentials in your ignored `.env` file or environment variables; `.env.example` lists the required names without secrets.

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

`npm run dev` uses Shopify CLI to start a tunnel and preview the extension on a development store. `npm run start` serves a built app directly, provided its environment variables and session database are configured. The production origin is `https://blockbuilder.task19.com`.

## Before deployment

The public domain currently awaits its new droplet and certificate. Host the web app there with Node.js 22+, run `npm ci`, `npm run setup`, and `npm run build`, and run the server with `npm run start` behind HTTPS. Set `SHOPIFY_APP_URL`, `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `DATABASE_URL`, and `NODE_ENV=production`. For a single droplet, `DATABASE_URL` can point to an SQLite file on a persistent, backed-up path. Keep that directory writable by the app process. `shopify app deploy` publishes Shopify configuration and extension code; it does not host this web server.

The app has not been installed and exercised on a development store yet. Before release, verify the thirteen product blocks and one app embed in Dawn, theme-editor links, variant changes, installation/reinstallation, privacy webhooks, and mobile layouts. See [Docs/details.md](Docs/details.md) for the full product and release checklist.

The local `Launchgify-Prompts` archive is a design reference and is excluded from Git and app deployment. See [Docs/prompt-library-inventory.md](Docs/prompt-library-inventory.md) for all 108 examples, [Docs/prompt-library-audit.md](Docs/prompt-library-audit.md) for integration decisions, and [Docs/library-completion-plan.md](Docs/library-completion-plan.md) for the features still to build.
