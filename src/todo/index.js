'use strict';

var m = require('mithril');



//the To do class has two properties
var Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

//the TodoList class is a list of To do's
var TodoList = Array;

//the view-model tracks a running list of todos,
//stores a description for new todos before they are created
//and takes care of the logic surrounding when adding is permitted
//and clearing the input after adding a to do to the list
var vm = (function() {
    var vm = {};
    vm.init = function() {
        //a running list of todos
        vm.list = new TodoList();

        //a slot to store the name of a new to do before it is created
        vm.description = m.prop("");

        //adds a to do to the list, and clears the description field for user convenience
        vm.add = function() {
            if (vm.description()) {
                vm.list.push(new Todo({description: vm.description()}));
                vm.description("");
            }
        };
    };
    return vm;
}());

//the controller defines what part of the model is relevant for the current page
var controller = function() {
    vm.init();
};

//here's the view
function view() {
    return m("html", [
        m("body", [
            m("input", {onchange: m.withAttr("value", vm.description), value: vm.description()}),
            m("button", {onclick: vm.add}, "Add"),
            m("table", [
                vm.list.map(function(task) {
                    return m("tr", [
                        m("td", [
                            m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), checked: task.done()})
                        ]),
                        m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description())
                    ]);
                })
            ])
        ])
    ]);
}

module.exports = {
    view: view,
    controller: controller
};