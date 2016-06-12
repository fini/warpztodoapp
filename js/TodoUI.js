(function(scope) {

    "use strict";

    var $appUI = $('.todo-app');
    var $appUIMain = $('.todo-app .main');
    var $templates = $('#todo-app-templates');

    var templateCache = {};

    function getTemplate(className) {

        // employ a simple, but efficient cache
        if(typeof templateCache[className] === "undefined") {
            //console.debug('using uncached template', className);
            templateCache[className] = $($templates.find('.' + className + ' > *').get(0));
        } else {
            //console.debug('using cached template', className);
        }

        return templateCache[className].clone();
    }

    var taskEffectCounter = 0;
    var taskEffectTimer = null;

    function addTask(newTask) {

        // Get a freshly cloned template element, ready for customizing and adding to the DOM.
        var $itemEl = getTemplate('item-task');

        $itemEl.attr({'id': newTask.id});

        // Set a few properties on it's elements
        $itemEl.find('input[type=checkbox]')
                .attr({'id': 'checkbox_' + newTask.id, 'name': 'checkbox_' + newTask.id});

        if (newTask.complete) {
            $itemEl.addClass("complete")
                .find('input[type=checkbox]')
                    .attr({'checked': 'checked'});
        }

        $itemEl.find('label')
                .text(newTask.title)
                .attr({'for': 'checkbox_' + newTask.id});

        $appUIMain.append($itemEl);

        taskEffectCounter++;

        clearTimeout(taskEffectTimer);
        taskEffectTimer = setTimeout(function() {
            taskEffectCounter = 0;
        }, 1000);

        $itemEl.velocity("transition.bounceLeftIn", { delay: taskEffectCounter * 80, duration: 600 });

        console.log('Added task:', newTask);
    }


    function removeTask($itemEl) {

        $itemEl.velocity("transition.bounceRightOut", { delay: 150, duration: 600, complete: function() {
            $itemEl.remove();
        } });
    }


    function updateTaskState($itemEl) {

        var $checkbox = $itemEl.find('input[type=checkbox]:first');
        var complete = $checkbox.is(':checked');

        if (complete) {
            $itemEl.addClass('complete');
        } else {
            $itemEl.removeClass('complete');
        }
    }


    var todoUI = {

        add: addTask,
        remove: removeTask,
        updateState: updateTaskState
    };

    scope.todoUI = todoUI;

})(window);
