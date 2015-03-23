"use strict"

WhiteDAV.module("Entities", function(Entities, WhiteDAV, Backbone, Marionette, $, _) {
	Entities.Breadcrumb = Backbone.Model.extend({});
	Entities.BreadcrumbCollection = Backbone.Collection.extend({
		model: Entities.Breadcrumb
	});	
});