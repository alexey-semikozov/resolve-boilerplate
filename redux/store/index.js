import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import Immutable from 'seamless-immutable';
import { saga as resolveSaga } from 'resolve-redux';
import saga from '../sagas';
import reducers from '../reducers';

const rootSaga = function* (args) {
	yield [
    fork(resolveSaga, args),
    fork(saga)
  ];
};

const CRITICAL_LEVEL = 100;
let socketIOFailCount = 0;

function initSocketIO(store) {
  const socketIO = socketIOClient('/');
  socketIO.on('event', event => store.dispatch(JSON.parse(event)));
  socketIO.on('disconnect', () => {
    socketIOFailCount++
    if (socketIOFailCount > CRITICAL_LEVEL) {
      window.location.reload()
    }
    initSocketIO(store);
  })
}

export default initialState => {
  if (!Immutable.isImmutable(initialState)) {
    initialState = Immutable(initialState);
  }

  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store = createStore(reducers, initialState, enhancer);

  if (typeof window === 'object') {
    sagaMiddleware.run(rootSaga, {
      sendCommand: async command => axios.post('/api/commands', command)
    });
    initSocketIO(store);
  }

  return store;
}
