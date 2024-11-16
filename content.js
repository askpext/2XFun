function setPlaybackSpeed() {
  const video = document.querySelector('video');
  if (video) {
    // Set actual playback speed
    video.playbackRate = 2.0;
    
    // Add a speed indicator if it doesn't exist
    let speedIndicator = document.getElementById('custom-speed-indicator');
    if (!speedIndicator) {
      speedIndicator = document.createElement('div');
      speedIndicator.id = 'custom-speed-indicator';
      speedIndicator.style.cssText = `
        position: fixed;
        bottom: 70px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        font-size: 14px;
      `;
      document.body.appendChild(speedIndicator);
    }
    speedIndicator.textContent = `Speed: ${video.playbackRate}x`;

    // Monitor for speed changes
    video.addEventListener('ratechange', () => {
      if (video.playbackRate !== 2.0) {
        video.playbackRate = 2.0;
        speedIndicator.textContent = `Speed: ${video.playbackRate}x`;
      }
    });

    // Monitor for seeking/loading new video segments
    video.addEventListener('seeking', () => {
      if (video.playbackRate !== 2.0) {
        video.playbackRate = 2.0;
        speedIndicator.textContent = `Speed: ${video.playbackRate}x`;
      }
    });

    // Also check periodically to ensure speed stays at 2x
    setInterval(() => {
      if (video.playbackRate !== 2.0) {
        video.playbackRate = 2.0;
        speedIndicator.textContent = `Speed: ${video.playbackRate}x`;
      }
    }, 1000);
  }
}

// Initial setup with a delay to ensure YouTube loads
let attempts = 0;
const maxAttempts = 10;
const checkInterval = setInterval(() => {
  if (document.querySelector('video')) {
    setPlaybackSpeed();
    clearInterval(checkInterval);
  } else if (attempts >= maxAttempts) {
    clearInterval(checkInterval);
  }
  attempts++;
}, 1000);

// Handle dynamic page updates (like navigating between videos)
const observer = new MutationObserver((mutations) => {
  const video = document.querySelector('video');
  if (video && video.playbackRate !== 2.0) {
    setPlaybackSpeed();
  }
});

// Start observing document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});