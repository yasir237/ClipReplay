chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: togglePlayPause
  });
});

function togglePlayPause() {
  const video = document.querySelector('video');
  if (video) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  } else {
    alert("Bu sayfada video yok.");
  }
}
