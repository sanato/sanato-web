"use strict"

WhiteDAV.module("Entities", function(Entities, WhiteDAV, Backbone, Marionette, $, _) {
	
	Entities.Resource = Backbone.Model.extend({});
	Entities.ResourceCollection = Backbone.Collection.extend({
		model: Entities.Resource
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
					var resourceCollection = new Entities.ResourceCollection(data.children);
					defer.resolve(resourceCollection);
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
				}
			});
			return defer.promise();
		},

		mkcol: function(path) {
			var defer = $.Deferred();
			$.ajax({
				url: "http://localhost:3000/api/v1/core/apps/files/create_col" + path,
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
			return defer.promise();
		}
	}

	WhiteDAV.reqres.setHandler("resource:stat", function(path) {
		return API.stat(path);
	});
	WhiteDAV.reqres.setHandler("resource:download", function(path) {
		return API.download(path);
	});
	WhiteDAV.reqres.setHandler("resource:remove", function(path) {
		return API.remove(path);
	});
	WhiteDAV.reqres.setHandler("resource:mkcol", function(path) {
		return API.mkcol(path);
	});
});