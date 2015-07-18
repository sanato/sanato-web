"use strict"

Sanato.module("HeaderApp",function(HeaderApp, Sanato, Backbone, Marionette, $, _) {
	this.startWithParent = false;

	HeaderApp.on("start", function() {
		HeaderApp.Controller.loadUser();
	});
});