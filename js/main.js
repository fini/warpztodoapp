$(function() {

    "use strict";

    var $window = $(window);
    var $appUI = $('.todo-app');
    var $actionAddTask = $appUI.find('.action-todo-add');


    /* Event handlers */

    /* API events */

    $window.on("NewTask.TodoAppUI.DataLayer", function(event, data) {

        console.info('NewTask Event recieved from:', event.namespace, data.task);

        var sanitizedData = {};
        sanitizedData.title = data.task.title || "Untitled";
        sanitizedData.id = data.task.id || Date.now();
        sanitizedData.complete = data.task.complete || false;

        todoApp.add(sanitizedData);
        todoUI.add(sanitizedData);

    });

    /* UI events */

    $actionAddTask.on('click', function() {

        event.preventDefault();
        var title = prompt("Title", "Untitled Task " + Math.round(Math.random()*1000000));
        $window.trigger("NewTask.TodoAppUI", {task: {title: title}});
    });


    $appUI.on('click', 'button.action-todo-remove', function() {

        event.preventDefault();
        var $itemEl = $(this).closest('article');
        var id = $itemEl.attr('id');

        todoApp.remove(id);
        todoUI.remove($itemEl);
    });


    $appUI.on('change', 'input[type=checkbox]', function() {

        event.preventDefault();
        var $itemEl = $(this).closest('article'); // fast and easy way to get the container element of the item.

        var $checkbox = $itemEl.find('input[type=checkbox]:first');
        var id = $itemEl.attr('id');
        var complete = $checkbox.is(':checked');

        if (complete) {
            todoApp.setComplete(id);
        } else {
            todoApp.setIncomplete(id);
        }

        todoUI.updateState($itemEl);
    });


    function handleIncommingTasks(data) {
        var i;

        if (data.todo_tasks.length > 0) {

            for (i = 0; i < data.todo_tasks.length; i++) {

                $window.trigger("NewTask.TodoAppUI", {task: data.todo_tasks[i]});
            }
        }
    }


    function init() {

        var localTodoDataString = todoAppLibs.Storage.getItem('todo_data');

        if (localTodoDataString === null) {

            console.info('Fetching (default) todo json data via XHR.');

            var dataPromise = todoAppLibs.DataLayer.getTodoData();

            dataPromise.done(function(data) {
                // todo data is available.
                handleIncommingTasks(data);
            });
        } else {

            console.info('Loading todo json data from localStorage.');

            var todoDataObj = JSON.parse(localTodoDataString);
            handleIncommingTasks(todoDataObj);
        }

    }

    init(); // Start the show ;)
});
