"use strict"

Sanato.module("HeaderApp", function(HeaderApp, Sanato, Backbone, Marionette, $, _) {
	HeaderApp.View = Marionette.ItemView.extend({
		tagName: "div",
		className: "container",
		template: "#header-app-template",
		ui: {
			logoutButton: ".js-logout"
		},
		events: {
			"click @ui.logoutButton": "onClickLogoutButton"
		},
		onClickLogoutButton: function(event) {
			HeaderApp.Controller.logout();
		}
	});
});