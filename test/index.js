require('node-jsx').install({extension: '.jsx'});
var ReactDOM = require('react-dom');
var React = require('react');
var cheerio = require('cheerio');
var jsdom = require('jsdom');
var sinon = require('sinon');
var TodoItem, TodoApp;

describe('components', function() {
  var body;

  // Sets up JSOM, you wouldn't need this in a Rails app that uses a full
  // browser environment (headless w/ capybara-webkit or otherwise).
  before(function(done) {
    jsdom.env(
      "<html><body></body></html>",
      ["http://code.jquery.com/jquery.js"],
      function (err, window) {
        if (err) return done(err);
        global.window = window;
        TodoItem = require('../src/classes.jsx').TodoItem;
        TodoApp = require('../src/classes.jsx').TodoApp;
        done();
      });
  });

  after(function() {
    window.close();
  });

  beforeEach(function () {
    sinon.stub(window.$, 'ajax');
    body = window.document.querySelector('body');
  })

  afterEach(function() {
    window.$.ajax.restore();
  });

  describe('TodoItem', function() {

    it('renders a todo item', function() {
      var html = React.renderToString(
        React.createElement(TodoItem, { todo: "Hello World" })
      );
      html.should.containEql('Hello')
    });

    it('#onRemoveTodo calls the parent onRemoveTodo', function() {
      var stub = sinon.stub();
      var component = ReactDOM.render(React.createElement(TodoItem, {
        todo: "Hello World",
        onRemoveTodo: stub
      }), body);
      component.onRemoveTodo();
      window.$.ajax.args[0][0].success();
      stub.called.should.be.ok
    });

    it('#onRemoveTodo calls our api', function() {
      var stub = sinon.stub();
      var component = ReactDOM.render(React.createElement(TodoItem, {
        todo: "Hello World",
        onRemoveTodo: stub
      }), body);
      component.onRemoveTodo();
      window.$.ajax.args[0][0].url.should
        .equal('https://api.artsy.net/api/v1/system/up');
      window.$.ajax.args[0][0].success();
      stub.called.should.be.ok
    });
  });

  describe('TodoApp', function() {

    it('#onRemoveTodo removes a todo item', function() {
      var component = React.render(React.createElement(TodoApp, {
        todos: ["Buy the milk", "write the tests", 'profit']
      }), body);
      component.onRemoveTodo(1);
      component.state.todos.join(', ').should.equal("Buy the milk, profit");
    });
  });
});