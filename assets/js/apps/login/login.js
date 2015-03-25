"use strict"

Sanato.module("LoginApp", function(LoginApp, Sanato, Backbone, Marionette, $, _) {
	this.startWithParent = false;

	LoginApp.Controller = {
		login: function(username, password) {
			var loging = LoginApp.Controller._login(username, password);
			$.when(loging).done(function(data) {
				localStorage.setItem("sanato_token", data);
				Sanato.ContainerApp.start();
				Sanato.ResourcesApp.start();
			});
			$.when(loging).fail(function(data, status) {
				alert("Wrong credentials");
			});
		},
		_login: function(username, password) {
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

	};

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

	LoginApp.on("start", function() {
		Sanato.getRegion("main").show(new LoginApp.View);
		// logic to check if the user is logged or not
		// if user is loged then start resources app else start login app
	});
});
