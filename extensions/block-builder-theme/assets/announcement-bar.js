document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-bb-announcement-copy]");
  if (!button) return;
  const code = document.getElementById(button.dataset.bbAnnouncementCopy)?.textContent?.trim();
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    button.textContent = "Copied";
  } catch {
    button.textContent = "Select the code to copy";
  }
  window.setTimeout(() => { if (button.isConnected) button.textContent = "Copy code"; }, 2500);
});
