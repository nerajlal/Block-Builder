(() => {
  const selector = "[data-bb-stock]";
  const blocks = new Set();
  function init() {
    document.querySelectorAll(selector).forEach((block) => {
      if (blocks.has(block)) return;
      try {
        const variants = JSON.parse(block.querySelector("[data-bb-variants]").textContent);
        block.variantAvailability = new Map(variants.map((variant) => [String(variant.id), variant]));
        blocks.add(block);
      } catch (error) {
        console.warn("Block Builder stock note could not read variant availability.", error);
      }
    });
  }
  function selectedId() {
    const productForm = document.querySelector('product-info form[action*="/cart/add"] [name="id"], form[action*="/cart/add"] [name="id"]');
    const formId = productForm?.value;
    return formId || new URLSearchParams(window.location.search).get("variant");
  }
  function update() {
    init();
    const id = selectedId();
    if (!id) return;
    blocks.forEach((block) => {
      if (!block.isConnected) { blocks.delete(block); return; }
      const variant = block.variantAvailability.get(String(id));
      if (!variant) return;
      const low = block.dataset.bbLowEnabled === "true" && variant.available && Number.isInteger(variant.quantity) && variant.quantity > 0 && variant.quantity <= Number(block.dataset.bbLowThreshold);
      block.querySelector("[data-bb-stock-available]").hidden = !variant.available || low || block.dataset.bbCombined === "true";
      block.querySelector("[data-bb-stock-low]").hidden = !low;
      if (low) block.querySelector("[data-bb-stock-quantity]").textContent = String(variant.quantity);
      block.querySelector("[data-bb-stock-unavailable]").hidden = variant.available;
      block.classList.toggle("bb-stock--out", !variant.available);
    });
  }
  document.addEventListener("change", () => { setTimeout(update, 0); setTimeout(update, 250); });
  document.addEventListener("shopify:section:load", update);
  window.addEventListener("popstate", update);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", update, { once: true });
  else update();
})();
