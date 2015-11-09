require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var cheerio = require('cheerio');
var TodoItem = require('../src/classes.jsx').TodoItem;
var TodoList = require('../src/classes.jsx').TodoList;
var TodoInput = require('../src/classes.jsx').TodoInput;
var TodoApp = require('../src/classes.jsx').TodoApp;

describe('TodoItem', function() {

  it('renders a todo item', function() {
    var html = React.renderToString(React.createElement(TodoItem, { todo: "Hello World" }));
    var $ = cheerio.load(html);
    $('li span').html().should.containEql('Hello')
  });
});