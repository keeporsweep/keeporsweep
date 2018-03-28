var RandomDeclutter = RandomDeclutter || {};

(function(window, OC, exports, undefined) {
	'use strict';

	var Manager = function() {
		this.filesClient = OC.Files.getClient();
                this.previewSize = 500;
	};

	Manager.prototype = {

		_currentIndex: 0,

		load: function() {
			return this._loadList();
		},
		_loadList: function() {
			var self = this;

			var baseUrl = OC.generateUrl('/apps/randomdeclutter');
			return (
				$.getJSON(baseUrl + '/files')
				.then(function(result) {
					self._list = _.shuffle(result);
				})
			);
		},
		_loadPreview: function(index) {
			var self = this;
                        var params = {
                            fileId: self._list[index].id,
                            x: self.previewSize,
                            y: self.previewSize,
                            forceIcon: 0
                        };
			var img = new Image();
			var previewUrl = OC.generateUrl('/core/preview?') + $.param(params);
			img.onload = function() {
                            $('.element-preview').attr('style', 'background-image:url(' + previewUrl + ')');
			};
                        img.onerror = function(){
                            previewUrl = OC.MimeType.getIconUrl(self._list[index].mimetype);
                            $('.element-preview').attr('style', 'background-image:url(' + previewUrl + ')');
                        };
                        img.src = previewUrl;
		},
                next: function() {
			if (this._currentIndex >= this._list.length) {
				return;
			}

			var index = this._currentIndex++;
			this._loadPreview(index);
			return this._list[index];
		},

		removeFile: function(path) {
			this.filesClient.remove(path);
		}
	}

	var manager = new Manager();

	var app = new Vue({
		el: '#randomdeclutter-app',
		container: '#randomdeclutter-app .element-container',
		data: {
			file: {},
			actionKeepHover: false,
			actionRemoveHover: false
		},
		methods: {
			next: function() {
				var file = manager.next();
				if (file) {
					this.file = file;
				}
			},
			remove: function() {
				var path = this.file.path + this.file.name;
				manager.removeFile(path);
				this.next();
			}
		}
	});

	manager.load()
	.then(app.next);

})(window, OC, RandomDeclutter);
