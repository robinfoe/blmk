(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/script.js                                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
// Scroll to the very bottom to see the stuff we wrote, the big giant blocks are:
// froogaloop                                                          //
// and                                                                 //
// fitvid.js                                                           //
                                                                       //
;(function ($) {                                                       // 6
                                                                       //
    'use strict';                                                      // 8
                                                                       //
    $.fn.fitVids = function (options) {                                // 10
        var settings = {                                               // 11
            customSelector: null,                                      // 12
            ignore: null                                               // 13
        };                                                             //
                                                                       //
        if (!document.getElementById('fit-vids-style')) {              // 16
            // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
            var head = document.head || document.getElementsByTagName('head')[0];
            var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
            var div = document.createElement("div");                   // 20
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
            head.appendChild(div.childNodes[1]);                       // 22
        }                                                              //
                                                                       //
        if (options) {                                                 // 25
            $.extend(settings, options);                               // 26
        }                                                              //
                                                                       //
        return this.each(function () {                                 // 29
            var selectors = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', 'object', 'embed'];
                                                                       //
            if (settings.customSelector) {                             // 39
                selectors.push(settings.customSelector);               // 40
            }                                                          //
                                                                       //
            var ignoreList = '.fitvidsignore';                         // 43
                                                                       //
            if (settings.ignore) {                                     // 45
                ignoreList = ignoreList + ', ' + settings.ignore;      // 46
            }                                                          //
                                                                       //
            var $allVideos = $(this).find(selectors.join(','));        // 49
            $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
            $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.
                                                                       //
            $allVideos.each(function (count) {                         // 53
                var $this = $(this);                                   // 54
                if ($this.parents(ignoreList).length > 0) {            // 55
                    return; // Disable FitVids on this video.          // 56
                }                                                      //
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;                                            // 58
                }                                                      //
                if (!$this.css('height') && !$this.css('width') && (isNaN($this.attr('height')) || isNaN($this.attr('width')))) {
                    $this.attr('height', 9);                           // 61
                    $this.attr('width', 16);                           // 62
                }                                                      //
                var height = this.tagName.toLowerCase() === 'object' || $this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;                      //
                if (!$this.attr('id')) {                               // 67
                    var videoID = 'fitvid' + count;                    // 68
                    $this.attr('id', videoID);                         // 69
                }                                                      //
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', aspectRatio * 100 + '%');
                $this.removeAttr('height').removeAttr('width');        // 72
            });                                                        //
        });                                                            //
    };                                                                 //
    // Works with either jQuery or Zepto                               //
})(window.jQuery || window.Zepto);                                     //
                                                                       //
