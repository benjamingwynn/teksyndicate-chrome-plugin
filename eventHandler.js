// https://developer.chrome.com/extensions/webNavigation#event-onDOMContentLoaded

var yttabid = 0;

// .contains
String.prototype.contains = function(small, callback) {
	/*
		Splits up the string, if the string is the same even when it's split up then the strings are
		not equal, otherwise they are. If the latter, call back.
	*/
	
	var big = this.toString();
	if (big !== big.split(small).join("")) callback();
}

chrome.webNavigation.onCompleted.addListener(function(details) {
	// We just navigated to a new page, get the url
	var url = details.url;
	
	//console.log(url);
	
	// Check to see if this is a Youtube watch page:
	url.contains("youtube.com/watch?v=", function() {
		// temp
		console.info("Got YouTube page, injecting JS.");
		yttabid = details.tabId;
		
		// temp
		//console.log(details);
		
		// Inject JS into this page:
		chrome.tabs.executeScript(details.tabId, {file: "jquery.min.js"});
		chrome.tabs.executeScript(details.tabId, {file: "razeTheWorld.js"});
		chrome.tabs.executeScript(details.tabId, {file: "modifyPage.js"});
		//chrome.tabs.executeScript(details.tabId, {file: "prototypeExtensions.js"});
	});
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
	sendResponse();
	//console.log("GOT!");
	
	// parse
	//var request = JSON.parse(unparsedrequest);
	
	console.log(request);
	console.log(yttabid);
			
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
		/*
			newdiv = document.createElement('div');
			newdiv.innerHTML = request.html;
			document.getElementById("watch7-content").appendChild(newdiv);
		*/
		var trimmedHTML = request.html.trim().split('"/').join('"https://forum.teksyndicate.com/').split("https://forum.teksyndicate.com//forum.teksyndicate.com/").join("https://forum.teksyndicate.com/").split("\n").join(" ").replace(/(['"])/g, "\\$1");
		
		chrome.tabs.executeScript(yttabid, {'code' : 'newdiv = document.createElement("div"); newdiv.innerHTML = "' + trimmedHTML + '"; document.getElementById("watch7-content").appendChild(newdiv);body.style.background = "#1a1a1a"'});
	}
	
	
	//console.log(sender);
	//console.log(sendResponse);
});
