document.addEventListener('click', function (event) {
  const button = event.target.closest('[data-bb-scroll-top]');
  if (!button) return;
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});
function initWhatsApp() {
  document.querySelectorAll('[data-bb-whatsapp]').forEach((link) => {
    const number = link.dataset.number.replace(/[\s+().-]/g, '');
    if (!/^\d{8,15}$/.test(number)) return;
    const message = link.dataset.message || '';
    link.href = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
    link.hidden = false;
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWhatsApp, { once: true });
else initWhatsApp();
document.addEventListener('shopify:section:load', initWhatsApp);
