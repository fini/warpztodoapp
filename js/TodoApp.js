(function(scope) {

    "use strict";

    var tasks = {};

    function addTask(taskData) {

        var id = taskData.id || Date.now(); // + Math.round(Math.random()*1000000);

        tasks[taskData.id] = (taskData);
        todoAppLibs.DataLayer.updateLocalData();

        return id;
    }

    function removeTask(id) {

        console.log('remove', id);

        delete tasks[id];
        todoAppLibs.DataLayer.updateLocalData();

        return id;
    }

    var todoApp = {

        add: addTask,

        remove: removeTask,

        setComplete: function(id) {

            if (tasks[id]) {
                console.info('setComplete:', id);
                tasks[id].complete = true;
                todoAppLibs.DataLayer.updateLocalData();
            }
        },

        setIncomplete: function(id) {

            if (tasks[id]) {
                console.info('setIncomplete:', id);
                tasks[id].complete = false;
                todoAppLibs.DataLayer.updateLocalData();
            }
        },

        getAllTasks: function() {
            return tasks;
        },

        getAllTasksArray: function() {

            var tasksList = [];

            for (var key in tasks) {
                if (tasks.hasOwnProperty(key)) {
                    tasksList.push(tasks[key]);
                }
            }

            return tasksList;
        }
    };

    scope.todoApp = todoApp;

})(window);
