/**
 * imger.sj - Class that provides client-side image loading hooks.
 * Author: Dave Z <zimmed@zimmed.io>
 * Original Source: github.com/zimmed/imger
 * License: MIT - Feel free to use in any open-source project, but provide
 *  credit to original author, and link to original source. Thanks :)
 */
(function (window) {
    'use strict';

    window.URL = window.URL || window.webkitURL;

    window.Imger = (function () {
        
        /** Private Datamembers **/
        var _url = '',
            _src = null,
            _error = null,
            _stats = {
                isLoading: false,
                totalSize: 0,
                loadedSize: 0,
                percent: 0
            },
            _eventQueue = {
                handlers: {},
                fire: function (event) {
                    if (this.handlers.hasOwnProperty(event) &&
                        Array.isArray(this.handlers[event])){
                        this.handlers[event][0]();
                    }
                },
                addListener: function (event, func) {
                    var q = this.handlers[event];
                    if (!this.handlers.hasOwnProperty(event)) {
                        q = this.handlers[event] = [];
                    }
                    var next = (q.length) ? q[q.length - 1] : false;
                    this.handlers[event].push(function () {
                        func();
                        if (next) next();
                    });
                }
            },

        /** Private Methods **/
            _getError = function () {
                var e = _error;
                _error = null;
                return e;
            },
            _getEventData = function () {
                var e = _getError();
                return {
                    url: _url,
                    src: _src,
                    isLoading: _stats.isLoading,
                    total: _stats.totalSize,
                    loaded: _stats.loadedSize,
                    error: e
                };
            },
            _loadImg = function (imger) {
                var blob, xhr = new XMLHttpRequest();

                if (!_url) {
                    throw new Error('Unable to load empty url');
                }
                if (_stats.isLoading) {
                    throw new Error('Another load already in progress');
                }

                xhr.open('GET', _url, true);
                xhr.responseType = 'arraybuffer';

                xhr.onloadstart = function () {
                    _stats.loadedSize = 0;
                    _stats.isLoading = true;
                    imger.trigger('start');
                };

                xhr.onload = function () {
                    var t = xhr.getAllResponseHeaders().match(/^Content-Type\:\s*(.*?)$/mi)[1] || 'image/png',
                        blob = new Blob([this.response], {type: t});
                    _src = window.URL.createObjectURL(blob);
                    _stats.isLoading = false;
                    imger.trigger('complete');
                };

                xhr.onerror = function (e) {
                    console.log("Imger.load error: " + e.message);
                    _error = e;
                    imger.trigger('error');
                };

                xhr.onprogress = function (e) {d
                    _stats.loadedSize = e.loaded;
                    _stats.totalSize = e.total;
                    imger.trigger('progress');
                };

                xhr.send();
            };
        
        /** Public Methods **/
        Imger.prototype.constructor = function (url) {
            if (url) this.setUrl(url);
        };
        Imger.prototype.setUrl = function (url) {
            if (this.isLoading()) {
                return new Error('Cannot modify url while load in progress');
            }
            _url = url;
            if (_url) this.trigger('ready');
            return this;
        };
        Imger.prototype.getUrl = function () { return _url; };
        Imger.prototype.load = function () {
            _loadImg(this);
            return this;
        };
        Imger.prototype.isLoading = function () { return _stats.isLoading; }
        Imger.prototype.on = function (eventName, func) {
            var self = this;
            _eventQueue.addListener(eventName, function () {
                func.apply(self, [_getEventData()])
            });
            return this;
        };
        Imger.prototype.off = function (eventName) {
            delete _eventQueue.handlers[eventName];
            return this;
        };
        Imger.prototype.trigger = function (eventName) {
            _eventQueue.fire(eventName);
            return this;
        };
        /* Aliases for adding event listeners */
        Imger.prototype.ready = function (func) {
            return this.on('ready', func);
        };
        Imger.prototype.start = function (func) {
            return this.on('start', func);
        };
        Imger.prototype.progress = function (func) {
            return this.on('progress', func);
        };
        Imger.prototype.complete = function (func) {
            return this.on('complete', func);
        };
        Imger.prototype.error = function (func) {
            return this.on('error', func);
        };
        
        return Imger;
        
        /** Class Definition **/
        /* Note: JS Hoisting allows class to be defined before other
         * declarations/definitions
         */
        function Imger () {
            return this.constructor.apply(this, arguments);
        }
    }());
    
}(window));