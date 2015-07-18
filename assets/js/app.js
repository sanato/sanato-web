"use strict"

window.Sanato = new Marionette.Application();

Sanato.config = {
	baseURL: "/"
};

Sanato.navigate = function(route, options) {
	options = options || {};
	Backbone.history.navigate(route, options);
};

Sanato.getCurrentRoute = function() {
	return Backbone.history.fragment;
};

Sanato.addRegions({
	main: "#main",
	header: "#header",
	banner: "#banner",
	notification: "#notification",
	app: "#app",
	footer: "#footer"
});

Sanato.on("start", function() {
	if(Backbone.history) {
		//Backbone.history.start({root: "/webprivate/sanato/index-new.html"});
		Backbone.history.start();
		if(this.getCurrentRoute() === "") {
			//Sanato.trigger("resourcesapp:stat", "/");
		}
	}
	Sanato.IntroApp.start();
});

$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
	if(jqxhr.status === 401) {
		Sanato.HeaderApp.Controller.logout();
	}
});
