"use strict"

Sanato.module("ResourcesApp", function(ResourcesApp, Sanato, Backbone, Marionette, $, _) {
	ResourcesApp.Controller = {
		put: function(files) {
			var view = ResourcesApp.panelView;
			view.ui.uploadLabel.html('<i class="fa fa-refresh fa-spin"></i>');
			view.ui.uploadButton.addClass("disabled");
			var uploadQueue = [];
			for(var i = 0; i < files.length; i++) {
				var file = files.item(i);
				var puting = Sanato.request("resourcesapp:put", ResourcesApp.currentPath + "/" + file.name, file);
				uploadQueue.push(puting);
			    
			    $.when(puting).done(function(data) {
					var model = ResourcesApp.resourceCollection.add(data);
					var view = ResourcesApp.resourceCollectionView.children.findByModel(model);
					view.$el.toggleClass("warning");
					view.$el.fadeOut(function() {
						view.$el.fadeIn();
						view.$el.toggleClass("warning");
					});
				});
				$.when(puting).fail(function() {
					Sanato.trigger("notificationapp:add", "danger", "Failed uploading  " + file.name);
				});
			}
			$.when.apply($, uploadQueue).done(function() {
				view.ui.uploadLabel.html('<i class="fa fa-cloud-upload"> Upload</i>');
				view.ui.uploadButton.removeClass("disabled");
			})
		},
		touch: function(path) {
			var touching = Sanato.request("resourcesapp:touch", path);
			var view = ResourcesApp.panelView;
			view.ui.newResourceLabel.html('<i class="fa fa-refresh fa-spin"></i>');
			view.ui.newButton.addClass("disabled");
			$.when(touching).done(function(data) {
				var model = ResourcesApp.resourceCollection.add(data);
				var view = ResourcesApp.resourceCollectionView.children.findByModel(model);
				view.$el.toggleClass("warning");
				view.$el.fadeOut(function() {
					view.$el.fadeIn();
					view.$el.toggleClass("warning");
				});
			});
			$.when(touching).always(function() {
				view.ui.newResourceLabel.text("New");
				view.ui.newButton.removeClass("disabled");
			});
		},
		stat: function(path) {
			ResourcesApp.selectedCollection.reset();
			ResourcesApp.Controller._showSelectStats();
			ResourcesApp.resourceCollectionView.ui.checkboxAll.prop("checked", false);
			ResourcesApp.layoutView.getRegion("loader").show(new ResourcesApp.LoaderView());
			ResourcesApp.layoutView.getRegion("grid").$el.hide();
			var stating = Sanato.request("resourcesapp:stat", path);
			$.when(stating).done(function(data) {
				ResourcesApp.currentPath = path;
				ResourcesApp.resourceCollection.reset(data);
				ResourcesApp.breadcrumbCollection.reset(Sanato.request("resourcesapp:breadcrumbs", path));
				Sanato.navigate("resources" + path);
			});
			$.when(stating).fail(function(data) {
				Sanato.trigger("notification:show", "danger", "stating path " + path + " failed");
			});
			$.when(stating).always(function() {
				ResourcesApp.layoutView.getRegion("grid").$el.show();	
				ResourcesApp.layoutView.getRegion("loader").empty();
			});
			
		},
		download: function(path) {
			Sanato.request("resourcesapp:download", path);
		},
		remove: function(path) {
			Sanato.execute("set:resourcesapp:deleteiconloader:show", path);
			var removing = Sanato.request("resourcesapp:remove", path);
			$.when(removing).done(function() {
				ResourcesApp.resourceCollection.remove(ResourcesApp.resourceCollection.get(path));
				
			});
			$.when(removing).fail(function() {
				Sanato.execute("set:resourcesapp:deleteiconloader:hide", path);
			});
			$.when(removing).always(function() {
				ResourcesApp.resourceCollectionView.ui.selectStats.text("Selected " + ResourcesApp.selectedCollection.length + " items");
				if (ResourcesApp.selectedCollection.length === 0) {
					ResourcesApp.resourceCollectionView.ui.selectStats.text("");
					ResourcesApp.resourceCollectionView.ui.selectStats.addClass("hidden");
					ResourcesApp.resourceCollectionView.ui.resourceName.removeClass("hidden");
					ResourcesApp.resourceCollectionView.ui.tableHeader.removeClass("grey");
				}
			});
		},
		mkcol: function(path) {
			var mkcoling = Sanato.request("resourcesapp:mkcol", path);
			var view = ResourcesApp.panelView;
			view.ui.newResourceLabel.html('<i class="fa fa-refresh fa-spin"></i>');
			view.ui.newButton.addClass("disabled");
			$.when(mkcoling).done(function(data) {
				var model = ResourcesApp.resourceCollection.add(data);
				var view = ResourcesApp.resourceCollectionView.children.findByModel(model);
				view.$el.toggleClass("warning");
				view.$el.fadeOut(function() {
					view.$el.fadeIn();
					view.$el.toggleClass("warning");
				});
			});
			$.when(mkcoling).always(function() {
				view.ui.newResourceLabel.text("New");
				view.ui.newButton.removeClass("disabled");
			});
		},
		rename: function(from, to) {
			var model = ResourcesApp.resourceCollection.get(from);
			var children = ResourcesApp.resourceCollectionView.children;
			var childview = children.findByModel(model);
			childview.ui.iconButton.addClass("hidden");
			childview.ui.iconLoader.removeClass("hidden");

			var renaming = Sanato.request("resourcesapp:rename", from, to);
			$.when(renaming).done(function(data) {
				ResourcesApp.resourceCollection.remove(ResourcesApp.resourceCollection.get(from));
				
				// we only add the new renamed resource is the old was in the same dir.
				// I.E, in a move we don´t add the resource, but in a rename yes.
				// http://phpjs.org/functions/dirname/
				if(from.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '') === to.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '')) {
					ResourcesApp.resourceCollection.add(new ResourcesApp.Resource(data));
				}

				ResourcesApp.resourceCollectionView.ui.selectStats.text("Selected " + ResourcesApp.selectedCollection.length + " items");
				if (ResourcesApp.selectedCollection.length === 0) {
					ResourcesApp.resourceCollectionView.ui.selectStats.text("");
					ResourcesApp.resourceCollectionView.ui.selectStats.addClass("hidden");
					ResourcesApp.resourceCollectionView.ui.resourceName.removeClass("hidden");
					ResourcesApp.resourceCollectionView.ui.tableHeader.removeClass("grey");
				}
				
			});
			$.when(renaming).fail(function() {
				childview.ui.iconButton.removeClass("hidden");
				childview.ui.iconLoader.addClass("hidden");
				console.log("renaming failed");
			});
		},
		filter: function(name) {
			name = name.toLowerCase();
			var modelsToShow = [];
			var modelsToHide = [];
			var children = ResourcesApp.resourceCollectionView.children;

			if (name !== "") {
				modelsToShow = ResourcesApp.resourceCollection.filter(function(model) {
					return model.get("path").split("/").pop().toLowerCase().indexOf(name) !== -1; 
				});
				modelsToHide = ResourcesApp.resourceCollection.filter(function(model) {
					return model.get("path").split("/").pop().toLowerCase().indexOf(name) === -1; 
				});	
			} else {
				modelsToShow = ResourcesApp.resourceCollection;
				modelsToHide = [];
			}
			
			modelsToShow.forEach(function(model) {
				var view = children.findByModel(model);
				view.$el.removeClass("hidden");
				model.unset("hidden");
			});
			modelsToHide.forEach(function(model) {
				var view = children.findByModel(model);
				view.$el.addClass("hidden");
				model.set({"hidden":true});
			});
		},
		select: function(path) {
			var model = ResourcesApp.resourceCollection.get(path);
			var children = ResourcesApp.resourceCollectionView.children;
			var childview = children.findByModel(model);
			//childview.$el.addClass("danger");
			childview.ui.checkbox.prop("checked", true);
			ResourcesApp.selectedCollection.add(model);
			if (ResourcesApp.resourceCollection.length === ResourcesApp.selectedCollection.length) {
				ResourcesApp.resourceCollectionView.ui.checkboxAll.prop("checked", true);
			}
			ResourcesApp.Controller._showSelectStats();
			
		},
		unselect: function(path) {
			var model = ResourcesApp.resourceCollection.get(path);
			var children = ResourcesApp.resourceCollectionView.children;
			var childview = children.findByModel(model);
			//childview.$el.removeClass("danger");
			childview.ui.checkbox.prop("checked", false);
			ResourcesApp.selectedCollection.remove(model);
			ResourcesApp.resourceCollectionView.ui.selectStats.text("Selected " + ResourcesApp.selectedCollection.length + " items");
			if (ResourcesApp.resourceCollection.length > ResourcesApp.selectedCollection.length) {
				ResourcesApp.resourceCollectionView.ui.checkboxAll.prop("checked", false);
			}
			ResourcesApp.Controller._showSelectStats();
		},
		selectAll: function() {
			ResourcesApp.resourceCollectionView.ui.checkboxAll.prop("checked", true);
			ResourcesApp.resourceCollection.forEach(function(model){
				if(!model.has("hidden")) {
					Sanato.trigger("resourcesapp:select", model.get("path"));
				}
			});
		},
		unselectAll: function() {
			ResourcesApp.resourceCollectionView.ui.checkboxAll.prop("checked", false);
			ResourcesApp.resourceCollection.forEach(function(model){
				Sanato.trigger("resourcesapp:unselect", model.get("path"));
			});
		},
		_showSelectStats: function() {
			if (ResourcesApp.selectedCollection.length === 0) {
				ResourcesApp.resourceCollectionView.ui.deleteAll.addClass("hidden");
				ResourcesApp.resourceCollectionView.ui.selectStats.text("");
				ResourcesApp.resourceCollectionView.ui.selectStats.addClass("hidden");
				ResourcesApp.resourceCollectionView.ui.resourceName.removeClass("hidden");
				ResourcesApp.resourceCollectionView.ui.tableHeader.removeClass("grey");
			} else {
				ResourcesApp.resourceCollectionView.ui.deleteAll.removeClass("hidden");
				ResourcesApp.resourceCollectionView.ui.selectStats.text("Selected " + ResourcesApp.selectedCollection.length + " items");
				ResourcesApp.resourceCollectionView.ui.selectStats.removeClass("hidden");
				ResourcesApp.resourceCollectionView.ui.resourceName.addClass("hidden");
				ResourcesApp.resourceCollectionView.ui.tableHeader.addClass("grey");
			}
		}
	};

	Sanato.on("resourcesapp:put", function(path, data) {
		return ResourcesApp.Controller.put(path, data);
	});
	Sanato.on("resourcesapp:touch", function(path) {
		return ResourcesApp.Controller.touch(path);
	});
	Sanato.on("resourcesapp:stat", function(path) {
		return ResourcesApp.Controller.stat(path);
	});
	Sanato.on("resourcesapp:download", function(path) {
		return ResourcesApp.Controller.download(path);
	});
	Sanato.on("resourcesapp:remove", function(path) {
		return ResourcesApp.Controller.remove(path);
	});
	Sanato.on("resourcesapp:mkcol", function(path) {
		return ResourcesApp.Controller.mkcol(path);
	});
	Sanato.on("resourcesapp:rename", function(from, to) {
		return ResourcesApp.Controller.rename(from, to);
	});
	Sanato.on("resourcesapp:select", function(path) {
		return ResourcesApp.Controller.select(path);
	});
	Sanato.on("resourcesapp:unselect", function(path) {
		return ResourcesApp.Controller.unselect(path);
	});
	Sanato.on("resourcesapp:selectall", function(path) {
		return ResourcesApp.Controller.selectAll(path);
	});
	Sanato.on("resourcesapp:unselectall", function(path) {
		return ResourcesApp.Controller.unselectAll(path);
	});
	Sanato.on("resourcesapp:filter", function(name) {
		return ResourcesApp.Controller.filter(name);
	});
	Sanato.commands.setHandler("set:resourcesapp:deleteiconloader:show",function(path) {
		var model = ResourcesApp.resourceCollection.get(path);
		var children = ResourcesApp.resourceCollectionView.children;
		var childview = children.findByModel(model);
		var deleteButton = childview.ui.deleteButton
		var deleteButtonLoader = childview.ui.deleteButtonLoader;
		deleteButton.addClass("hidden");
		deleteButtonLoader.removeClass("hidden");		
	});
	Sanato.commands.setHandler("set:resourcesapp:deleteiconloader:hide",function(path) {
		var model = ResourcesApp.resourceCollection.get(path);
		var children = ResourcesApp.resourceCollectionView.children;
		var childview = children.findByModel(model);
		var deleteButton = childview.ui.deleteButton
		var deleteButtonLoader = childview.ui.deleteButtonLoader;
		deleteButton.removeClass("hidden");
		deleteButtonLoader.addClass("hidden");
	});

	ResourcesApp.on("start", function() {
		ResourcesApp.resourceCollection.on("remove", function(model) {
			ResourcesApp.selectedCollection.remove(model);
		});
	});
	
});
