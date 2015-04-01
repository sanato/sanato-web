"use strict"

Sanato.module("ResourcesApp", function(ResourcesApp, Sanato, Backbone, Marionette, $, _) {
	this.startWithParent = false;

	ResourcesApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"resources*path": "stat"
		}
	});

	ResourcesApp.on("start", function() {
		ResourcesApp.currentPath = "/";

		ResourcesApp.layoutView = new ResourcesApp.LayoutView();

		ResourcesApp.selectedCollection = new ResourcesApp.ResourceCollection();

		ResourcesApp.resourceCollection = new ResourcesApp.ResourceCollection();
		
		ResourcesApp.resourceCollectionView = new ResourcesApp.ResourceCollectionView({collection: ResourcesApp.resourceCollection});

		ResourcesApp.breadcrumbCollection = new ResourcesApp.BreadcrumbCollection();
		ResourcesApp.breadcrumbCollectionView = new ResourcesApp.BreadcrumbCollectionView({collection:ResourcesApp.breadcrumbCollection});

		ResourcesApp.panelView = new ResourcesApp.PanelView();

		Sanato.ContainerApp.layoutView.getRegion("app").show(ResourcesApp.layoutView);

		ResourcesApp.layoutView.getRegion("breadcrumb").show(ResourcesApp.breadcrumbCollectionView);
		ResourcesApp.layoutView.getRegion("panel").show(ResourcesApp.panelView);
		ResourcesApp.layoutView.getRegion("grid").show(ResourcesApp.resourceCollectionView);
		//ResourcesApp.layoutView.getRegion("loader").show(new ResourcesApp.LoaderView());



		Sanato.addInitializer(function() {
			new ResourcesApp.Router({
				controller: ResourcesApp.Controller
			});
		});

		Sanato.trigger("resourcesapp:stat", ResourcesApp.currentPath);
	});
});
