
var app = app || {};

/* Wrapper for HTML5 sessionStorage */
app.Storage = (function() {

    return {

        setItem: function(key, value) {

            sessionStorage.setItem(key, value);
        },

        removeItem: function(key) {

            sessionStorage.removeItem(key);
        },

        getItem: function(key) {

            return sessionStorage.getItem(key);
        }
    };
})();
