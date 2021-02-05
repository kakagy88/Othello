/**
 * main
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import store from './store/createStore'

;(() => {
  const app = document.getElementById('app')
  // react hot loader
  if (process.env.IS_DEVSERVER) {
    const { hot } = require('react-hot-loader')
    const AppContainer = hot(module)(App)
    ReactDOM.render(
      <AppContainer store={ store } />,
      app
    )
  } else {
    ReactDOM.render(<App store={ store } />, app)
  }
})()