// Init style shamelessly stolen from jQuery http://jquery.com         //
var Froogaloop = (function () {                                        // 81
    // Define a local copy of Froogaloop                               //
    function Froogaloop(iframe) {                                      // 83
        // The Froogaloop object is actually just the init constructor
        return new Froogaloop.fn.init(iframe);                         // 85
    }                                                                  //
                                                                       //
    var eventCallbacks = {},                                           // 88
        hasWindowEvent = false,                                        //
        isReady = false,                                               //
        slice = Array.prototype.slice,                                 //
        playerDomain = '';                                             //
                                                                       //
    Froogaloop.fn = Froogaloop.prototype = {                           // 94
        element: null,                                                 // 95
                                                                       //
        init: function (iframe) {                                      // 97
            if (typeof iframe === "string") {                          // 98
                iframe = document.getElementById(iframe);              // 99
            }                                                          //
                                                                       //
            this.element = iframe;                                     // 102
            console.log(this.element);                                 // 103
            // Register message event listeners                        //
            playerDomain = getDomainFromUrl(this.element.getAttribute('src'));
                                                                       //
            return this;                                               // 107
        },                                                             //
                                                                       //
        /*                                                             //
         * Calls a function to act upon the player.                    //
         *                                                             //
         * @param {string} method The name of the Javascript API method to call. Eg: 'play'.
         * @param {Array|Function} valueOrCallback params Array of parameters to pass when calling an API method
         *                                or callback function when the method returns a value.
         */                                                            //
        api: function (method, valueOrCallback) {                      // 117
            if (!this.element || !method) {                            // 118
                return false;                                          // 119
            }                                                          //
                                                                       //
            var self = this,                                           // 122
                element = self.element,                                //
                target_id = element.id !== '' ? element.id : null,     //
                params = !isFunction(valueOrCallback) ? valueOrCallback : null,
                callback = isFunction(valueOrCallback) ? valueOrCallback : null;
                                                                       //
            // Store the callback for get functions                    //
            if (callback) {                                            // 129
                storeCallback(method, callback, target_id);            // 130
            }                                                          //
                                                                       //
            postMessage(method, params, element);                      // 133
            return self;                                               // 134
        },                                                             //
                                                                       //
        /*                                                             //
         * Registers an event listener and a callback function that gets called when the event fires.
         *                                                             //
         * @param eventName (String): Name of the event to listen for.
         * @param callback (Function): Function that should be called when the event fires.
         */                                                            //
        addEvent: function (eventName, callback) {                     // 143
            if (!this.element) {                                       // 144
                return false;                                          // 145
            }                                                          //
                                                                       //
            var self = this,                                           // 148
                element = self.element,                                //
                target_id = element.id !== '' ? element.id : null;     //
                                                                       //
            storeCallback(eventName, callback, target_id);             // 153
                                                                       //
            // The ready event is not registered via postMessage. It fires regardless.
            if (eventName != 'ready') {                                // 156
                postMessage('addEventListener', eventName, element);   // 157
            } else if (eventName == 'ready' && isReady) {              //
                callback.call(null, target_id);                        // 160
            }                                                          //
                                                                       //
            return self;                                               // 163
        },                                                             //
                                                                       //
        /*                                                             //
         * Unregisters an event listener that gets called when the event fires.
         *                                                             //
         * @param eventName (String): Name of the event to stop listening for.
         */                                                            //
        removeEvent: function (eventName) {                            // 171
            if (!this.element) {                                       // 172
                return false;                                          // 173
            }                                                          //
                                                                       //
            var self = this,                                           // 176
                element = self.element,                                //
                target_id = element.id !== '' ? element.id : null,     //
                removed = removeCallback(eventName, target_id);        //
                                                                       //
            // The ready event is not registered                       //
            if (eventName != 'ready' && removed) {                     // 182
                postMessage('removeEventListener', eventName, element);
            }                                                          //
        }                                                              //
    };                                                                 //
                                                                       //
    /**                                                                //
     * Handles posting a message to the parent window.                 //
     *                                                                 //
     * @param method (String): name of the method to call inside the player. For api calls
     * this is the name of the api method (api_play or api_pause) while for events this method
     * is api_addEventListener.                                        //
     * @param params (Object or Array): List of parameters to submit to the method. Can be either
     * a single param or an array list of parameters.                  //
     * @param target (HTMLElement): Target iframe to post the message to.
     */                                                                //
    function postMessage(method, params, target) {                     // 198
        if (!target.contentWindow.postMessage) {                       // 199
            return false;                                              // 200
        }                                                              //
                                                                       //
        var url = target.getAttribute('src').split('?')[0],            // 203
            data = JSON.stringify({                                    //
            method: method,                                            // 205
            value: params                                              // 206
        });                                                            //
                                                                       //
        if (url.substr(0, 2) === '//') {                               // 209
            url = window.location.protocol + url;                      // 210
        }                                                              //
                                                                       //
        target.contentWindow.postMessage(data, url);                   // 213
    }                                                                  //
                                                                       //
    /**                                                                //
     * Event that fires whenever the window receives a message from its parent
     * via window.postMessage.                                         //
     */                                                                //
    function onMessageReceived(event) {                                // 220
        var data, method;                                              // 221
                                                                       //
        try {                                                          // 223
            data = JSON.parse(event.data);                             // 224
            method = data.event || data.method;                        // 225
        } catch (e) {                                                  //
            //fail silently... like a ninja!                           //
        }                                                              //
                                                                       //
        if (method == 'ready' && !isReady) {                           // 231
            isReady = true;                                            // 232
        }                                                              //
                                                                       //
        // Handles messages from moogaloop only                        //
        if (event.origin != playerDomain) {                            // 236
            return false;                                              // 237
        }                                                              //
                                                                       //
        var value = data.value,                                        // 240
            eventData = data.data,                                     //
            target_id = target_id === '' ? null : data.player_id,      //
            callback = getCallback(method, target_id),                 //
            params = [];                                               //
                                                                       //
        if (!callback) {                                               // 247
            return false;                                              // 248
        }                                                              //
                                                                       //
        if (value !== undefined) {                                     // 251
            params.push(value);                                        // 252
        }                                                              //
                                                                       //
        if (eventData) {                                               // 255
            params.push(eventData);                                    // 256
        }                                                              //
                                                                       //
        if (target_id) {                                               // 259
            params.push(target_id);                                    // 260
        }                                                              //
                                                                       //
        return params.length > 0 ? callback.apply(null, params) : callback.call();
    }                                                                  //
                                                                       //
    /**                                                                //
     * Stores submitted callbacks for each iframe being tracked and each
     * event for that iframe.                                          //
     *                                                                 //
     * @param eventName (String): Name of the event. Eg. api_onPlay    //
     * @param callback (Function): Function that should get executed when the
     * event is fired.                                                 //
     * @param target_id (String) [Optional]: If handling more than one iframe then
     * it stores the different callbacks for different iframes based on the iframe's
     * id.                                                             //
     */                                                                //
    function storeCallback(eventName, callback, target_id) {           // 278
        if (target_id) {                                               // 279
            if (!eventCallbacks[target_id]) {                          // 280
                eventCallbacks[target_id] = {};                        // 281
            }                                                          //
            eventCallbacks[target_id][eventName] = callback;           // 283
        } else {                                                       //
            eventCallbacks[eventName] = callback;                      // 286
        }                                                              //
    }                                                                  //
                                                                       //
    /**                                                                //
     * Retrieves stored callbacks.                                     //
     */                                                                //
    function getCallback(eventName, target_id) {                       // 293
        if (target_id) {                                               // 294
            return eventCallbacks[target_id][eventName];               // 295
        } else {                                                       //
            return eventCallbacks[eventName];                          // 298
        }                                                              //
    }                                                                  //
                                                                       //
    function removeCallback(eventName, target_id) {                    // 302
        if (target_id && eventCallbacks[target_id]) {                  // 303
            if (!eventCallbacks[target_id][eventName]) {               // 304
                return false;                                          // 305
            }                                                          //
            eventCallbacks[target_id][eventName] = null;               // 307
        } else {                                                       //
            if (!eventCallbacks[eventName]) {                          // 310
                return false;                                          // 311
            }                                                          //
            eventCallbacks[eventName] = null;                          // 313
        }                                                              //
                                                                       //
        return true;                                                   // 316
    }                                                                  //
                                                                       //
    /**                                                                //
     * Returns a domain's root domain.                                 //
     * Eg. returns http://vimeo.com when http://vimeo.com/channels is sbumitted
     *                                                                 //
     * @param url (String): Url to test against.                       //
     * @return url (String): Root domain of submitted url              //
     */                                                                //
    function getDomainFromUrl(url) {                                   // 326
        if (url.substr(0, 2) === '//') {                               // 327
            url = window.location.protocol + url;                      // 328
        }                                                              //
                                                                       //
        var url_pieces = url.split('/'),                               // 331
            domain_str = '';                                           //
                                                                       //
        for (var i = 0, length = url_pieces.length; i < length; i++) {
            if (i < 3) {                                               // 335
                domain_str += url_pieces[i];                           // 335
            } else {                                                   //
                break;                                                 // 336
            }                                                          //
            if (i < 2) {                                               // 337
                domain_str += '/';                                     // 337
            }                                                          //
        }                                                              //
                                                                       //
        return domain_str;                                             // 340
    }                                                                  //
                                                                       //
    function isFunction(obj) {                                         // 343
        return !!(obj && obj.constructor && obj.call && obj.apply);    // 344
    }                                                                  //
                                                                       //
    function isArray(obj) {                                            // 347
        return toString.call(obj) === '[object Array]';                // 348
    }                                                                  //
                                                                       //
    // Give the init function the Froogaloop prototype for later instantiation
    Froogaloop.fn.init.prototype = Froogaloop.fn;                      // 352
                                                                       //
    // Listens for the message event.                                  //
    // W3C                                                             //
    if (window.addEventListener) {                                     // 356
        window.addEventListener('message', onMessageReceived, false);  // 357
    }                                                                  //
    // IE                                                              //
    else {                                                             //
            window.attachEvent('onmessage', onMessageReceived);        // 361
        }                                                              //
                                                                       //
    // Expose froogaloop to the global object                          //
    return window.Froogaloop = window.$f = Froogaloop;                 // 365
})();                                                                  //
/////////////////////////////////////////////////////////////////////////

}).call(this);
