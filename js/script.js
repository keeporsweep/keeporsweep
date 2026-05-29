var KeepOrSweep = KeepOrSweep || {};

(function (window, OC, exports, undefined) {
    'use strict';

    var Manager = function () {
        this.filesClient = OC.Files.getClient();

        // IMPORTANT: initialize list
        this._list = [];
    };

    Manager.prototype = {

        _currentIndex: 0,
        _containerBefore: 4,
        _containerCurrent: 1,
        _containerAfter: 2,
        _containerActive: '.active .element-preview',
        _previewSize: 500,

        load: function () {
            return this._loadList();
        },

        _loadList: function () {
            var self = this;

            var baseUrl = OC.generateUrl('/apps/keeporsweep');
            return $.getJSON(baseUrl + '/files')
                .then(function (result) {
                    if (!Array.isArray(result)) {
                        console.error('KeepOrSweep: expected array from /files, got', result);
                        self._list = [];
                        self._currentIndex = 0;
                        return;
                    }

                    // Avoid depending on underscore (_.shuffle)
                    self._list = result.slice().sort(function () {
                        return Math.random() - 0.5;
                    });
                    self._currentIndex = 0;
                })
                .catch(function (err) {
                    console.error('KeepOrSweep: failed to load list', err);
                    self._list = [];
                    self._currentIndex = 0;
                });
        },

        _onPreviewLoad: function (url) {
            $(this._containerActive).attr('style', 'background-image:url("' + url + '")');
        },

        _loadPreview: function (index) {
            var self = this;

            if (!Array.isArray(self._list) || !self._list[index]) {
                return;
            }

            var file = self._list[index];

            var params = {
                file: file.path + file.name,
                fileId: file.id,
                x: this._previewSize,
                y: this._previewSize,
                forceIcon: 0
            };

            // Default icon
            var iconUrl = OC.MimeType.getIconUrl(file.mimetype);
            $(this._containerActive).attr('style', 'background-image:url("' + iconUrl + '")');

            // Try to get the preview if it is an image or a text file
            if (
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/gif' ||
                file.mimetype === 'text/plain'
            ) {
                var previewImg = new Image();
                const previewUrl = OC.generateUrl('/core/preview.png?') + $.param(params);

                previewImg.onload = function () {
                    self._onPreviewLoad(previewUrl);
                };

                previewImg.src = previewUrl;
            }
        },

        nextElement: function () {
            if (!Array.isArray(this._list) || this._list.length === 0) {
                return null;
            }

            if (this._currentIndex >= this._list.length) {
                return null;
            }

            var index = this._currentIndex++;
            this._loadPreview(index);
            return this._list[index];
        },

        keepElement: function () {
            if (!Array.isArray(this._list) || this._currentIndex >= this._list.length) {
                return;
            }

            this.moveContainer('Right');
        },

        sweepElement: function (path) {
            if (!Array.isArray(this._list) || this._currentIndex >= this._list.length) {
                return;
            }

            this.moveContainer('Left');
            this.filesClient.remove(path);
        },

        moveContainer: function (direction) {
            const container = '.element-container-';

            if (!Array.isArray(this._list) || this._list.length === 0) {
                return;
            }

            if (this._currentIndex === 0) {
                return;
            }

            if (this._containerCurrent > 4) {
                this._containerCurrent = 1;
            }
            if (this._containerBefore > 4) {
                this._containerBefore = 1;
            }
            if (this._containerAfter > 4) {
                this._containerAfter = 1;
            }

            // Move card out in specified direction
            $(container + this._containerCurrent)
                .removeClass('fadeIn active')
                .addClass('bounceOut' + direction);

            // Card on the bottom of the stack gets cleaned up
            // Empty content is shown when stack is over
            if (!(this._currentIndex >= (this._list.length - 2))) {
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
    };

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
            next: function () {
                var file = manager.nextElement();
                if (file) {
                    this.file = file;
                }
            },
            keep: function () {
                manager.keepElement();
                this.next();
            },
            sweep: function () {
                var path = this.file.path + this.file.name;
                manager.sweepElement(path);
                this.next();
            },
            // Keyboard shortcuts thanks to https://vuejsdevelopers.com/2017/05/01/vue-js-cant-help-head-body/
            keyListener: function (evt) {
                // Keep: Space, →, Enter
                if (evt.keyCode === 32 || evt.keyCode === 39 || evt.keyCode === 13) {
                    this.keep();
                }
                // Sweep: Delete, ←
                if (evt.keyCode === 46 || evt.keyCode === 37) {
                    this.sweep();
                }
            }
        },
        created: function () {
            document.addEventListener('keyup', this.keyListener);
        },
        destroyed: function () {
            document.removeEventListener('keyup', this.keyListener);
        }
    });

    manager.load().then(app.next);

})(window, OC, KeepOrSweep);
