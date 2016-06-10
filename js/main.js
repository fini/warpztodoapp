$(function() {

    "use strict";

    var $appUI = $('.todo-app');
    var $actionAddTask = $appUI.find('.action-todo-add');

    var $templates = $('#todo-app-templates');

    var templateCache = {};

    function getTemplate(className) {

        // employ a simple, but efficient cache
        if(typeof templateCache[className] === "undefined") {

            templateCache[className] = $($templates.find('.' + className + ' > *').get(0));
        }

        return templateCache[className].clone();
    }

    $actionAddTask.on('click', function() {

        event.preventDefault();
        var title = prompt("Title", "Untitled");

        // Add the task to the model
        var newId = todoApp.add(title);

        // Get a cloned template, ready for customizing
        var $itemEl = getTemplate('item-task');


        // Set a few properties on it's elements
        $itemEl.find('input[type=checkbox]')
                .attr({'id': newId, 'name': newId});

        $itemEl.find('label')
                .text(title)
                .attr({'for': newId});

        $('.main').append($itemEl);

        console.log('$itemEl:', $itemEl);
        console.log('Added id:', newId);

        //$('.todo-app article').map(function() { var $taskEl = $(this); return {id: $taskEl.find('label').attr('for'), title: $taskEl.find('label').text()} });
    });

    $appUI.on('change', 'input[type=checkbox]', function() {

        event.preventDefault();

        // Get a cloned template, ready for customizing
        var $itemEl = $(this).closest('article');

        var $checkbox = $itemEl.find('input[type=checkbox]:first');

        var id = $checkbox.attr('id');

        console.log($checkbox);

        var complete = $checkbox.is(':checked');


        // Set a few properties on it's elements
        if (complete) {
            todoApp.setComplete(id);
            $itemEl.addClass('complete');
        } else {
            todoApp.setIncomplete(id);
            $itemEl.removeClass('complete');
        }


        //$('.todo-app article').map(function() { var $taskEl = $(this); return {id: $taskEl.find('label').attr('for'), title: $taskEl.find('label').text()} });
    });

});
