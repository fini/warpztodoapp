
var todoAppLibs = todoAppLibs || {};

/* Wrapper for HTML5 sessionStorage */
todoAppLibs.Storage = (function() {

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

// todoAppLibs.Storage.setItem('author', JSON.stringify({name: 'Fini Alring', age: 38}))
// a = todoAppLibs.Storage.getItem('author')
// b = JSON.parse(a);
