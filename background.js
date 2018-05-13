var cleardownloads = function(){
	var clearfreq = 5000;

	setTimeout(function() {
		chrome.downloads.setShelfEnabled(false);
		chrome.downloads.setShelfEnabled(true);
	}, clearfreq)
};

chrome.downloads.onChanged.addListener(function (e) {
	if (typeof e.state !== "undefined") {
		if (e.state.current === "complete") {
			cleardownloads();
		}
	}
});