function saveOptions() {
  const clearDelay = parseInt(document.getElementById('clearDelay').value, 10);

  if (isNaN(clearDelay) || clearDelay < 1) {
    document.getElementById('status').textContent = 'Please enter a valid delay (at least 1 second).';
    return;
  }

  chrome.storage.sync.set({ clearDelay: clearDelay }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

function restoreOptions() {
  // Use default value clearDelay = 5.
  chrome.storage.sync.get({ clearDelay: 5 }, (items) => {
    document.getElementById('clearDelay').value = items.clearDelay;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
