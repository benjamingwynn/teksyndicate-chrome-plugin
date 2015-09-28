// Tek Syndicate channel ID's
const CHANNELS = [
	"UCNovoA9w0KnxyDP5bGrOYzg", // Tek Syndicate
	"UC4w1YQAJMWOz4qtxinq55LQ", // Tek Syndicate Hardware
	"UCOWcZ6Wicl-1N34H0zZe38w", // Tek Linux
	"UCd6EFsVsqGhASiz6g1KifUQ", // Tek Enterprise
	"UCoeAaUE-_t89BHuXjnfwykw"  // Beer Games Beer
];

console.log("Injected Tek Syndicate Extension JS");

// Use ontransitionend to detect when the page is changed

var lastpath = "";

window.ontransitionend = function(e) {
	// Last path test
	if (lastpath == "") {
		console.warn("No last path. This means we navigated here directly or we were just reloaded by ourselves.");
		lastpath = window.location.pathname;
	} else if (window.location.pathname != lastpath) {
		// Fix background colour
		body.style.background = "#F1F1F1";
		
		lastpath = window.location.pathname;
		console.info("Youtube page changed!");
		
		// Is this a video page?
		if (window.location.pathname == "/watch") {
			console.log("Looks like we're on a video page! Force reloading to rebuild page elements correctly");
			location.reload();
		}
	}
}

$(document).ready(function() {
	if (window.location.pathname == "/watch") {
		console.info("We just navigated to a Youtube watch page!");
		
		// Is this a Tek Syndicate page?
		var href = $(".yt-user-info > a.yt-uix-sessionlink.g-hovercard.spf-link")[0].href;
		var id = href.split("/channel/")[href.split("/channel/").length - 1];

		for (var i = 0; i < CHANNELS.length; i++) {
			if (CHANNELS[i] == id) loadForum();
		}
	}
});

function loadForum() {
	// Who doen't love ASCII art?
	razeTheWorld();

	// TODO: Only remove Youtube comments once we know everything else loaded okay
	$("#watch-discussion").remove();
	
	// Loop through all links in the watch description
	$("#watch-description a.yt-uix-redirect-link").each(function() {
		var splitted = this.href.split("https://teksyndicate.com/videos/").join("");
		
		if (splitted != this.href) {
			// Okay, now we have the Tek Syndicate link, we have to find the forum link
			console.log(this.href);
			
			// Tell our extension the link we found. For this to identify as coming from Youtube, we have to inject it into the HTML
			$("body").append('<script>chrome.runtime.sendMessage("khpnodaokejfagbkihjjlanlbicpgpll", {"forumlink":"' + this.href + '"})</script>');
		}
	});
}
