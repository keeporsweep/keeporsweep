var KeepOrSweep = KeepOrSweep || {};

(function (window, OC, exports, undefined) {
    'use strict';

    var Manager = function () {
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
            return fetch(baseUrl + '/files', {
                credentials: 'same-origin',
                headers: {
                    'requesttoken': OC.requestToken
                }
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Request failed with status ' + response.status);
                    }
                    return response.json();
                })
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
            var el = document.querySelector(this._containerActive);
            if (el) {
                el.setAttribute('style', 'background-image:url("' + url + '")');
            }
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
            var activeEl = document.querySelector(this._containerActive);
            if (activeEl) {
                activeEl.setAttribute('style', 'background-image:url("' + iconUrl + '")');
            }

            // Try to get the preview if it is an image or a text file
            if (
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/gif' ||
                file.mimetype === 'text/plain'
            ) {
                var previewImg = new Image();
                const previewUrl = OC.generateUrl('/core/preview.png?') + new URLSearchParams(params).toString();

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
            this._remove(path);
        },

        // Delete a file via WebDAV. OC.Files.getClient() was removed in recent
        // Nextcloud versions, so we issue the DELETE request directly.
        _remove: function (relPath) {
            var user = (OC.getCurrentUser && OC.getCurrentUser()) || {};
            var uid = user.uid || OC.currentUser;

            if (!uid || !relPath) {
                console.error('KeepOrSweep: cannot delete, missing user or path', uid, relPath);
                return;
            }

            // Build <webroot>/remote.php/dav/files/<uid>/<path>, encoding each
            // path segment while keeping the slashes.
            var normalized = String(relPath);
            if (normalized.charAt(0) !== '/') {
                normalized = '/' + normalized;
            }
            var encodedPath = normalized.split('/').map(encodeURIComponent).join('/');
            var url = OC.getRootPath() + '/remote.php/dav/files/' + encodeURIComponent(uid) + encodedPath;

            return fetch(url, {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: {
                    'requesttoken': OC.requestToken
                }
            }).then(function (response) {
                if (!response.ok) {
                    console.error('KeepOrSweep: failed to delete', relPath, response.status);
                }
                return response;
            }).catch(function (err) {
                console.error('KeepOrSweep: delete request failed', err);
            });
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
            var currentEl = document.querySelector(container + this._containerCurrent);
            if (currentEl) {
                currentEl.classList.remove('fadeIn', 'active');
                currentEl.classList.add('bounceOut' + direction);
            }

            // Card on the bottom of the stack gets cleaned up
            // Empty content is shown when stack is over
            if (!(this._currentIndex >= (this._list.length - 2))) {
                var beforeEl = document.querySelector(container + this._containerBefore);
                if (beforeEl) {
                    beforeEl.classList.remove('bounceOutRight', 'bounceOutLeft');
                    beforeEl.classList.add('fadeIn');
                    beforeEl.setAttribute('style', 'z-index: -' + this._currentIndex);
                }
            }

            // Next card set as active
            var afterEl = document.querySelector(container + this._containerAfter);
            if (afterEl) {
                afterEl.classList.add('active');
            }

            this._containerCurrent++;
            this._containerBefore++;
            this._containerAfter++;
        }
    };

    var manager = new Manager();

    // The four stacked cards all mirror the currently displayed file;
    // the stack animation creates the illusion of separate cards.
    var CARD_SELECTOR = '.element-container-1, .element-container-2, .element-container-3, .element-container-4';
    var currentFile = null;

    function updateCards(file) {
        var cards = document.querySelectorAll(CARD_SELECTOR);
        for (var i = 0; i < cards.length; i++) {
            var nameEl = cards[i].querySelector('.element-name');
            var detailEl = cards[i].querySelector('.element-detail');
            if (nameEl) {
                nameEl.textContent = file.name || '';
            }
            if (detailEl) {
                detailEl.textContent = file.path || '';
            }
        }
    }

    function next() {
        var file = manager.nextElement();
        if (file) {
            currentFile = file;
            updateCards(file);
        }
    }

    function keep() {
        manager.keepElement();
        next();
    }

    function sweep() {
        if (!currentFile) {
            return;
        }
        var path = currentFile.path + currentFile.name;
        manager.sweepElement(path);
        next();
    }

    // Keyboard shortcuts thanks to https://vuejsdevelopers.com/2017/05/01/vue-js-cant-help-head-body/
    function keyListener(evt) {
        // Keep: Space, →, Enter
        if (evt.keyCode === 32 || evt.keyCode === 39 || evt.keyCode === 13) {
            keep();
        }
        // Sweep: Delete, ←
        if (evt.keyCode === 46 || evt.keyCode === 37) {
            sweep();
        }
    }

    // Replay the animate.css hover effect while the pointer is over a button
    function bindHover(button, animationClass) {
        if (!button) {
            return;
        }
        button.addEventListener('mouseover', function () {
            button.classList.add('animated', animationClass);
        });
        button.addEventListener('mouseout', function () {
            button.classList.remove('animated', animationClass);
        });
    }

    function init() {
        var sweepBtn = document.querySelector('.action-sweep');
        var keepBtn = document.querySelector('.action-keep');

        if (sweepBtn) {
            sweepBtn.addEventListener('click', sweep);
        }
        if (keepBtn) {
            keepBtn.addEventListener('click', keep);
        }

        bindHover(sweepBtn, 'tada');
        bindHover(keepBtn, 'pulse');

        document.addEventListener('keyup', keyListener);

        manager.load().then(next);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(window, OC, KeepOrSweep);
