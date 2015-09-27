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

chrome.webNavigation.onCommitted.addListener(function(details) {
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
	
		// Create a new Chrome tab with the requsted URL
		chrome.tabs.create({'url': request.forumlink, 'active': false }, function(tab) {
			// Okay now with this tab we have to inject our Javascript
			chrome.tabs.executeScript(tab.id, {'file': 'jquery.min.js'});
			chrome.tabs.executeScript(tab.id, {'file': 'ripComments.js'});
		});
	} else if (request.html) {
		console.log("Got the HTML!");
		/*
			newdiv = document.createElement('div');
			newdiv.innerHTML = request.html;
			document.getElementById("watch7-content").appendChild(newdiv);
		*/
		var trimmedHTML = request.html.trim().split("\n").join(" ").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
		
		chrome.tabs.executeScript(yttabid, {'code' : 'newdiv = document.createElement("div"); newdiv.innerHTML = "' + trimmedHTML + '"; document.getElementById("watch7-content").appendChild(newdiv);'});
	}
	
	
	//console.log(sender);
	//console.log(sendResponse);
});
