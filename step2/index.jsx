//
// The next step is to start introducing state into your app. State is defined
// as any piece of data that can change over time. State can include UI state,
// such as whether a modal window is open or closed. State can also include
// "domain data" that may change over time such as the title of an artwork that
// can be edited in CMS, or in this case the list of todo items.
//
// When working with vanilla React you have to move your preconceived MVC
// concepts aside. There are no "models" in the sense there aren't objects that
// wrap certain "table rows" and mutate their internal data—like you might be
// used to in Rails or Backbone. Instead there is only "state" and "props".
// If the data changes over time, it belongs in state, if it doesn't it belongs
// in props. For instance in a user facing React app the title of an artwork
// might be passed along as props through the entire tree, whereas in an admin
// app, where it can be changed, it will be stored in the state of a component.
// (Components = View + Controller if you were curious where the VC went).
//
// Think about the minimum pieces of data that might change over time in a
// todo list app. In our case there is only one piece of data that changes,
// and that's the `todos` array—everyting else is a UI reflection of the `todos`
// array. Now that we've established `todos` belongs as state, the next question
// is "which component's need to know about the `todos` array?". We want to
// declare `todos` as state in one place and pass it down to the rest of the
// children that depend on it as props. It might be helpful to work from the
// top of the tree down and ask "do more than one child depend on this state"...
//
// TodoApp
//   - TodoInput: Depend on `todos`? Yes. It `pushes` to `todos`.
//   - TodoList: Depend on `todos`? Yes. It renders `todos`
//
// So in our case we have no choice but to declare `todos` as state at the top
// of the tree. However, if avoidable, it's better to place it further down the
// tree, otherwise you can end up polluting the "global state". In a more
// complex app you may have a much bigger tree where you can declare state
// throughout it. Imagine if CMS was a big React app and we
//
// ArtsyCMS
//   - Sidebar: Depends on 'artworks'? No. Just links to pages
//   - ArtistsPage: Depends on `artworks`. No. Renders separate artist list.
//   - ArtworksPage
//     - Header: Depends on `artworks`? No. Just intro text.
//     - AvailabilityDropdown: Depends on `artworks`? Yes. Sorts `artworks`.
//     - ArtworksList: Depends on 'artworks'? Yes. Renders `artworks`
//
// In this example we're concerned about the list of artworks that are renders
// in cms.artsy.net/artworks. You can see one level deep that only the
// `ArtworksPage` component cares about that list, so we shouldn't set that
// state at the top level. If we go a level deeper you see that both
// `AvailabilityDropdown` and `ArtworksList` depends on `artworks`. One mutates
// `artworks` by sorting, the other just renders. So at the point we stop,
// and place `artworks` in the `ArtworksPage` `setInitialState`, then pass
// artworks down as props to the child components that need it.
//
// Follow comments below to see how we convert `todos` to state here.
//

var ReactDOM = require('react-dom');
var _ = require('underscore');
var React = require('react');

var todos = [
  "Get the milk",
  "Watch the netflix",
  "Write the code"
];

var TodoApp = module.exports.TodoApp = React.createClass({

  // We pass the initial data below into our app as props, and since we
  // determined this is the most shallow component that needs `todos` we use
  // `getInitialState` which will set `this.state.todos`.
  getInitialState: function() {
    return { todos: this.props.todos };
  },

  // Because this component is responsible for the todos state, this component
  // is also resonsbile for updating the todos state using `this.setState`.
  // However, actual click handler for removing a todo item is 2 children
  // deeper down the chain. So we have to pass this callback down through
  // props.
  onRemoveTodo: function(index) {
    var newTodos = _.reject(this.state.todos, function(str, i) {
      return i == index
    });
    this.setState({ todos: newTodos });
  },

  // We're now passing `todos` as props down the rest of the tree.
  // It's important to only use `todos` as state here so that we don't
  // have a mess managing updates in multiple places down the tree.
  render: function() {
    return <div id='container'>
      <TodoInput  />
      <TodoList onRemoveTodo={this.onRemoveTodo} todos={this.state.todos} />
    </div>;
  }
});

var TodoInput = module.exports.TodoInput = React.createClass({
  render: function() {
    return <form>
      <input ref="input" placeholder="Take out the dog" />
      <button>Add Todo</button>
    </form>;
  }
});

// The TodoList is between the top-level component and click handler below, so
// we continue to pass `onRemoveTodo` down the props chains.
var TodoList = module.exports.TodoList = React.createClass({
  render: function() {
    var lists = this.props.todos.map(function(todo, index) {
      return <TodoItem
        todo={todo}
        key={index}
        index={index}
        onRemoveTodo={this.props.onRemoveTodo}
      />
    }.bind(this));
    return <ul>{lists}</ul>;
  }
});

// Finally we can handle the click for removing a todo item, but because this
// component is not responsible for the `todos` state, we can't use
// `this.setState` directly—instead we must call the `onRemoveTodo` callback
// passed down from the top-level `TodoApp` component.
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

ReactDOM.render(<TodoApp todos={todos} />, document.querySelector('#container'));
