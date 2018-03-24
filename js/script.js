var RandomDeclutter = RandomDeclutter || {};

(function(window, OC, exports, undefined) {
	'use strict';

	var Manager = function() {
		this.filesClient = OC.Files.getClient();
	};

	Manager.prototype = {

		_currentIndex: 0,

		load: function() {
			return this._loadList();
		},

		_loadList: function() {
			var self = this;

			return (
				this.filesClient.getFolderContents('/Photos')
				.then(function(status, result) {
					self._list = _.shuffle(result);
				})
			);
		},

		next: function() {
			if (this._currentIndex >= this._list.length) {
				return;
			}

			return this._list[this._currentIndex++];
		}

	}

	var manager = new Manager();

	var app = new Vue({
		el: '#randomdeclutter-app',
		data: {
			file: {}
		},
		methods: {
			next: function() {
				var file = manager.next();
				if (file) {
					this.file = file;
				}
			}
		}
	});

	manager.load()
	.then(app.next);

})(window, OC, RandomDeclutter);
