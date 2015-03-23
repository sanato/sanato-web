"use strict"

Sanato.module("IntroApp", function(IntroApp, Sanato, Backbone, Marionette, $, _) {
	this.startWithParent = false;

	IntroApp.View = Marionette.ItemView.extend({
		template: "#intro-app-template"
	});

	IntroApp.on("start", function() {


		Sanato.getRegion("main").show(new IntroApp.View);

		// logic to check if the user is logged or not
		// if user is loged then start resources app else start login app
	});
});
