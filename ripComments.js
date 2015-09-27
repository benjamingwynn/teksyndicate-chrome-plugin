/*
	<script>
		// Use jQuery to set what's loaded in our frame to the body
		$("body").load($("#discourse-comments > iframe")[0].src, function() {
			// Once that is done, tell our Chrome extension what our body now contains:
			chrome.runtime.sendMessage("khpnodaokejfagbkihjjlanlbicpgpll", {"html": $("body").html() }, function() {
				// Once that's done, kill this tab.
				window.open("", "_self", "");
				window.close();
			});
		});
	</script>
*/

$('body').append('<script>$("body").load($("#discourse-comments > iframe")[0].src, function() {chrome.runtime.sendMessage("khpnodaokejfagbkihjjlanlbicpgpll", {"html": $("body").html() }, function() {window.open("", "_self", ""); window.close();});});</script>');
