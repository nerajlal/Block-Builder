(() => {
  const dateWithZone = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})$/;
  const update = () => {
    document.querySelectorAll(".bb-promo[data-bb-promo-end]").forEach((banner) => {
      const endText = banner.dataset.bbPromoEnd;
      if (!endText) return;
      const end = dateWithZone.test(endText) ? Date.parse(endText) : NaN;
      const remaining = end - Date.now();
      const counter = banner.querySelector("[data-bb-promo-countdown]");
      if (!Number.isFinite(end) || remaining <= 0) {
        banner.hidden = true;
        return;
      }
      banner.hidden = false;
      if (!counter) return;
      const totalMinutes = Math.ceil(remaining / 60000);
      const days = Math.floor(totalMinutes / 1440);
      const hours = Math.floor((totalMinutes % 1440) / 60);
      const minutes = totalMinutes % 60;
      counter.textContent = `Ends in ${days}d ${hours}h ${minutes}m`;
      counter.hidden = false;
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", update, { once: true });
  else update();
  document.addEventListener("shopify:section:load", update);
  window.setInterval(update, 30000);
})();
