var KeepOrSweep = KeepOrSweep || {};

(function(window, OC, exports, undefined) {
	'use strict';

	var Manager = function() {
		this.filesClient = OC.Files.getClient();
	};

	Manager.prototype = {

		_currentIndex: 0,
		_containerBefore: 4,
		_containerCurrent: 1,
		_containerAfter: 2,
		_containerActive: '.active .element-preview',
		_previewSize: 500,

		load: function() {
			return this._loadList();
		},
		_loadList: function() {
			var self = this;

			var baseUrl = OC.generateUrl('/apps/keeporsweep');
			return (
				$.getJSON(baseUrl + '/files')
				.then(function(result) {
					self._list = _.shuffle(result);
				})
			);
		},
                _onPreviewLoad: function(url){
			$(this._containerActive).attr('style', 'background-image:url(' + url + ')');
                },
		_loadPreview: function(index) {
			var self = this;
			var params = {
				fileId: self._list[index].id,
				x: this._previewSize,
				y: this._previewSize,
				forceIcon: 0
			};

			// Default
			var iconImg = new Image();
			const iconUrl = OC.MimeType.getIconUrl(self._list[index].mimetype);
			iconImg.src = iconUrl;
			$(this._containerActive).attr('style', 'background-image:url(' + iconUrl + ')');

			// Try to get the preview if it is an image or a text file
			if(self._list[index].mimetype == 'image/jpeg' ||
				self._list[index].mimetype == 'image/png' ||
				self._list[index].mimetype == 'image/gif' ||
				self._list[index].mimetype == 'text/plain'){
				var previewImg = new Image();
				const previewUrl = OC.generateUrl('/core/preview?') + $.param(params);
				previewImg.onload = self._onPreviewLoad(previewUrl);
				previewImg.src = previewUrl;
			}
		},

		nextElement: function() {
			var index = this._currentIndex++;
			if(this._list[index]) this._loadPreview(index);
			return this._list[index];
		},

		keepElement: function() {
			if (this._currentIndex > this._list.length) {
				return;
			}

			this.moveContainer('Right');
		},

		sweepElement: function(path) {
			if (this._currentIndex > this._list.length) {
				return;
			}

			this.moveContainer('Left');
			this.filesClient.remove(path);
		},

		moveContainer: function(direction) {
			const container = '.element-container-';

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
			$(container + this._containerCurrent)
				.removeClass('fadeIn active')
				.addClass('bounceOut' + direction);

			// Card on the bottom of the stack gets cleaned up
			// Emptycontent is shown when stack is over
			if(!(this._currentIndex >= (this._list.length-2))) {
				$(container + (this._containerBefore))
					.removeClass('bounceOutRight bounceOutLeft')
					.addClass('fadeIn')
					.attr('style', 'z-index: -' + this._currentIndex);
			}

			// Next card set as active
			$(container + (this._containerAfter))
				.addClass('active');

			this._containerCurrent++;
			this._containerBefore++;
			this._containerAfter++;
		}
	}

	var manager = new Manager();

	var app = new Vue({
		el: '#keeporsweep-app',
		container: '#keeporsweep-app .element-container',
		data: {
			file: {},
			actionKeepHover: false,
			actionSweepHover: false
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
			sweep: function() {
				var path = this.file.path + this.file.name;
				manager.sweepElement(path);
				this.next();
			}
		}
	});

	manager.load()
	.then(app.next);

})(window, OC, KeepOrSweep);
