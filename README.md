# Block Builder

An embedded Shopify app for adding polished product-page blocks to Online Store 2.0 themes such as Dawn. Merchants browse the library in the app, choose **Add to theme**, place the block in the product template, customize its text, preview, and save. Blocks are delivered through a Shopify theme app extension; the app does not edit theme files.

The first release includes Trust strip, Delivery estimate, Product highlights, Promotion banner, and Stock note. The stock note reads the selected product variant's availability rather than inventing scarcity. The delivery block uses merchant-configured wording and labels the date as an estimate.

## Setup

Node 22.12+ is required. Install dependencies with `npm install`. This repository is currently **not linked to a Partner app**. Create the new app in the Shopify Dev Dashboard, then run `npm run config:link` and select it. The intended production origin is `https://blockbuilder.task19.com`; set the App URL to that origin, keep embedded mode on, and use `https://blockbuilder.task19.com/auth/callback` if a redirect URL is requested. Review the linked `shopify.app.toml` before deploying its configuration. Set `SHOPIFY_APP_URL=https://blockbuilder.task19.com` on the production host. Use a development store to install the app and test every block in Dawn's product template.

The project uses Shopify's official React Router app template for embedded authentication and webhooks. It requires a persistent database for production session storage; the scaffold's SQLite configuration is suitable only for local development. Configure a production database and deployment URL before publishing.

## Validation

Run `npm run typecheck`, `npm run lint`, and `npm run build`. After linking to an app, run `npm run dev` to preview the theme extension and test the editor links. Publish only after checking each block on desktop and mobile and completing Shopify's app privacy requirements.
