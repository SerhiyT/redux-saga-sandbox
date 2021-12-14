// *run request one by one (after finish first, run next and etc.) Action Channel
// *Most often used when it is necessary to react to events from the redux store.
import { USER_POST_FETCH_FAILED, USER_POSTS_FETCH_REQUESTED, USER_POST_FETCH_SUCCEEDED } from '../actions';
import { put, call, take, actionChannel, getContext, setContext } from 'redux-saga/effects';
import { buffers } from '@redux-saga/core';

function* fetchUserPosts(action) {
  try {
    const postsAPI = yield getContext('postAPI');
    const userPosts = yield call(postsAPI.getUserPosts, action.payload.userId);
    const appVers = yield getContext('appVers');
    console.log('%cqqq: appVers', 'color: green;', appVers);
    yield put({
      type: USER_POST_FETCH_SUCCEEDED,
      payload: {
        data: userPosts,
      },
    });
  } catch (err) {
    yield put({
      type: USER_POST_FETCH_FAILED,
      payload: err.message,
    });
  }
}

export function* userPostsRequestedWatcherSaga() {
  const requestChannel = yield actionChannel(USER_POSTS_FETCH_REQUESTED);

  // *run only 1 request (first income)
  // const requestChannelWithoutBuffers = yield actionChannel(USER_POSTS_FETCH_REQUESTED, buffers.none)
  yield setContext({
    appVers: '1.1.1',
  });
  while (true) {
    const action = yield take(requestChannel);
    yield call(fetchUserPosts, action);
  }
}
