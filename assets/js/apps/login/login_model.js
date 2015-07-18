"use strict"

Sanato.module("LoginApp", function(LoginApp, Sanato, Backbone, Marionette, $, _) {
	var API = {
		login: function(username, password) {
			var defer = $.Deferred();
			$.ajax({
				url: Sanato.config.baseURL + "auth/login",
				type: 'POST',
				async: true,
				data: JSON.stringify({ "username": username, "password" : password }),
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				success: function(data) {
					defer.resolve(data.token);
				},
				error: function() {
					defer.reject();
				}
			});
			return defer.promise();
		},
	}

	Sanato.reqres.setHandler("loginapp:login", function(username, password) {
		return API.login(username, password);
	})
});