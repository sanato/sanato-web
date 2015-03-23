"use strict"

WhiteDAV.module("ResourcesApp", function(ResourcesApp, WhiteDAV, Backbone, Marionette, $, _) {
	ResourcesApp.Resource = Backbone.Model.extend({});
	ResourcesApp.ResourceCollection = Backbone.Collection.extend({
		model: ResourcesApp.Resource,
		comparator: function(model) {
			return [model.get("isCol"), model.get("id")];
		}
	});
	ResourcesApp.Breadcrumb = Backbone.Model.extend({
		default: {
			path: "",
			name: ""
		}
	});
	ResourcesApp.BreadcrumbCollection = Backbone.Collection.extend({
		model: ResourcesApp.Breadcrumb
	});

	var API = {
		
	};

	WhiteDAV.reqres.setHandler("app:files:breadcrumb:breadcrumbs", function(path) {
		return API.getBreadcrumbs(path);
	});
	var API = {
		stat: function(path) {
			var defer = $.Deferred();
			$.ajax({
				url: "http://localhost:3000/api/v1/core/apps/files/stat" + path + "?children=true",
				type: 'GET',
				async: true,
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('bstoken'));
				},
				success: function(data) {
					data = data.children? data.children : [];
					defer.resolve(data);
				},
				error: function() {
					defer.reject();
				}
			});
			return defer.promise();
		},
		download: function(path) {
			var getURL = '/api/v1/core/apps/files/get_file' + path + '?token=' + localStorage.getItem("bstoken");
			window.location.href = getURL;
		},
		remove: function(path) {
			var defer = $.Deferred();
			setTimeout(function(){
				$.ajax({
					url: "http://localhost:3000/api/v1/core/apps/files/remove" + path,
					type: 'POST',
					async: true,
					beforeSend: function (xhr) {
						xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('bstoken'));
					},
					success: function(data) {
						defer.resolve();
					},
					error: function() {
						defer.reject();
					}})
			},2000);
			
			return defer.promise();
		},
		mkcol: function(path) {
			var defer = $.Deferred();
			$.ajax({
				url: "http://localhost:3000/api/v1/core/apps/files/create_col" + path,
				type: 'POST',
				async: true,
				dataType: "json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('bstoken'));
				},
				success: function(data) {
					defer.resolve(data);
				},
				error: function() {
					defer.reject();
				}
			});
			return defer.promise();
		},
		rename: function(from , to) {
			console.log("renameeeed");
			var defer = $.Deferred();
			setTimeout(function() {
				$.ajax({
					url: "http://localhost:3000/api/v1/core/apps/files/rename?from=" + from + "&to=" + to,
					type: 'POST',
					async: true,
					beforeSend: function (xhr) {
						xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('bstoken'));
					},
					success: function(data) {
						defer.resolve();
					},
					error: function() {
						defer.reject();
					}
				});
			},2000);
			return defer.promise();
		},
		getBreadcrumbs: function(path) {
			var current = path || "/";
			var parts = current.split('/');
			parts.shift();
			var previousPath = "";
			var breadcrumbCollection = [];
			breadcrumbCollection.push({
				name: "Home",
				path: "/"
			});
			for(var i = 0; i < parts.length; i++ ) {
				var newPath = previousPath + '/' + parts[i];
				var name = parts[i];
				breadcrumbCollection.push({
					path: newPath,
					name: name
				});
				previousPath = newPath;
			}
			return breadcrumbCollection;
		}
	}

	WhiteDAV.reqres.setHandler("resourcesapp:stat", function(path) {
		return API.stat(path);
	});
	WhiteDAV.reqres.setHandler("resourcesapp:download", function(path) {
		return API.download(path);
	});
	WhiteDAV.reqres.setHandler("resourcesapp:remove", function(path) {
		return API.remove(path);
	});
	WhiteDAV.reqres.setHandler("resourcesapp:mkcol", function(path) {
		return API.mkcol(path);
	});
	WhiteDAV.reqres.setHandler("resourcesapp:rename", function(from, to) {
		return API.rename(from, to);
	});
	WhiteDAV.reqres.setHandler("resourcesapp:breadcrumbs", function(path) {
		return API.getBreadcrumbs(path);
	});
});