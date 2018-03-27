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

			var baseUrl = OC.generateUrl('/apps/randomdeclutter');
			return (
				$.getJSON(baseUrl + '/files')
				.then(function(result) {
					self._list = _.shuffle(result);                                        
				})
			);
		},
                _loadPreview: function(path) {
			var self = this;

			var previewUrl = OC.generateUrl('/core/preview.png?') + path;
			return (
				$.getJSON(previewUrl)
				.then(function(result) {
					return result;                                        
				})
			);
		},
		next: function() {
			if (this._currentIndex >= this._list.length) {
				return;
			}

			return this._list[this._currentIndex++];
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
			preview: function() {
                                    var file = manager.next();                                
                                    manager._loadPreview(file.path).then(
                                        this.
                                        this.file = file;
                                    )                                    
				}				
			},                    
			next: function() {
				var file = manager.next();                                
				if (file) {
                                        file.preview = manager._loadPreview(file.path);                                   
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
	.then(app.preview);

})(window, OC, RandomDeclutter);
