# Data Binder

## Table of contents

- [About](#about)
- [How to use DataBinder](#how-to-use)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
- [Sending Feedback](#sending-feedback)

## About

This is data binder written in [ES6](http://es6-features.org) witch allows you to bind model data into HTML template

## How to use DataBinder

You can simply import DataBinder

```js
import DataBinder from './DataBinder/DataBinder'
```

Prepare data model

```js
let model = {
  label: 'Title',
  alt: '',
  x: {
    y: {
      z: 'Some nested property to bind'
    }
  }
}
```

and template

```html
<h1 data-bind="label" data-bind-src="x.src" data-bind-alt="alt" data-bind-title="x.y.z"></h1>
```

then create instance and pass data and HTML template

```js
const dataBinder = new DataBinder()
const view = dataBinder.bind(model, viewTemplate)
```

work on model

```js
model.label = 'That works'
model.x.y.z = 'Changed'
model.src = 'src'
```

and of course add template to document

```js
document.getElementById('output').appendChild(view)
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `npm test`

Launches the test runner. [Jest](https://jestjs.io/) used.<br>

### `npm run build`

Builds the app for production to the `public/bundle.js` <br /> [Babel](https://babeljs.io/) and [Webpack](https://webpack.js.org/) used<br>

Your app is ready to be deployed!

### `npm run watch`

Runs this command to build on every file in `src` change.

### `npm run lint`

Runs linter. `eslint` used.

## Sending feedback

I am always open to [your feedback](https://github.com/loocash3/data-binder/issues).