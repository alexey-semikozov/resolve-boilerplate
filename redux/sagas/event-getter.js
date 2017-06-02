import { eventChannel } from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';

function subscribeOnSocket(socket) {
  return eventChannel(emit => {
    socket.on('event', event => emit(event));
    return () => {};
  });
}

export default function* initEventGetter(socket) {
  const channel = yield call(subscribeOnSocket, socket);

  yield takeEvery(channel, function*(action) {
    yield put(action);
  });
}
