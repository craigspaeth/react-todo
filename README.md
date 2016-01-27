# react-todo
Exampl React app

## Setup

* Install [Node](https://nodejs.org/en/)
* Clone the repository `git clone git@github.com:craigspaeth/react-todo.git`
* Go to the directory and install node modules `cd react-todo && npm install`

## Tools

Beyond React this project uses [browserify](http://browserify.org/) and [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), so if you aren't familiar with those, it might be worth taking a look so you don't get thrown off.

## Exploring

This repo is broken up into 3 basic steps of building a basic todo list app in React...

1. Shows what it's like starting a React app by just rendiner static HTML with React.
2. Adds the first dynamic functionality of removing a todo item—explaining state vs. props in depth.
3. Finishes the dynamic functionality and modularizes the React app to best testable.

You can run each step by using `npm run {step number}` e.g. `npm run 1` and opening the index.html file in /out `open out/index.html`. The code in each /step1 + /step2 + /step3 folder has thorough inline comments for more details.

## License

MIT
