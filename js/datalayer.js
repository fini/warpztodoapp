
var todoAppLibs = todoAppLibs || {};

/* A simple data layer for XHR and localStorage services */
todoAppLibs.DataLayer = (function() {

    "use strict";

    function getTodoData() {

        console.time("getTodoData"); // time the async request.

        // Load json via XHR
        var newTasks = $.ajax({
            url: "data/todo_data_default.json",
            dataType: "json",
            cache: true
        }).done(function(data) {

            todoAppLibs.Storage.setItem('todo_data', JSON.stringify(data));
        })
        .fail(function(err) {

            console.error( "Error: DataLayer.getTodoData()", err );
            $(".todo-app .main").text("IO Error, please retry in a while.");

        })
        .always(function() {

            console.timeEnd("getTodoData");
        });

        return newTasks;
    }


    // Deserialize todo-data-test-format and insert the updated tasks, then serialize it back to Storage.
    function updateLocalData() {

        var localTodoDataString = todoAppLibs.Storage.getItem('todo_data');

        if (localTodoDataString !== null) {

            var todoDataObj = JSON.parse(localTodoDataString);
            todoDataObj.todo_tasks = todoApp.getAllTasksArray();
            todoDataObj.last_modified = Date.now(); // update timestamp
            todoAppLibs.Storage.setItem('todo_data', JSON.stringify(todoDataObj));
            console.debug("Data was updated locally");
        }
    }

    var publicAPI = {

        getTodoData: getTodoData,
        updateLocalData: updateLocalData
    };

    return publicAPI;
})();
