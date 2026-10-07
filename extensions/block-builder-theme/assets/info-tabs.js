(() => {
  function activate(group, target, focus = false) {
    group.querySelectorAll('[role="tab"]').forEach((tab) => {
      const selected = tab === target;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = group.querySelector(`#${CSS.escape(tab.getAttribute("aria-controls"))}`);
      if (panel) panel.hidden = !selected;
    });
    if (focus) target.focus();
  }
  function init() {
    document.querySelectorAll("[data-bb-info-tabs]").forEach((group) => {
      if (group.dataset.bbReady) return;
      group.dataset.bbReady = "true";
      const tabs = [...group.querySelectorAll('[role="tab"]')];
      if (!tabs.length) return;
      activate(group, tabs[0]);
      tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => activate(group, tab));
        tab.addEventListener("keydown", (event) => {
          let next = index;
          if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
          else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = tabs.length - 1;
          else return;
          event.preventDefault();
          activate(group, tabs[next], true);
        });
      });
    });
  }
  document.addEventListener("shopify:section:load", init);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
