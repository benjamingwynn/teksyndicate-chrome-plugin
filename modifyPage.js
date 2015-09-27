// Here are the Tek Syndicate channel ID's:
var channels = [
	"UCNovoA9w0KnxyDP5bGrOYzg"
];

$(document).ready(function() {
	// Get the ID of this Youtuber
	var href = $(".yt-user-info > a.yt-uix-sessionlink.g-hovercard.spf-link")[0].href;
	var id = href.split("/channel/")[href.split("/channel/").length - 1];

	for (var i = 0; i < channels.length; i++) {
		if (channels[i] == id) loadForum();
	}
});

function loadForum() {
	// Who doen't love ASCII art?
	razeTheWorld();

	// 1. Remove the shitty YouTube comments, nobody likes them anyway
	$("#watch-discussion").remove();
	
	// Loop through all links in the watch description
	$("#watch-description a.yt-uix-redirect-link").each(function() {
		var splitted = this.href.split("https://teksyndicate.com/videos/").join("");
		
		if (splitted != this.href) {
			// Okay, now we have the Tek Syndicate link, we have to find the forum link
			console.log(this.href);
			
			// https://forum.teksyndicate.com/embed/comments?embed_url=https%3A%2F%2Fteksyndicate.com%2Fvideos%2Ftek-0196-will-human-intelligence-keep-ai
			//var forum = 'https://forum.teksyndicate.com/embed/comments?embed_url=' + this.href;
			
			// Tell our extension the link we found. For this to identify as coming from Youtube, we have to inject it into the HTML
			$("body").append('<script>chrome.runtime.sendMessage("khpnodaokejfagbkihjjlanlbicpgpll", {"forumlink":"' + this.href + '"})</script>');
		}
	});
}
