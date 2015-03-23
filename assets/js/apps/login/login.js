"use strict"

Sanato.module("LoginApp", function(LoginApp, Sanato, Backbone, Marionette, $, _) {
	this.startWithParent = false;

	LoginApp.View = Marionette.ItemView.extend({
		template: "#login-app-template"
	});

	LoginApp.on("start", function() {


		Sanato.getRegion("main").show(new LoginApp.View);

		// logic to check if the user is logged or not
		// if user is loged then start resources app else start login app
	});
});
