"use strict"

Sanato.module("LoginApp", function(LoginApp, Sanato, Backbone, Marionette, $, _) {
	this.startWithParent = false;

	LoginApp.on("start", function() {
		Sanato.getRegion("main").show(new LoginApp.View);
	});
});
