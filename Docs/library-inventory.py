"""Rebuild the per-example inventory for the supplied local reference pack."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1] / "Launchgify-Prompts" / "All 107+ Codes"
OUT = Path(__file__).with_name("prompt-library-inventory.md")

GROUPS = {
    "Trust and assurances": "14 days moneyback|Delivery Time & Guarantee|Fast shipping & 7.24 support|Free Shipping|Free Shipping 2|Free delivery CTA v2|Made in Usa|Money Back|Money Back & Limited Stock|Money Back 2|Money Back 3|Money back 4|Risk Free|Risk Free 2|Unlocked Free Shipping",
    "Availability": "8 item left & limited stock|8 items left|In Stock|Limited Stock|Limited Stock 3|Limited stock 2|Low Stock|Low Stock 2",
    "Product badges": "Best Seller|Happy Customer|Loved Product|Loved by 10000|Populer Product|Top Selling",
    "Product information": "3 info sliders with images|Clickable tabs with video or image|FAQ|How to use v3|Info Section with images v2|Info Tabs|Info section of your product v2|Product features|Product features 2|Product features 3|Tabs with images",
    "Comparison and imagery": "Before and after image slider|Collection circles|Comparison Table 2|Comparison table|Us vs Them|Tiktok videos",
    "Promotion and announcements": "Announcement Bar|Announcement Bar 2 Mobil|Announcement Bar 2 Web|Black Friday|Christmas Day|Easter Sale|Extra 20|Fathers Day|Gradient Text|Hallowen|Infinite scrolling information|Mothers Day|New Year|Special Sale Orange|Summer Sale|Super Deals|Valentines Day",
    "Discount codes and offers": "Buy 3 Pay 2|Click Discount|Copy this discount code|Copyable discount bar|Copyable discount bar 2|Copyable discount bar 3|Copyable discount bar 4|Countdown time + dicount code auto message + Text with image|Coupon code|Free gift checkout|Whole Sale",
    "Reviews and social proof": "15 people have|2000+ people voted|Customer  Review|Customer Live Sale|Customer Review 2|Customer Review Star|Customer Review Star 2|Customer Review Star 3|Customer Review star 4|Facebook Views|Facebook Viral|Fake FB Comment|Google Reviews|Hurry up|Hurry up & items sold|Hurry up & items sold 2|Instagram Viral|Items Sold|One Million Happy Customers|Reviews Slider v3|Scrolling Reviews|TikTok Views|TikTok Viral|Trustpilot|Trustpilot Comment|Verified Purchases|Viral Facebook|ÿnstagram Views",
    "Other utilities": "Animated countdown|Klarna|Order Arrive|Payment Badge|Scroll to top button|Special Code (Spacing)",
}

DESTINATION = {
    "Trust and assurances": "Trust strip / Delivery estimate; merchant confirms policy and shipping terms",
    "Availability": "Stock note; actual selected-variant inventory only",
    "Product badges": "Product badge; merchant-provided, verifiable wording",
    "Product information": "Highlights / FAQ / Image story / Information tabs; media tabs are a future enhancement",
    "Comparison and imagery": "Comparison table / Before & after / Image story; collection/video gallery needs its own block",
    "Promotion and announcements": "Promotion banner; site-wide announcement requires an app embed",
    "Discount codes and offers": "Coupon/offer block; discount must exist in Shopify",
    "Reviews and social proof": "Requires verified reviews or real activity data; no invented counts or testimonials",
    "Other utilities": "Delivery / Payment methods / optional utility; financing needs merchant eligibility",
}

lookup = {}
for group, names in GROUPS.items():
    for name in names.split("|"):
        assert name not in lookup, name
        lookup[name] = group

folders = sorted((p for p in ROOT.iterdir() if p.is_dir()), key=lambda p: p.name.casefold())
missing = set(lookup) - {p.name for p in folders}
unmapped = {p.name for p in folders} - set(lookup)
assert not missing and not unmapped, (missing, unmapped)

rows = []
for folder in folders:
    files = list(folder.iterdir())
    text = "\n".join(p.read_text(errors="replace") for p in files if p.suffix.lower() == ".txt")
    low = text.lower()
    flags = []
    if re.search(r"<!doctype|<html\b", low): flags.append("full-page HTML")
    if re.search(r"(?:\bbody\s*\{|<body\b)", low): flags.append("page-level styling")
    if re.search(r"<script\b|on(?:click|load|change)\s*=", low): flags.append("JavaScript")
    if re.search(r"https?://", low): flags.append("external URL")
    if re.search(r"math\.random|setinterval", low): flags.append("timed/random behavior")
    if not flags: flags.append("markup/CSS")
    group = lookup[folder.name]
    media_types = {p.suffix.lower().lstrip(".") for p in files if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".mp4"}}
    media = ", ".join(sorted(media_types)) or "—"
    safe_name = folder.name.replace("|", "\\|")
    rows.append(f"| {safe_name} | {group} | {DESTINATION[group]} | {', '.join(flags)} | {media} |")

OUT.write_text(
    "# Full Launchgify reference inventory\n\n"
    "This indexes **all 108 named folders** in the supplied local pack. The inspection reads every text snippet and records source characteristics; it does not certify third-party code or media for redistribution. Each row maps the idea to a Shopify-native destination. Similar designs are grouped into editable presets instead of copied as separate full-page snippets.\n\n"
    "The source pack is a local reference, excluded from Git. Its license is not documented. Never present fixed/random social proof, discount, stock, shipping, or financing claims as live store facts.\n\n"
    "| Reference folder | Concept group | Shopify-native destination | Source flags | Supplied media |\n"
    "| --- | --- | --- | --- | --- |\n" + "\n".join(rows) + "\n\n"
    "The implementation plan and current block coverage are in [prompt-library-audit.md](prompt-library-audit.md).\n"
)
print(f"Wrote {len(rows)} rows to {OUT}")
