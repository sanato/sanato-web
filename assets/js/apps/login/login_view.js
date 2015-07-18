"use strict"

Sanato.module("LoginApp", function(LoginApp, Sanato, Backbone, Marionette, $, _) {
	LoginApp.View = Marionette.ItemView.extend({
		tagName: "div",
		className: "container",
		template: "#login-app-template",
		ui: {
			form: "#login-form",
			username: "#inputUsername",
			password: "#inputPassword"
		},
		events: {
			"submit @ui.form": "onSubmitForm"
		},
		onSubmitForm: function(event) {
			event.preventDefault();
			var username = this.ui.username.val();
			var password = this.ui.password.val();
			Sanato.LoginApp.Controller.login(username, password);
		}
	});
});