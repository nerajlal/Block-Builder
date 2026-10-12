(function () {
  function zonedNow(timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date());
    const part = (name) => Number(parts.find((item) => item.type === name)?.value);
    return { date: new Date(Date.UTC(part("year"), part("month") - 1, part("day"))), hour: part("hour") };
  }

  function addDays(start, count, weekdaysOnly, holidays) {
    const date = new Date(start);
    let remaining = count;
    while (remaining > 0) {
      date.setUTCDate(date.getUTCDate() + 1);
      const iso = date.toISOString().slice(0, 10);
      if ((!weekdaysOnly || (date.getUTCDay() !== 0 && date.getUTCDay() !== 6)) && !holidays.has(iso)) {
        remaining -= 1;
      }
    }
    return date;
  }

  function dayRange(element) {
    const minimum = Number(element.dataset.bbMinDays);
    const maximum = Number(element.dataset.bbMaxDays);
    if (!Number.isInteger(minimum) || !Number.isInteger(maximum) || minimum < 1 || maximum < minimum) return null;
    const country = element.dataset.bbCountry?.toUpperCase();
    const rules = (element.dataset.bbCountryRules || "").split(/\r?\n/);
    for (const rule of rules) {
      const match = rule.trim().match(/^([A-Za-z]{2})\s*=\s*(\d{1,2})\s*-\s*(\d{1,2})$/);
      if (match && match[1].toUpperCase() === country) {
        const first = Number(match[2]);
        const last = Number(match[3]);
        return first >= 1 && last >= first && last <= 60 ? [first, last] : null;
      }
    }
    return [minimum, maximum];
  }

  function update(element) {
    const message = element.querySelector("[data-bb-delivery-message]");
    if (!message) return;
    try {
      const range = dayRange(element);
      if (!range) return;
      const { date, hour } = zonedNow(element.dataset.bbTimezone || "UTC");
      const holidays = new Set((element.dataset.bbHolidays || "").split(/[\s,]+/).filter((item) => /^\d{4}-\d{2}-\d{2}$/.test(item)));
      const weekdaysOnly = element.dataset.bbWeekdaysOnly === "true";
      const cutoff = Number(element.dataset.bbCutoffHour);
      const extraDay = Number.isInteger(cutoff) && hour >= cutoff ? 1 : 0;
      const start = addDays(date, range[0] + extraDay, weekdaysOnly, holidays);
      const end = addDays(date, range[1] + extraDay, weekdaysOnly, holidays);
      const locale = document.documentElement.lang || "en";
      const formatter = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", timeZone: "UTC" });
      const prefix = element.dataset.bbPrefix || "Estimated delivery:";
      message.textContent = `${prefix} ${formatter.format(start)}–${formatter.format(end)}`;
    } catch {
      // Keep the merchant's fixed estimate if a timezone or rule is invalid.
    }
  }

  function refresh(root) {
    root.querySelectorAll("[data-bb-smart-delivery]").forEach(update);
  }

  refresh(document);
  document.addEventListener("shopify:section:load", (event) => refresh(event.target));
})();
