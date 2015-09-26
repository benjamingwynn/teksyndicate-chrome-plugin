// Define a sync version of contains
String.prototype.contains = function(small, callback) {
	/*
		Splits up the string, if the string is the same even when it's split up then the strings are
		not equal, otherwise they are. If the latter, return true.
	*/
	
	var big = this.toString();
	if (big !== big.split(small).join("")) return true;
}

// Here are the Tek Syndicate channel ID's:
var channels = [
	"UCNovoA9w0KnxyDP5bGrOYzg"
];

// Get the ID of this Youtuber
var href = $(".yt-user-info > a.yt-uix-sessionlink.g-hovercard.spf-link")[0].href;
var id = href.split("/channel/")[href.split("/channel/").length - 1];

console.log(id); //temp

for (var i = 0; i < channels.length; i++) {
	if (channels[i] == id) loadForum();
}

function loadForum() {
	console.log("I would load the forum, but I don't know how to yet.");
}
