$(function() {

    "use strict";

    var $appUI = $('.todo-app');
    var $actionAddTask = $appUI.find('.action-todo-add');

    $actionAddTask.on('click', function() {

        event.preventDefault();
        var title = prompt("Title","Untitled");

        todoApp.add(title);
    });

});
