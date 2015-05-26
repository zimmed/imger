/**
 * imger.sj - jQuery extension that provides client-side image loading hooks.
 * Author: Dave Z <zimmed@zimmed.io>
 * Original Source: github.com/zimmed/imger
 * License: MIT - Feel free to use in any open-source project, but provide
 *  credit to original author, and link to original source. Thanks :)
 */
(function ($) {
    'use strict';
    
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
        function Imager () {
            return this.constructor(arguments);
        };
    }();
    
}(jQuery));