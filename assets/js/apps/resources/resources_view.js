"use strict"

Sanato.module("ResourcesApp", function(ResourcesApp, Sanato, Backbone, Marionette, $, _) {
	ResourcesApp.LayoutView = Marionette.LayoutView.extend({
		template: "#resources-app-template",
		regions: {
			breadcrumb: "#breadcrumb",
			panel: "#panel",
			grid: "#grid",
			loader: "#loader"
		}
	});

	ResourcesApp.ResourceView = Marionette.ItemView.extend({
		template: "#resources-app-resource-template",
		tagName: "tr",
		onRender: function(view) {
			view.ui.iconButton.draggable({
				cursorAt: {
					top: 0,
					left: 0
				},
				opacity: 0.50,
				helper: function() {
					if (ResourcesApp.selectedCollection.length === 0) {
						var src = view.$el.find(".mime-icon").attr("src");
						var el = "<div><img src=" + src + " height='50px' width='50px'/><p>" + view.model.get("path").split("/").pop() + "</p><span class='hidden'>" + view.model.get("path") + "</span></div>";
						return el;
					} else {
						var el = "<div>";
						ResourcesApp.selectedCollection.forEach(function(model) {
							var v = ResourcesApp.resourceCollectionView.children.findByModel(model);
							var src = v.$el.find(".mime-icon").attr("src");
							var tmp = "<img src=" + src + " height='50px' width='50px'/><p>" + v.model.get("path").split("/").pop() + "</p><span class='hidden'>" + v.model.get("path") + "</span>";
							el += tmp
						});
						el += "</div>";
						return el;
					}

				},
				revert: function(dropped) {
					if(dropped) {
						return false;
					} else {
						return true;
					}
				}
			});
			if(view.model.get("isCol")) { // only folders are droppable
				view.$el.droppable({
					tolerance: "pointer",
					drop: function(e, ui) {
						if(ResourcesApp.selectedCollection.length === 0) {
							var el = $(ui.helper);
							var from = el.find("span").text();
							if (from !== view.model.get("path")){
								var el = $(ui.helper);
								var from = el.find("span").text();
								Sanato.trigger("resourcesapp:rename", from, view.model.get("path") + "/" +  from.split("/").pop());
								//view.$el.removeClass("info");
							}
						} else {
							ResourcesApp.selectedCollection.forEach(function(model) {
								if (model.get("path") !== view.model.get("path")) {
									Sanato.trigger("resourcesapp:rename", model.get("path"), view.model.get("path") + "/" +  model.get("path").split("/").pop());
								} else {
									Sanato.trigger("unselect", model.get("path"));
								}
							});
						}
					},
					over: function(e, ui) {
						//view.$el.addClass("info");
					},
					out: function(e, ui) {
						//view.$el.removeClass("info");
					}
				});
			}
		},
		ui: {
			deleteButton: "span.js-delete",
			renameButton: "span.js-rename",
			showButton: "span.js-show",
			downloadButton: "span.js-download",
			versionsButton: "span.js-versions",
			iconButton: "img.mime-icon",
			iconFileButton: "img.mime-icon-file",
			iconFolderButton: "img.mime-icon-folder",
			pathButton: ".js-clipboard",
			checkbox: ".js-select",
			iconLoader: ".loader"
		},

		events: {
			"mouseenter": "highlight",
			"mouseleave": "highlight",
			"click @ui.deleteButton": "onDeleteButtonClick",
			"click @ui.showButton": "onShowButtonClick",
			"click @ui.downloadButton": "onDownloadButtonClick",
			"click @ui.iconButton": "onIconButtonClick",
			"click @ui.checkbox": "onCheckboxClick"
			
		},
		templateHelpers: {
			getIcon: function() {
				var icon = "";
				if (this.isCol) {
					icon = "assets/img/folder.png";
				} else {
					if (this.mimeType === "application/pdf") {
						icon = "assets/img/pdf.png";
					} else if (this.mimeType === "text/plain") {
						icon = "assets/img/file.png";
					} else if (this.mimeType === "image/png" || this.mimeType === "image/jpeg") {
						icon = "assets/img/image.png";						
					} else {
						icon = "assets/img/octet-stream.png";
					}
				}
				return icon;
			},
			iconType: function() {
				if(this.isCol) {
					return "folder";
				} else {
					return "file";
				}
			},
			basePath: function(path) {
				return path.split("/").pop();
			},
			timeSince: function(date) {
				date = date * 1000;
			    var seconds = Math.floor((new Date() - date) / 1000);
			    var interval = Math.floor(seconds / 31536000);

			    if (interval > 1) {
			        return interval + " years ago";
			    }
			    interval = Math.floor(seconds / 2592000);
			    if (interval > 1) {
			        return interval + " months ago";
			    }
			    interval = Math.floor(seconds / 86400);
			    if (interval > 1) {
			        return interval + " days ago";
			    }
			    interval = Math.floor(seconds / 3600);
			    if (interval > 1) {
			        return interval + " hours ago";
			    }
			    interval = Math.floor(seconds / 60);
			    if (interval > 1) {
			        return interval + " minutes ago";
			    }
			    return Math.floor(seconds) + " seconds ago";
			},

			humanFileSize: function(bytes, si) {
			    var thresh = si ? 1000 : 1024;
			    if(bytes < thresh) return bytes + ' B';
			    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
			    var u = -1;
			    do {
			        bytes /= thresh;
			        ++u;
			    } while(bytes >= thresh);
			    return bytes.toFixed(1)+' '+units[u];
			}
		},
		
		/*remove: function() {
			var self = this;
			this.$el.fadeOut(function() {
				Marionette.ItemView.prototype.remove.call(self);
			});
			
		},
		*/
		highlight: function(e) {
			console.log(e.target);
			this.$el.toggleClass("info");
			this.ui.deleteButton.toggleClass("hidden");
			if (!this.model.get("isCol")) {
				this.ui.versionsButton.toggleClass("hidden");
				this.ui.downloadButton.toggleClass("hidden");
				this.ui.showButton.toggleClass("hidden");
			}
		},

		onDeleteButtonClick: function(e) {
			e.preventDefault();
			Sanato.trigger("resourcesapp:remove", this.model.get("path"));
		},
		

		onDownloadButtonClick: function(e) {
			e.preventDefault();
			Sanato.trigger("resourcesapp:download", this.model.get("path"));
		},

		onIconButtonClick: function(e) {
			e.preventDefault();
			if (this.model.get("isCol")) {
				Sanato.trigger("resourcesapp:stat", this.model.get("path"));
			} else {
				Sanato.trigger("resourcesapp:download", this.model.get("path"));
			}
		},
		onCheckboxClick: function(e) {
			if (this.$el.hasClass("danger")) {
				Sanato.trigger("resourcesapp:unselect", this.model.get("path"));	
			} else {
				Sanato.trigger("resourcesapp:select", this.model.get("path"));	
			}
		}
	});

	ResourcesApp.ResourceCollectionView = Marionette.CompositeView.extend({
		template: "#resources-app-resource-collection-template",
		tagName: "div",
		childViewContainer: "tbody",
		childView: ResourcesApp.ResourceView,
		ui: {
			checkboxAll: ".js-select-all",
			deleteAll: ".js-delete-all",
			selectStats: "#select-stats",
			resourceName: "#resource-name",
			tableHeader: "#table-header"
		},
		events: {
			"click @ui.checkboxAll": "onCheckboxAllClick",
			"click @ui.deleteAll": "onDeleteAllClick"
		},
		onCheckboxAllClick: function(e) {
			if(!this.ui.checkboxAll.is(":checked")) {
				Sanato.trigger("resourcesapp:unselectall");
			} else {
				Sanato.trigger("resourcesapp:selectall");
			}
		},
		onDeleteAllClick: function(e) {
			ResourcesApp.resourceCollectionView.ui.checkboxAll.prop("checked", false);
			ResourcesApp.selectedCollection.forEach(function(model) {
				Sanato.trigger("resourcesapp:remove", model.get("path"));
			});
		},
		onAdd: function(model) {

		}
	});

	ResourcesApp.BreadcrumbView = Marionette.ItemView.extend({
		template: "#resources-app-breadcrumb-template",
		tagName: "li",
		events: {
			"click": "onClick"
		},
		onClick: function(e) {
			e.preventDefault();
			var path = this.model.get("path");
			Sanato.trigger("resourcesapp:stat", path);
		}
	});

	ResourcesApp.BreadcrumbCollectionView = Marionette.CollectionView.extend({
		tagName: "ol",
		className: "breadcrumb",
		childView: ResourcesApp.BreadcrumbView
	});

	ResourcesApp.PanelView = Marionette.ItemView.extend({
		template: "#resources-app-panel-template",
		tagName: "div",
		ui: {
			"newButton": "#new-button",
			"newFolderButton": "#new-folder",
			"newFileButton": "#new-file",
			"newFileInputGroup": "#new-file-input-group",
			"newFolderInputGroup": "#new-folder-input-group",
			"newFolderInput": "#new-folder-input",
			"newFileInput": "#new-file-input",
		},
		events: {
			"click @ui.newButton": "onNewButtonClick",
			"click @ui.newFolderButton": "onNewFolderButtonClick",
			"keyup @ui.newFolderInput": "onNewFolderInputKeyup",
			"click @ui.newFileButton": "onNewFileButtonClick",
			"keyup @ui.newFileInput": "onNewFileInputKeyup"
		},

		onNewButtonClick: function(e) {
			e.preventDefault();
			this.ui.newFolderInputGroup.addClass("hidden");
			this.ui.newFolderInput.val("");
			this.ui.newFileInputGroup.addClass("hidden");
			this.ui.newFileInput.val("");
		},
		onNewFolderButtonClick: function(e) {
			e.preventDefault();
			this.ui.newFolderInputGroup.toggleClass("hidden");
			this.ui.newFolderInput.focus();
		},
		onNewFolderInputKeyup: function(e) {
			var self = this;
			e.preventDefault();
			if (e.keyCode === 13) {
				var path = ResourcesApp.currentPath === "/" ?  self.ui.newFolderInput.val(): ResourcesApp.currentPath + "/" + self.ui.newFolderInput.val()
				Sanato.trigger("resourcesapp:mkcol", path);
				self.ui.newFolderInputGroup.addClass("hidden");
				self.ui.newFolderInput.val("");
			} else if (e.keyCode === 27) {
				this.ui.newFolderInputGroup.toggleClass("hidden");
				this.ui.newFolderInput.val("");
			}
		},
		onNewFileButtonClick: function(e) {
			e.preventDefault();
			this.ui.newFileInputGroup.toggleClass("hidden");
			this.ui.newFileInput.focus();
		},
		onNewFileInputKeyup: function(e) {
			if (e.keyCode === 13) {
				alert("folder created");
			} else if (e.keyCode === 27) {
				this.ui.newFileInputGroup.toggleClass("hidden");
				this.ui.newFileInput.val("");
			}
		}
	});
});
