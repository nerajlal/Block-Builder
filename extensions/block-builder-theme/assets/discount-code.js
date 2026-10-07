document.addEventListener('click', async function (event) {
  const button = event.target.closest('[data-bb-copy-target]');
  if (!button || !button.closest('.bb-discount')) return;
  const code = document.getElementById(button.dataset.bbCopyTarget)?.textContent?.trim();
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    button.textContent = 'Copied';
    window.setTimeout(() => { if (button.isConnected) button.textContent = button.dataset.bbCopyLabel || 'Copy code'; }, 2000);
  } catch {
    button.textContent = 'Select code to copy';
  }
});
