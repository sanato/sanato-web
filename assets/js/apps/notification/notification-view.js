"use strict"

Sanato.module("NotificationApp", function(NotificationApp, Sanato, Backbone, Marionette, $, _) {
	NotificationApp.View = Marionette.ItemView.extend({
		tagName: "div",
		className: "container",
		template: "#notification-app-template"
	});
});