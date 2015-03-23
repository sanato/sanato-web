"use strict"

window.WhiteDAV = new Marionette.Application();
	
WhiteDAV.navigate = function(route, options) {
	options = options || {};
	Backbone.history.navigate(route, options);
};

WhiteDAV.getCurrentRoute = function() {
	return Backbone.history.fragment;
};

WhiteDAV.addRegions({
	main: "#main",
	header: "#header",
	banner: "#banner",
	notification: "#notification",
	app: "#app",
	footer: "#footer"
});

WhiteDAV.on("start", function() {
	//WhiteDAV.ResourcesApp.start();
	if(Backbone.history) {
		//Backbone.history.start({root: "/webprivate/whitedav/index-new.html"});
		Backbone.history.start();
		if(this.getCurrentRoute() === "") {
			//WhiteDAV.trigger("resourcesapp:stat", "/");
		}
	}
});

$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
	if(jqxhr.status === 401) {
		window.location.href = "/webpublic/";
	}
});