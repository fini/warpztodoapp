(function(scope) {

    function addTask(title) {
        //alert(title);
        return Date.now(); // + Math.round(Math.random()*1000000);
    }

    var todoApp = {

        add: function(title) {

            var id = addTask(title);
            console.log('add', title, id);

            return id;
        },

        remove: function(id) {
            console.log('remove', id);
        },

        setComplete: function(id) {
            console.log('setComplete:', id);
        },

        setIncomplete: function(id) {
            console.log('setIncomplete:', id);
        }
    };

    scope.todoApp = todoApp;

    console.log('scope', scope);

})(window);
