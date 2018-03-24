var RandomDeclutter = RandomDeclutter || {};

(function(window, OC, exports, undefined) {
	'use strict';

	var Manager = function() {
		this.filesClient = OC.Files.getClient();

		this._loadList();
	};

	Manager.prototype = {

		_currentIndex: 0,

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

	exports.manager = new Manager();

})(window, OC, RandomDeclutter);
