"use strict"

Sanato.module("LoginApp", function(LoginApp, Sanato, Backbone, Marionette, $, _) {
	LoginApp.Controller = {
		login: function(username, password) {
			var loging = Sanato.request("loginapp:login", username, password);
			$.when(loging).done(function(data) {
				localStorage.setItem("sanato_token", data);
				Sanato.ContainerApp.start();
				Sanato.ResourcesApp.start();
			});
			$.when(loging).fail(function(data, status) {
				alert("Wrong credentials");
			});
		}
	}
});