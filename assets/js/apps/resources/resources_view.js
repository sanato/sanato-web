"use strict"

Sanato.module("ResourcesApp", function(ResourcesApp, Sanato, Backbone, Marionette, $, _) {
	ResourcesApp.LayoutView = Marionette.LayoutView.extend({
		tagName: "div",
		className: "container",
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
		attributes: function() {
			return {
				"data-id": this.model.get("id"),
				"data-path": this.model.get("path"),
				"data-mimeType": this.model.get("mimeType"),
				"data-type": this.model.get("isCol") ? "folder" : "file",
				"data-icon": Sanato.request("resourcesapp:geticon", this.model)
			}
		},
		
		ui: {
			resourceName: ".resource-name",
			renameInput: ".js-rename",
			deleteButton: ".js-delete",
			deleteButtonLoader: ".delete-loader",
			renameButton: ".js-rename",
			showButton: ".js-show",
			downloadButton: ".js-download",
			versionsButton: ".js-versions",
			iconButton: ".js-resource",
			iconFileButton: ".js-resource-file",
			iconFolderButton: ".js-resource-col",
			pathButton: ".js-clipboard",
			checkbox: ".js-select",
			iconLoader: ".loader"
		},

		events: {
			"dblclick @ui.resourceName": "showRenameInput",
			"blur @ui.renameInput": "hideRenameInput",
			"keyup @ui.renameInput": "hideRenameInputKeyup",
			//"mouseenter": "showActions",
			//"mouseleave": "hideActions",
			"click @ui.deleteButton": "onDeleteButtonClick",
			"click @ui.showButton": "onShowButtonClick",
			"click @ui.downloadButton": "onDownloadButtonClick",
			"click @ui.iconButton": "onIconButtonClick",
			"click @ui.checkbox": "onCheckboxClick"
			
		},
		showRenameInput: function(e) {
			this.ui.resourceName.addClass("hidden");
			this.ui.renameInput.removeClass("hidden").focus().select();
		},
		hideRenameInput: function(e) {
			e.preventDefault();
			var newName = this.ui.renameInput.val();
			var newPath = this.model.get("path").replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '') + "/" + newName;
			this.ui.resourceName.removeClass("hidden");
			this.ui.renameInput.addClass("hidden");
			if(newPath === this.model.get("path")) {
				return
			}
			Sanato.trigger("resourcesapp:rename", this.model.get("path"), newPath);	
		},
		hideRenameInputKeyup: function(e) {
			e.preventDefault();
			if(e.keyCode === 13) {
				this.ui.resourceName.removeClass("hidden");

				// hidding the element trigger the lose of blur/focusout
				// so we don´t need to duplciate code
				this.ui.renameInput.addClass("hidden");
			}
		},
		templateHelpers: function() {
			var self = this;
			return {
				getIcon: function() {
					return Sanato.request("resourcesapp:geticon", self.model)
				},
				iconType: function() {
					if(self.model.isCol) {
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
					if(this.isCol) {
						return "";
					}
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
			}
		},
		
		/*remove: function() {
			var self = this;
			this.$el.fadeOut(function() {
				Marionette.ItemView.prototype.remove.call(self);
			});
			
		},
		*/
		showActions: function(e) {
			this.$el.addClass("warning");
			this.ui.deleteButton.removeClass("hidden");
			if (!this.model.get("isCol")) {
				this.ui.versionsButton.removeClass("hidden");
				this.ui.downloadButton.removeClass("hidden");
				//this.ui.showButton.removeClass("hidden");
			}
		},
		hideActions: function(e) {
			this.$el.removeClass("warning");
			this.ui.deleteButton.addClass("hidden");
			if (!this.model.get("isCol")) {
				this.ui.versionsButton.addClass("hidden");
				this.ui.downloadButton.addClass("hidden");
				//this.ui.showButton.addClass("hidden");
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
			console.log(this.ui.checkbox.prop("checked"));
			if (!this.ui.checkbox.prop("checked")) {
				Sanato.trigger("resourcesapp:unselect", this.model.get("path"));	
			} else {
				Sanato.trigger("resourcesapp:select", this.model.get("path"));	
			}
		},

		onRender: function(view) {
			view.ui.iconButton.draggable({
				cursorAt: {
					top: 0,
					left: 0
				},
				opacity: 0.50,
				helper: function() {
					if (ResourcesApp.selectedCollection.length === 0) {
						var icon = view.$el.attr("data-icon");
						var el = '<div><i class="fa '+icon+'"></i> '+ view.model.get("path").split("/").pop() + "</p><span class='hidden'>" + view.model.get("path") + "</span></div>";
						return el;
					} else {
						var el = "<div>";
						ResourcesApp.selectedCollection.forEach(function(model) {
							var v = ResourcesApp.resourceCollectionView.children.findByModel(model);
							var icon = v.$el.attr("data-icon");
							var tmp = '<i class="fa '+icon+'"></i> ' + v.model.get("path").split("/").pop() + "</p><span class='hidden'>" + v.model.get("path") + "</span>";
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
						view.$el.removeClass("info");
					},
					over: function(e, ui) {
						view.$el.addClass("info");
					},
					out: function(e, ui) {
						view.$el.removeClass("info");
					}
				});
			}
		},
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
			e.preventDefault();
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
			"newResourceLabel": "#new-resource-label",
			"uploadButton": ".js-upload",
			"uploadInput": "#upload-input",
			"uploadLabel": "#upload-label",
			"searchInput": "#search-input",
			"searchButton": "#search-button"
		},
		events: {
			"click @ui.newButton": "onNewButtonClick",
			"click @ui.newFolderButton": "onNewFolderButtonClick",
			"keyup @ui.newFolderInput": "onNewFolderInputKeyup",
			"click @ui.newFileButton": "onNewFileButtonClick",
			"keyup @ui.newFileInput": "onNewFileInputKeyup",
			"click @ui.uploadButton": "onUploadButtonClick",
			"change @ui.uploadInput": "onUploadInputChange",
			"click @ui.searchButton": "onSearchButtonClick",
			"keyup @ui.searchInput": "onSearchInputKeyup"
		},
		onSearchInputKeyup: function(e) {
			console.log(e);
			var name = $(e.target).val();
			Sanato.trigger("resourcesapp:filter", name);
		},
		onSearchButtonClick: function(e) {
			var name = this.ui.searchInput.val();
			Sanato.trigger("resourcesapp:filter", name);
		},
		onUploadInputChange: function(e) {
			//var uploadQueue = [];
			//for(var i = 0; i < e.target.files.length; i++) {
				//var file = e.target.files.item(i);
				//Sanato.trigger("resourcesapp:put", ResourcesApp.currentPath + "/" + file.name, file);
				Sanato.trigger("resourcesapp:put", e.target.files);
			//}
		},
		onUploadButtonClick: function(e) {
			this.ui.uploadInput.click();
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
			var self = this;
			e.preventDefault();
			if (e.keyCode === 13) {
				var path = ResourcesApp.currentPath === "/" ?  self.ui.newFileInput.val(): ResourcesApp.currentPath + "/" + self.ui.newFileInput.val()
				Sanato.trigger("resourcesapp:touch", path);
				self.ui.newFileInputGroup.addClass("hidden");
				self.ui.newFileInput.val("");
			} else if (e.keyCode === 27) {
				this.ui.newFileInputGroup.toggleClass("hidden");
				this.ui.newFileInput.val("");
			}
		}
	});

	ResourcesApp.LoaderView = Marionette.ItemView.extend({
		template: "#resources-app-loader-template",
		tagName: "div",
		className: "centered"
	});
});
