var React = require('react');
var _ = require('underscore');

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
    return <div id='container'>
      <TodoInput onAddTodo={this.onAddTodo} />
      <TodoList onRemoveTodo={this.onRemoveTodo} todos={this.state.todos} />
    </div>;
  }
});

var TodoInput = module.exports.TodoInput = React.createClass({
  onAdd: function(e) {
    e.preventDefault();
    this.props.onAddTodo(this.refs.input.value);
  },
  render: function() {
    return <form onSubmit={this.onAdd}>
      <input ref="input" placeholder="Take out the dog" />
      <button onClick={this.onAdd} >Add Todo</button>
    </form>;
  }
});

var TodoList = module.exports.TodoList = React.createClass({
  render: function() {
    var props = this.props;
    var lists = props.todos.map(function(todo, index) {
      console.log(props)
      return <TodoItem
        todo={todo}
        key={index}
        index={index}
        onRemoveTodo={props.onRemoveTodo} />
    });
    return <ul>{lists}</ul>;
  }
});


var TodoItem = module.exports.TodoItem = React.createClass({
  onRemoveTodo: function(event) {
    this.props.onRemoveTodo(this.props.index);
  },
  render: function() {
    return <li>
      {this.props.todo}
      <button onClick={this.onRemoveTodo}>X</button>
    </li>;
  }
});
