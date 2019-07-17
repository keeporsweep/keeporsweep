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
			$(this._containerActive).attr('style', 'background-image:url("' + url + '")');
                },
		_loadPreview: function(index) {
			var self = this;
			var params = {
				file: self._list[index].path + self._list[index].name,
				fileId: self._list[index].id,
				x: this._previewSize,
				y: this._previewSize,
				forceIcon: 0
			};

			// Default
			var iconImg = new Image();
			const iconUrl = OC.MimeType.getIconUrl(self._list[index].mimetype);
			iconImg.src = iconUrl;
			$(this._containerActive).attr('style', 'background-image:url("' + iconUrl + '")');

			// Try to get the preview if it is an image or a text file
			if(self._list[index].mimetype == 'image/jpeg' ||
				self._list[index].mimetype == 'image/png' ||
				self._list[index].mimetype == 'image/gif' ||
				self._list[index].mimetype == 'text/plain'){
				var previewImg = new Image();
				const previewUrl = OC.generateUrl('/core/preview.png?') + $.param(params);
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
		el: '#app-content',
		container: '#app-content .element-container',
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
			},
			// Keyboard shortcuts thanks to https://vuejsdevelopers.com/2017/05/01/vue-js-cant-help-head-body/
			keyListener: function(evt) {
				// Keep: Space, →, Enter
				if(evt.keyCode === 32 || evt.keyCode === 39 || evt.keyCode === 13) {
					this.keep();
				}
				// Sweep: Delete, ←
				if(evt.keyCode === 46 || evt.keyCode === 37) {
					this.sweep();
				}
			}
		},
		created: function() {
			document.addEventListener('keyup', this.keyListener);
		},
		destroyed: function() {
			document.removeEventListener('keyup', this.keyListener);
		}
	});

	manager.load()
	.then(app.next);

})(window, OC, KeepOrSweep);
