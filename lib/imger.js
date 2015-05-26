/**
 * imger.sj - jQuery extension that provides client-side image loading hooks.
 * Requires: jQuery library
 * Author: Dave Z <zimmed@zimmed.io>
 * Original Source: github.com/zimmed/imger
 * License: MIT - Feel free to use in any open-source project, but provide
 *  credit to original author, and link to original source. Thanks :)
 */
(function ($) {
    'use strict';

    if (typeof($) === 'undefined') {
        throw new Error('imger.js could not locate the jQuery library. ' +
            'Make sure jQuery is included.');
    }
    
    $.Imger = (function () {
        
        /** Private Datamembers **/
        var _url = '',
            _el = $('<img>'),
            
        /** Private Methods **/
            _ = function () {};
        
        /** Public Datamembers **/
        Imger.prototype.value = '';
        
        /** Public Methods **/
        Imger.prototype.constructor = function (url) {
            if (url) this.setUrl(url);
        };
        Imger.prototype.setUrl = function (url) {
            _url = url;
        };
        
        return Imger;
        
        /** Class Definition **/
        /* Note: JS Hoisting allows class to be defined before other
         * declarations/definitions
         */
        function Imger () {
            return this.constructor(arguments);
        }
    }());
    
}(jQuery));