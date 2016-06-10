(function(scope) {

    function addTask(title) {
        alert(title);
        return 666;
    }

    var todoApp = {

        add: function(title) {

            var id = addTask(title);
            
            return id;
        },

        remove: function(id) {
            alert(title);
        },

        setComplete: function(id) {
            alert(id);
        },

        setIncomplete: function(id) {
            alert(id);
        }
    };

    scope.todoApp = todoApp;

    console.log('scope', scope);

})(window);
