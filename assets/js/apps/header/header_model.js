"use strict"

Sanato.module("HeaderApp", function(HeaderApp, Sanato, Backbone, Marionette, $, _) {
	
	HeaderApp.User = Backbone.Model.extend();

	var API = {
		getUser: function() {
			var token = localStorage.getItem("sanato_token");
			var userData = jwt_decode(token);
			return new HeaderApp.User(userData);
		}
	};

	Sanato.reqres.setHandler("headerapp:user", function() {
		return API.getUser();
	});
});