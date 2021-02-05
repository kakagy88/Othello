/**
 * Redux Store
 */

import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import rootReducer from '../reducers'

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunk,
    promise
  )
)

export default store
