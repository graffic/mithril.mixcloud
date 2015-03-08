var m = require('mithril');
var todo = require('todo');

//initialize the application
m.module(document, {view: todo.view, controller: todo.controller});
