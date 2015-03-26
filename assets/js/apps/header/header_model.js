"use strict"

Sanato.module("HeaderApp", function(HeaderApp, Sanato, Backbone, Marionette, $, _) {
	
	HeaderApp.User = Backbone.Model.extend();

	var API = {
		getUser: function() {
			var token = localStorage.getItem("sanato_token");
			var tokenFields = token.split(".");
			var userEncoded = tokenFields[1];
			var userData = JSON.parse(window.atob(userEncoded));
			return new HeaderApp.User(userData);
		}
	};

	Sanato.reqres.setHandler("headerapp:user", function() {
		return API.getUser();
	});
});