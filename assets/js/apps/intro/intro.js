"use strict"

WhiteDAV.module("IntroApp", function(IntroApp, WhiteDAV, Backbone, Marionette, $, _) {
	this.startWithParent = false;

	IntroApp.View = Marionette.ItemView.extend({
		template: "#intro-app-template"
	});

	IntroApp.on("start", function() {


		WhiteDAV.getRegion("main").show(new IntroApp.View);

		// logic to check if the user is logged or not
		// if user is loged then start resources app else start login app
	});
});