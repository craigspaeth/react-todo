var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

var todos = [
  "Get the milk",
  "Watch the netflix",
  "Write the code"
];

var TodoApp = React.createClass({
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

var TodoInput = React.createClass({
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

var TodoList = React.createClass({
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


var TodoItem = React.createClass({
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

ReactDOM.render(<TodoApp todos={todos} />, document.querySelector('#container'));
