import "dotenv/config";
import prisma from "../app/db.server";
import { unauthenticated } from "../app/shopify.server";
import { inspectPlanAccess, readPlanAccess } from "../app/plan-access.server";

// Dry-run by default. This must finish for every installed shop before the
// available_if theme extension version is released.
const continuous = process.argv.includes("--sync");
const apply = continuous || process.argv.includes("--apply");
const shops = await prisma.session.findMany({
  where: { isOnline: false },
  distinct: ["shop"],
  select: { shop: true },
});

let unresolved = 0;
for (const { shop } of shops) {
  try {
    const { admin } = await unauthenticated.admin(shop);
    const { plan, selected } = await inspectPlanAccess(admin, true);
    if (!plan) {
      console.error(`${shop}: no active Shopify App Pricing plan`);
      if (apply) await readPlanAccess(admin, true);
      if (!continuous) unresolved += 1;
      continue;
    }
    if (plan === "free" && selected.length === 0) {
      console.error(`${shop}: Free plan has no chosen block types; confirm this store uses no existing blocks before release`);
      if (!continuous) {
        unresolved += 1;
        continue;
      }
    }
    if (apply) await readPlanAccess(admin, true);
    console.log(`${shop}: ${plan}, ${selected.length} Free choices${apply ? ", access synced" : ", ready"}`);
  } catch (error) {
    console.error(`${shop}: ${error instanceof Error ? error.message : "unknown error"}`);
    unresolved += 1;
  }
}

await prisma.$disconnect();
if (unresolved > 0) {
  console.error(`${unresolved} shop(s) unresolved. Do not release the gated theme extension.`);
  process.exitCode = 1;
} else {
  console.log(`${shops.length} shop(s) ${apply ? "synchronized" : "ready for synchronization"}.`);
}
