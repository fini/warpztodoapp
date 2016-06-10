(function(scope) {

    function addTask(title) {
        //alert(title);
        return Date.now(); // + Math.round(Math.random()*1000000);
    }

    function removeTask(id) {
        //alert(title);

        console.log('remove', id);
        return id;
    }

    var todoApp = {

        add: function(title) {

            var id = addTask(title);
            console.log('add', title, id);

            return id;
        },

        remove: function(id) {
            removeTask(id);
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
