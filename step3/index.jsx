//
// In this example we fill out the rest of the interactivity and modularize
// our code to make our components testable. See the /test folder for an
// example of how you can test React components by passing in props/state and
// asserting against `renderToString`ed html.
//
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
