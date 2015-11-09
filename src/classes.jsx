var _ = require('underscore');
var React = require('react');
var $ = require('jquery');

var TodoApp = module.exports.TodoApp = React.createClass({
  getInitialState: function() {
    return { todos: this.props.todos };
  },
  onAddTodo: function(value) {
    this.setState({ todos: this.state.todos.concat([value]) });
  },
  onRemoveTodo: function(index) {
    var newTodos = _.reject(this.state.todos, function(str, i) {
      return i == index
    });
    this.setState({ todos: newTodos });
  },
  render: function() {
    return <div>
      <TodoInput onAddTodo={this.onAddTodo} />
      <TodoList onRemoveTodo={this.onRemoveTodo} todos={this.state.todos} />
    </div>;
  }
});

var TodoInput = module.exports.TodoInput = React.createClass({
  onAdd: function() {
    this.props.onAddTodo(this.refs.input.value);
  },
  render: function() {
    return <div>
      <input ref="input" placeholder="add a todo item" />
      <button onClick={this.onAdd} >Add Todo</button>
    </div>;
  }
});

var TodoList = module.exports.TodoList = React.createClass({
  render: function() {
    var props = this.props;
    var lists = props.todos.map(function(todo, index) {
      return <TodoItem
        todo={todo}
        key={todo}
        index={index}
        onRemoveTodo={props.onRemoveTodo} />
    });
    return <ul>{lists}</ul>;
  }
});


var TodoItem = module.exports.TodoItem = React.createClass({
  getInitialState: function() {
    return { removing: false };
  },
  onRemoveTodo: function(event) {
    this.setState({ removing: true });
    window.$.ajax({
      url: 'https://api.artsy.net/api/v1/system/up',
      success: function() {
        this.props.onRemoveTodo(this.props.index);
      }.bind(this)
    });
  },
  render: function() {
    return <li>
      {this.state.removing ? '...' : this.props.todo}
      <button onClick={this.onRemoveTodo}>X</button>
      <br/><br/><br/><br/><br/>
    </li>;
  }
});
