import { put, takeEvery, all, call } from 'redux-saga/effects'

// Sagas are implemented as Generator functions that yield objects to the redux-saga middleware.
// When a Promise is yielded to the middleware, the middleware will suspend the Saga until the Promise completes
export const delay = ms => new Promise(res => setTimeout(res, ms))


export function* helloSaga() {
    console.log('Hello Saga!')
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    // suspend until the Promise returned by delay resolves
    // we use call here to pass call(delay, 100) to the caller of next
    // useful for tests
    // call returns an effect which instructs the middleware to call a given functiom with a given arguement
    // put nor call performs any dispatch or asynchronous call by themselves, they return plain JavaScript objects
    yield call(delay, 1000) // returns => { CALL: { fn: delay, args: [1000] } }
    // instructs the middleware to dispatch an INCREMENT action
    // put is one example of what we call an Effect
    // Effects are plain JavaScript objects which contain instructions to be fulfilled by the middleware
    // When a middleware retrieves an Effect yielded by a Saga, the saga is paused until the Efffect is fulfilled
    yield put({ type: 'INCREMENT' }) // returns { PUT: { type: 'INCREMENT' } }
    // What happens is that the middleware examines the type of each yielded Effect then decides how to fulfill that Effect.
    // If the Effect type is a PUT then it will dispatch an action to the Store. 
    // If the Effect is a CALL then it'll call the given function.
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