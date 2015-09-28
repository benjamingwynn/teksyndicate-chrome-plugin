var lastyttab = 0;

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
	
	// Check to see if this is a Youtube page:
	url.contains("youtube.com", function() {
		chrome.tabs.executeScript(details.tabId, {file: "injector.js"});
		chrome.tabs.executeScript(details.tabId, {code: "injectScript('jquery.min', function() {injectScript('youtubeWatcher')})"});
		chrome.tabs.executeScript(details.tabId, {code: "injectScript('razeTheWorld')"});
	});
	
	url.contains("youtube.com/watch", function() {
		console.log("New Youtube watch tab opened: " + details.tabId);
		lastyttab = details.tabId;
	});
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
	sendResponse();
	
	console.log(request);
	
	if (request.forumlink) {
		console.log(request.forumlink);
		// holy hacks batman
		
		chrome.windows.create({'url': request.forumlink, 'focused': false, 'height': 1, 'width': 1, 'top': -1, 'left': -1}, function(window) {
			// Okay now with this tab we have to inject our Javascript
			chrome.tabs.executeScript(window.tabs[0].id, {'file': 'jquery.min.js'});
			chrome.tabs.executeScript(window.tabs[0].id, {'file': 'ripComments.js'});
		});
	} else if (request.html) {
		console.log("Got the HTML!");
		
		// Parse the HTML
		var parsedHTML = request.html.trim().split('"/').join('"https://forum.teksyndicate.com/').split("https://forum.teksyndicate.com//forum.teksyndicate.com/").join("https://forum.teksyndicate.com/").split("\n").join(" ").replace(/(['"])/g, "\\$1");
		
		/*
			newdiv = document.createElement('div');
			newdiv.innerHTML = request.html;
			document.getElementById("watch7-content").appendChild(newdiv);
		*/
		
		console.log(lastyttab);
		
		chrome.tabs.executeScript(lastyttab, {'code' : 'newdiv = document.createElement("div"); newdiv.id="tek-syndicate-comments"; newdiv.innerHTML = "' + parsedHTML + '"; document.getElementById("watch7-content").appendChild(newdiv); body.style.background = "#1a1a1a"; console.log("comments injected!")'});
	}
});
