"use strict"

Sanato.module("ResourcesApp", function(ResourcesApp, Sanato, Backbone, Marionette, $, _) {
	ResourcesApp.Controller = {
		stat: function(path) {
			ResourcesApp.selectedCollection.reset();
			ResourcesApp.Controller._showSelectStats();
			ResourcesApp.resourceCollectionView.ui.checkboxAll.prop("checked", false);

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
				ResourcesApp.resourceCollectionView.ui.selectStats.text("Selected " + ResourcesApp.selectedCollection.length + " items");
				if (ResourcesApp.selectedCollection.length === 0) {
					ResourcesApp.resourceCollectionView.ui.selectStats.text("");
					ResourcesApp.resourceCollectionView.ui.selectStats.addClass("hidden");
					ResourcesApp.resourceCollectionView.ui.resourceName.removeClass("hidden");
					ResourcesApp.resourceCollectionView.ui.tableHeader.removeClass("grey");
				}
			});
			$.when(removing).fail(function() {
				console.log("fail remove");
			});
		},
		mkcol: function(path) {
			var mkcoling = Sanato.request("resourcesapp:mkcol", path);
			var view = ResourcesApp.panelView;
			view.ui.newButton.toggleClass("disabled");
			var loader = "<img class='loader' src='assets/img/ajax-loader.gif' />";
			view.$el.append(loader);
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
				view.ui.newButton.toggleClass("disabled");
				view.$el.find(".loader").remove();
			});
		},
		rename: function(from, to) {
			var model = ResourcesApp.resourceCollection.get(from);
			var children = ResourcesApp.resourceCollectionView.children;
			var childview = children.findByModel(model);
			childview.ui.iconButton.addClass("hidden");
			childview.ui.iconLoader.removeClass("hidden");

			var renaming = Sanato.request("resourcesapp:rename", from, to);
			$.when(renaming).done(function() {
				console.log("rename done");
				ResourcesApp.resourceCollection.remove(ResourcesApp.resourceCollection.get(from));
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
		select: function(path) {
			var model = ResourcesApp.resourceCollection.get(path);
			var children = ResourcesApp.resourceCollectionView.children;
			var childview = children.findByModel(model);
			childview.$el.addClass("danger");
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
			childview.$el.removeClass("danger");
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
			ResourcesApp.resourceCollectionView.ui.deleteAll.removeClass("hidden");
			ResourcesApp.resourceCollection.forEach(function(model){
				Sanato.trigger("resourcesapp:select", model.get("path"));
			});
		},
		unselectAll: function() {
			ResourcesApp.resourceCollectionView.ui.checkboxAll.prop("checked", false);
			ResourcesApp.resourceCollectionView.ui.deleteAll.addClass("hidden");
			ResourcesApp.resourceCollection.forEach(function(model){
				Sanato.trigger("resourcesapp:unselect", model.get("path"));
			});
		},
		_showSelectStats: function() {
			if (ResourcesApp.selectedCollection.length === 0) {
				ResourcesApp.resourceCollectionView.ui.selectStats.text("");
				ResourcesApp.resourceCollectionView.ui.selectStats.addClass("hidden");
				ResourcesApp.resourceCollectionView.ui.resourceName.removeClass("hidden");
				ResourcesApp.resourceCollectionView.ui.tableHeader.removeClass("grey");
			} else {
				ResourcesApp.resourceCollectionView.ui.selectStats.text("Selected " + ResourcesApp.selectedCollection.length + " items");
				ResourcesApp.resourceCollectionView.ui.selectStats.removeClass("hidden");
				ResourcesApp.resourceCollectionView.ui.resourceName.addClass("hidden");
				ResourcesApp.resourceCollectionView.ui.tableHeader.addClass("grey");
			}
		}
	};

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

	Sanato.commands.setHandler("set:resourcesapp:deleteiconloader:show",function(path) {
		var model = ResourcesApp.resourceCollection.get(path);
		var children = ResourcesApp.resourceCollectionView.children;
		var childview = children.findByModel(model);
		var deleteButton = childview.ui.deleteButton
		var loader = '<i class="fa fa-spinner fa-spin"></i>';
		var parent = deleteButton.parent();
		deleteButton.hide();
		parent.append(loader);
	});
	Sanato.commands.setHandler("set:resourcesapp:deleteiconloader:hide",function(path) {
		var model = ResourcesApp.resourceCollection.get(path);
		var children = ResourcesApp.resourceCollectionView.children;
		var childview = children.findByModel(model);
		var deleteButton = childview.ui.deleteButton;
		var parent = deleteButton.parent();
		deleteButton.show();
		console.log(parent);
		parent.find("#delete-loading-icon").remove();
	});

	ResourcesApp.on("start", function() {
		ResourcesApp.resourceCollection.on("remove", function(model) {
			ResourcesApp.selectedCollection.remove(model);
		});
	});
	
});
