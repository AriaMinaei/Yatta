(function(){

	// Let's first determine the url to yatta directory
	var yattaUrl = (function(){
		var scripts = document.getElementsByTagName('script');

		var script = scripts[scripts.length - 1];
		var src = script.getAttribute('src');

		if (/start\.js$/.test(src)) {
			return src.substr(0, src.length - 9);
		} else {
			return null;
		}

	})();

	// Get a reference to the head element
	var head = document.getElementsByTagName('head')[0];

	// Load the css
	(function(){
		var node = document.createElement('link');
		node.rel = 'stylesheet';
		node.href = yattaUrl + '/requirements/styles.css';
		head.appendChild(node);
	})();

	// Little helper function to load scripts
	var loadScript = function(src, callback){
		var node = document.createElement('script');

		node.type = 'text/javascript';
		node.charset = 'utf-8';
		node.async = true;

		node.addEventListener('load', function(){
			if (callback != null) {
				callback();
			}
		});

		node.src = src;

		head.appendChild(node);
	};

	// Currently, yatta isn't loaded.
	var yattaLoaded = false;

	// This will get called when requirejs is loaded.
	var defineYatta = function(){

		// Configure require.js
		require.config({
			baseUrl: yattaUrl + '/js/lib'
		});

		// requrie yatta's main lib file
		require(['ready'], function(){

			yattaLoaded = true;

			// Then load all the scripts requried from yatta() calls.
			loadScripts();
		});
	};

	// Load the requirejs library.
	loadScript(yattaUrl + '/requirements/require.js', defineYatta);

	// If requirejs hasn't loaded yet, we'll queue up all the scripts
	// required from yatta() calls.
	var scriptsToLoadAfterYatta = [];

	// This will load scripts queued up by the yatta() calls.
	var loadScripts = function(){
		if (yattaLoaded) {
			while (true) {

				var src = scriptsToLoadAfterYatta.shift();

				if (typeof src == 'undefined') {
					break;
				}

				loadScript(src);
			}
		}
	};

	// Use this to load scripts after yatta is fully loaded.
	window.start = function(src){
		scriptsToLoadAfterYatta.push(src);
		loadScripts();
	};

})();