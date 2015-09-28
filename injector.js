if (typeof(injectScript) != "undefined") {
	console.warn("injector.js called mulitple times.");
}

function injectScript(file, callback) {
	if (document.getElementById("js-" + file) == null) {
		console.info("Injecting " + file);
		var element = document.createElement('script');
		element.src = chrome.extension.getURL(file + ".js");;
		element.addEventListener('load', callback, false);
		element.id = "js-" + file;
		document.head.appendChild(element);
	} else {
		console.warn("Refusing to inject " + file + ", Javascript already exists.")
	}
}
