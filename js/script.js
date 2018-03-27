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
                _loadPreview: function(index) {
			var self = this;
                        
                        var params = '?fileId='+this._list[index].id+'&x=32&y=32&forceIcon=0';
                        var img = new Image();
			var previewUrl = OC.generateUrl('/core/preview') + params;
                        img.onload = function() {
                            $('.element-preview').attr('style', 'background-image:url(' + previewUrl + ')');
                        }
                        img.src = previewUrl;
		},
                next: function() {
			if (this._currentIndex >= this._list.length) {
				return;
			}
			var index = this._currentIndex++;
                        this._loadPreview(index);
                        return this._list(index);
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
			file: {}
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
			},
			pulse: function() {
				this.addClass('animated pulse');
			}
		}
	});

	manager.load()
	.then(app.next);

})(window, OC, RandomDeclutter);
