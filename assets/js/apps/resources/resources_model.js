"use strict"

Sanato.module("ResourcesApp", function(ResourcesApp, Sanato, Backbone, Marionette, $, _) {
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

	Sanato.reqres.setHandler("app:files:breadcrumb:breadcrumbs", function(path) {
		return API.getBreadcrumbs(path);
	});
	var API = {
		
		touch: function(path) {
			var bytesArray = new Uint8Array(0);
			return Sanato.request("resourcesapp:put", path, bytesArray);
		},

		put: function(path, data) {
			var defer = $.Deferred();
			$.ajax({
				url: Sanato.config.baseURL + "files_put/" + path,
				type: 'PUT',
				contentType: "application/octet-stream",  
				data: data,
				processData: false,
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('sanato_token'));
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
		stat: function(path) {
			var defer = $.Deferred();
			$.ajax({
				url: Sanato.config.baseURL + "files_stat" + path + "?children=true",
				type: 'GET',
				async: true,
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('sanato_token'));
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
			var getURL = Sanato.config.baseURL + "files_get" + path + "?token=" + localStorage.getItem("sanato_token");
			window.location.href = getURL;
		},
		remove: function(path) {
			var defer = $.Deferred();
			$.ajax({
				url: Sanato.config.baseURL + "files_delete" + path,
				type: 'POST',
				async: true,
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('sanato_token'));
				},
				success: function(data) {
					defer.resolve();
				},
				error: function() {
					defer.reject();
			}});
			
			return defer.promise();
		},
		mkcol: function(path) {
			var defer = $.Deferred();
			$.ajax({
				url: Sanato.config.baseURL + "files_mkcol/" + path,
				type: 'POST',
				async: true,
				dataType: "json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('sanato_token'));
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
			var defer = $.Deferred();
			$.ajax({
				url: Sanato.config.baseURL + "files_rename?from=" + from + "&to=" + to,
				type: 'POST',
				async: true,
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('sanato_token'));
				},
				success: function(data) {
					defer.resolve(data);
				},
				error: function(data) {
					defer.reject();
				}
			});
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
		},
		getIcon: function(model) {
			var icon = "";
			if (model.get("isCol")) {
				icon = "fa-folder-o";
			} else {
				if (model.get("mimeType") === "application/pdf") {
					icon = "fa-file-pdf-o";
				} else if (model.get("mimeType") === "text/plain") {
					icon = "assets/img/file.png";
				} else if (model.get("mimeType") === "image/png" || model.get("mimeType") === "image/jpeg") {
					icon = "fa-file-image-o";						
				} else {
					icon = "fa-gear";
				}
			}
			return icon;
		}
	}

	Sanato.reqres.setHandler("resourcesapp:put", function(path, binaryData) {
		return API.put(path, binaryData);
	});
	Sanato.reqres.setHandler("resourcesapp:touch", function(path) {
		return API.touch(path);
	});
	Sanato.reqres.setHandler("resourcesapp:stat", function(path) {
		return API.stat(path);
	});
	Sanato.reqres.setHandler("resourcesapp:download", function(path) {
		return API.download(path);
	});
	Sanato.reqres.setHandler("resourcesapp:remove", function(path) {
		return API.remove(path);
	});
	Sanato.reqres.setHandler("resourcesapp:mkcol", function(path) {
		return API.mkcol(path);
	});
	Sanato.reqres.setHandler("resourcesapp:rename", function(from, to) {
		return API.rename(from, to);
	});
	Sanato.reqres.setHandler("resourcesapp:breadcrumbs", function(path) {
		return API.getBreadcrumbs(path);
	});
	Sanato.reqres.setHandler("resourcesapp:geticon", function(model) {
		return API.getIcon(model);
	});
});
