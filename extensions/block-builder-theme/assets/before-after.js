(() => {
  function init() {
    document.querySelectorAll("[data-bb-before-after]").forEach((block) => {
      if (block.dataset.bbReady) return;
      block.dataset.bbReady = "true";
      const range = block.querySelector('input[type="range"]');
      range.addEventListener("input", () => block.style.setProperty("--bb-split", `${range.value}%`));
    });
  }
  document.addEventListener("shopify:section:load", init);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
