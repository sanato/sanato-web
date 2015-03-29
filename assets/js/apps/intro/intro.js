"use strict"

Sanato.module("IntroApp", function(IntroApp, Sanato, Backbone, Marionette, $, _) {
	this.startWithParent = false;

	IntroApp.View = Marionette.ItemView.extend({
		template: "#intro-app-template"
	});

	IntroApp.on("start", function() {


		Sanato.getRegion("main").show(new IntroApp.View);
		setTimeout(function() {
			if(localStorage.getItem("sanato_token")) {
				Sanato.ContainerApp.start();
				Sanato.ResourcesApp.start();
			} else {
				Sanato.LoginApp.start();
			}
		}, 1500);
	});
});
