
var todoAppLibs = todoAppLibs || {};

/* Wrapper for HTML5 localStorage, that fallbacks to sessionStorage, in future set as an option */
todoAppLibs.Storage = (function() {

    "use strict";

    var storage = localStorage || sessionStorage;

    var publicAPI = {

        setItem: function(key, value) {

            storage.setItem(key, value);
        },

        removeItem: function(key) {

            storage.removeItem(key);
        },

        getItem: function(key) {

            return storage.getItem(key);
        },

        clear: function() {

            storage.clear();
        }
    };

    return publicAPI;
})();
