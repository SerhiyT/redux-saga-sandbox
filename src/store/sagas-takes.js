import { call, cancel, fork, put, take, takeEvery, takeLatest, takeLeading } from '@redux-saga/core/effects';
import { getUserPosts } from '../api/posts';
import { USER_POST_FETCH_FAILED, USER_POSTS_FETCH_REQUESTED, USER_POST_FETCH_SUCCEEDED } from './actions';

function* fetchUserPosts(action) {
  try {
    const posts = yield call(getUserPosts, action.payload.userId);
    yield put({
      type: USER_POST_FETCH_SUCCEEDED,
      payload: {
        data: posts,
      },
    });
    console.log('%cqqq: posts', 'color: green;', action.payload.actionId);
  } catch (err) {
    yield put({
      type: USER_POST_FETCH_FAILED,
      payload: {
        message: err.message,
      },
    });
  }
}

export function* userPostsFetchWatcherSaga() {
  // yield takeEvery(USER_POSTS_FETCH_REQUESTED, fetchUserPosts) //*listen all USER_POSTS_FETCH_REQUESTED actions and run fetchUserPosts
  // yield takeLatest(USER_POSTS_FETCH_REQUESTED, fetchUserPosts) //*run only last USER_POSTS_FETCH_REQUESTED action witch come
  // yield takeLeading(USER_POSTS_FETCH_REQUESTED, fetchUserPosts) //*run only first USER_POSTS_FETCH_REQUESTED action witch come

  // while(true) {
  //   const action = yield take(USER_POSTS_FETCH_REQUESTED)
  //   yield call(fetchUserPosts, action) //* take & call - are block next run until finishing
  // }

  //* takeEvery based on take
  // while(true) {
  //   const action = yield take(USER_POSTS_FETCH_REQUESTED)
  //   yield fork(fetchUserPosts, action) //* fork - non-blocking effect
  // }

  //* takeLeading based on take
  // while(true) {
  //   const action = yield take(USER_POSTS_FETCH_REQUESTED)
  //   yield call(fetchUserPosts, action) //* call - blocking effect
  // }

  //* takeLatest based on take
  let task;
  while (true) {
    const action = yield take(USER_POSTS_FETCH_REQUESTED);

    if (task) {
      yield cancel(task);
    }
    task = yield fork(fetchUserPosts, action); //* fork - non-blocking effect
  }
}

export function* takeSaga() {
  yield userPostsFetchWatcherSaga();
}
