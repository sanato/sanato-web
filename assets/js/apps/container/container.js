"use strict"

Sanato.module("ContainerApp", function(ContainerApp, Sanato, Backbone, Marionette, $, _) {
	this.startWithParent = false;

	ContainerApp.LayoutView = Marionette.LayoutView.extend({
		template: "#container-app-template",
		regions: {
			header: "#header",
			notification: "#notification",
			app: "#app",
			footer: "#footer",
		}
	});

	ContainerApp.on("start", function() {
		ContainerApp.layoutView = new ContainerApp.LayoutView();
		Sanato.getRegion("main").show(ContainerApp.layoutView);
		Sanato.HeaderApp.start();
	});
});
