import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import currentPage from './page'
import loadedImages from './images'

const reducer = combineReducers({
  currentPage,
  loadedImages
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(reducer, middleware)

export default store