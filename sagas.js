import { put, takeEvery, all } from 'redux-saga/effects'

// Sagas are implemented as Generator functions that yield objects to the redux-saga middleware.
// When a Promise is yielded to the middleware, the middleware will suspend the Saga until the Promise completes
const delay = ms => new Promise(res => setTimeout(res, ms))


function* helloSaga() {
    console.log('Hello Saga!')
}

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
    // suspend until the Promise returned by delay resolves
    yield delay(1000)
    // instructs the middleware to dispatch an INCREMENT action
    // put is one example of what we call an Effect
    // Effects are plain JavaScript objects which contain instructions to be fulfilled by the middleware
    // When a middleware retrieves an Effect yielded by a Saga, the saga is paused until the Efffect is fulfilled
    yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
    // takeEvery is used to listen for dispatched INCREMENT_ASYNC actions and run incrementAsync each time
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// we only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
    ])
}