// https://developer.chrome.com/extensions/webNavigation#event-onDOMContentLoaded

// .contains
String.prototype.contains = function(small, callback) {
	/*
		Splits up the string, if the string is the same even when it's split up then the strings are
		not equal, otherwise they are. If the latter, call back.
	*/
	
	var big = this.toString();
	if (big !== big.split(small).join("")) callback();
}

chrome.webNavigation.onCommitted.addListener(function(details) {
	// We just navigated to a new page, get the url
	var url = details.url;
	
	//console.log(url);
	
	// Check to see if this is a Youtube watch page:
	url.contains("youtube.com/watch?v=", function() {
		// temp
		console.info("Got YouTube page, injecting JS.");
		
		// temp
		//console.log(details);
		
		// Inject JS into this page:
		chrome.tabs.executeScript(details.tabId, {file: "jquery.min.js"});
		chrome.tabs.executeScript(details.tabId, {file: "modifyPage.js"});
	});
});
