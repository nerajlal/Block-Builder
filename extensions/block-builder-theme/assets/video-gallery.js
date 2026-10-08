document.addEventListener("play", (event) => {
  const playing = event.target;
  const gallery = playing.closest?.(".bb-gallery--portrait");
  if (!gallery || playing.tagName !== "VIDEO") return;
  gallery.querySelectorAll("video").forEach((video) => {
    if (video !== playing) video.pause();
  });
}, true);
