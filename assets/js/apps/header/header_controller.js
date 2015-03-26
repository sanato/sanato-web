"use strict"

Sanato.module("HeaderApp", function(HeaderApp, Sanato, Backbone, Marionette, $, _) {
	HeaderApp.Controller = {
		loadUser: function() {
			var user = Sanato.request("headerapp:user");
			HeaderApp.view = new HeaderApp.View({model: user});
			Sanato.ContainerApp.layoutView.getRegion("header").show(HeaderApp.view);
		},
		logout: function() {
			localStorage.removeItem("sanato_token");
			location.reload();
		}
	}
});