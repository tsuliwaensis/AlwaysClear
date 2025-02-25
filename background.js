// Function to clear completed downloads
function clearDownloads(delaySeconds) {
  const delayMilliseconds = delaySeconds * 1000;

  setTimeout(() => {
    chrome.downloads.erase({ state: "complete" }, (erasedIds) => {
      if (chrome.runtime.lastError) {
        console.error("Error erasing downloads:", chrome.runtime.lastError);
      } else {
        console.log("Cleared completed downloads:", erasedIds);
      }
    });
  }, delayMilliseconds);
}

// Listen for changes in download state
chrome.downloads.onChanged.addListener((downloadDelta) => {
  if (
    downloadDelta.state &&
    downloadDelta.state.current === "complete"
  ) {
    // Get the delay from storage, or use a default value (e.g., 5 seconds)
    chrome.storage.sync.get({ clearDelay: 5 }, (items) => {
      clearDownloads(items.clearDelay);
    });
  }
});

