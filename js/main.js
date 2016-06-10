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

    function addTask(title) {

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

        $itemEl.velocity("transition.bounceLeftIn", { delay: 150, stagger: 30 });

        console.log('$itemEl:', $itemEl);
        console.log('Added id:', newId);
    }

    function updateTaskState($itemEl) {

        var $checkbox = $itemEl.find('input[type=checkbox]:first');
        var id = $checkbox.attr('id');
        var complete = $checkbox.is(':checked');


        // Set a few properties on it's elements
        if (complete) {
            todoApp.setComplete(id);
            $itemEl.addClass('complete');
        } else {
            todoApp.setIncomplete(id);
            $itemEl.removeClass('complete');
        }
    }

    function removeTask($itemEl) {

        var id = $itemEl.find('.action-todo-remove').data('id');

        todoApp.remove(id);

        $itemEl.velocity("transition.bounceRightOut", { delay: 150, complete: function() {
            $itemEl.remove();
        } });

    }

    $actionAddTask.on('click', function() {

        event.preventDefault();
        var title = prompt("Title", "Untitled Task " + Math.round(Math.random()*1000000));
        addTask(title);
        //$('.todo-app article').map(function() {
        //    var $taskEl = $(this); return {id: $taskEl.find('label').attr('for'), title: $taskEl.find('label').text()}
        //});
    });

    $appUI.on('click', 'button.action-todo-remove', function() {

        event.preventDefault();
        var $itemEl = $(this).closest('article');
        removeTask( $itemEl );
    });

    $appUI.on('change', 'input[type=checkbox]', function() {

        event.preventDefault();
        var $itemEl = $(this).closest('article');
        updateTaskState($itemEl);
    });

    function init() {
        $appUI.find('article').velocity("transition.bounceRightIn", { delay: 300, stagger: 30 });
    }

    init();

});
