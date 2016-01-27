require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var cheerio = require('cheerio');
var TodoItem = require('../step3/classes.jsx').TodoItem;
var TodoList = require('../step3/classes.jsx').TodoList;
var TodoInput = require('../step3/classes.jsx').TodoInput;
var TodoApp = require('../step3/classes.jsx').TodoApp;

describe('TodoItem', function() {

  it('renders a todo item', function() {
    var html = React.renderToString(React.createElement(TodoItem, { todo: "Hello World" }));
    var $ = cheerio.load(html);
    $('li span').html().should.containEql('Hello')
  });
});
