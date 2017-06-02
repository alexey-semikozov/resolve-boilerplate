import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import io from 'socket.io-client';
import Immutable from 'seamless-immutable';
import reducer from '../reducers';
import saga from '../sagas';

export default initialState => {
  if (!Immutable.isImmutable(initialState)) {
    initialState = Immutable(initialState);
  }

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  if (typeof window !== 'undefined' && window.document) {
    const socket = io('/');
    socket.on('connect', err => {
      if (err) return console.log(err);

      sagaMiddleware.run(saga, socket);
    });
  }

  return store;
};
