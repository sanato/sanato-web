"use strict"

Sanato.module("NotificationApp", function(NotificationApp, Sanato, Backbone, Marionette, $, _) {
	NotificationApp.Controller = {
		add: function(type, message) {
			var notification = new NotificationApp.Notification({type: type, message: message});
			console.log(notification);
			Sanato.ContainerApp.layoutView.getRegion("notification").show(new NotificationApp.View({model: notification}));
		}
	}

	Sanato.on("notificationapp:add", function(type, message) {
		return NotificationApp.Controller.add(type, message);
	});
});