var RandomDeclutter = RandomDeclutter || {};

(function(window, OC, exports, undefined) {
	'use strict';

	var Manager = function() {
		this.filesClient = OC.Files.getClient();
		this.previewSize = 500;
	};

	Manager.prototype = {

		_currentIndex: 0,
		_containerBefore: 4,
		_containerCurrent: 1,
		_containerAfter: 2,

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

		nextElement: function() {
			var index = this._currentIndex++;
			this._loadPreview(index);
			return this._list[index];
		},

		keepElement: function() {
			if (this._currentIndex > this._list.length) {
				return;
			}

			this.moveContainer('Right');
		},

		removeElement: function(path) {
			if (this._currentIndex > this._list.length) {
				return;
			}

			this.moveContainer('Left');
			this.filesClient.remove(path);
		},

		moveContainer: function(direction) {
			if(this._currentIndex == 0) {
				return;
			}

			if(this._containerCurrent > 4) {
				this._containerCurrent = 1;
			}
			if(this._containerBefore > 4) {
				this._containerBefore = 1;
			}
			if(this._containerAfter > 4) {
				this._containerAfter = 1;
			}

			// Move card out in specified direction
			$('.element-container-' + this._containerCurrent)
				.removeClass('fadeIn active')
				.addClass('bounceOut' + direction);

			// Card on the bottom of the stack gets cleaned up
			// Emptycontent is shown when stack is over
			if(!(this._currentIndex >= (this._list.length-2))) {
				$('.element-container-' + (this._containerBefore))
					.removeClass('bounceOutRight bounceOutLeft')
					.addClass('fadeIn')
					.attr('style', 'z-index: -' + this._currentIndex);
			}

			// Next card set as active
			$('.element-container-' + (this._containerAfter))
				.addClass('active');

			this._containerCurrent++;
			this._containerBefore++;
			this._containerAfter++;
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
				var file = manager.nextElement();
				if(file) {
					this.file = file;
				}
			},
			keep: function() {
				manager.keepElement();
				this.next();
			},
			remove: function() {
				var path = this.file.path + this.file.name;
				manager.removeElement(path);
				this.next();
			}
		}
	});

	manager.load()
	.then(app.next);

})(window, OC, RandomDeclutter);
