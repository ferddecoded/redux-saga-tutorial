import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'

import rootSaga from './sagas'

// create middleware using the factory function
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  // before running rootSaga, we must connect our middleware to the Store using
  // applyMiddleware
  applyMiddleware(sagaMiddleware)
)

// once connected to middleware, we use the below code to start our Saga
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
    />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
