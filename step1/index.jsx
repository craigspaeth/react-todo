//
// A nice approach to building a React application is to first just fill out
// the `render` functions. This will build up a static version of the UI and
// is a good place to start breaking your UI up into smaller parts or
// "components". Here we have broken up a todo list application into a tree
// of smaller components. Right now this is basically like a bunch of
// template partials building up a larger template.
//
// Our component tree looks like...
//
// - TodoApp
//   - TodoInput       [____________] [ Add Todo ]
//   - TodoList
//     - TodoItem      _Get_the_milk_________( x )
//     - TodoItem      _Watch_the_netflix____( x )
//     - ...
//
// See more comments below...
//

var ReactDOM = require('react-dom');
var _ = require('underscore');
var React = require('react');

// This `todos` data is the state (data that changes over time) that we pass
// along the tree of components. It's passed in the very top of the tree later
// when used in `ReactDOM.render`
var todos = [
  "Get the milk",
  "Watch the netflix",
  "Write the code"
];

// The root component of our component tree. In most React apps, like this one,
// this root component doesn't do much but piece together child components.
var TodoApp = module.exports.TodoApp = React.createClass({
  render: function() {
    return <div id='container'>
      <TodoInput  />
      <TodoList todos={this.props.todos} />
    </div>;
  }
});

// The input form we use to add todo list items
var TodoInput = module.exports.TodoInput = React.createClass({
  render: function() {
    return <form>
      <input ref="input" placeholder="Take out the dog" />
      <button>Add Todo</button>
    </form>;
  }
});

// A container component that renders individual toto items
var TodoList = module.exports.TodoList = React.createClass({
  render: function() {
    var lists = this.props.todos.map(function(todo, index) {
      return <TodoItem
        todo={todo}
        key={index}
        index={index}
      />
    });
    return <ul>{lists}</ul>;
  }
});

// A single todo item combined in the list.
// Contains an ( x ) button to cross themself off.
var TodoItem = module.exports.TodoItem = React.createClass({
  render: function() {
    return <li>
      {this.props.todo}
      <button>X</button>
    </li>;
  }
});

ReactDOM.render(<TodoApp todos={todos} />, document.querySelector('#container'));
