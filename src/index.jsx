var ReactDOM = require('react-dom');
var _ = require('underscore');
var React = require('react');
var TodoItem = require('./classes.jsx').TodoItem;
var TodoList = require('./classes.jsx').TodoList;
var TodoInput = require('./classes.jsx').TodoInput;
var TodoApp = require('./classes.jsx').TodoApp;

var todos = [
  "Get the milk",
  "Watch the netflix",
  "Write the code"
];

ReactDOM.render(<TodoApp todos={todos} />, document.querySelector('#container'));
