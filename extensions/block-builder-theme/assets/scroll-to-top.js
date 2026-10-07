document.addEventListener('click', function (event) {
  const button = event.target.closest('[data-bb-scroll-top]');
  if (!button) return;
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});
