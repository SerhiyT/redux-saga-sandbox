// *Such channels usually solve the problem of communication between sagas.
// *channel - events are manually queued using put; (will put one by one)
import { channel } from '@redux-saga/core';
import { call, delay, fork, put, take } from '@redux-saga/core/effects';

function* handleChannelReq(requestChannel) {
  while (true) {
    const payload = yield take(requestChannel);
    console.log('%cqqq: payload', 'color: green;', payload);
    yield delay(2000);
  }
}

export function* channelSaga() {
  const requestChannel = yield call(channel);

  yield fork(handleChannelReq, requestChannel);

  yield put(requestChannel, { payload: 'channel:1 ^)' });
  yield put(requestChannel, { payload: 'channel:2 ^)' });
  yield put(requestChannel, { payload: 'channel:3 ^)' });
  yield put(requestChannel, { payload: 'channel:4 ^)' });
}
