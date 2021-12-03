// *run all request at the same time - put/takeEvery
import { getUserPosts } from "../api/posts";
import { USER_POST_FETCH_FAILED, USER_POST_FETCH_REQUEST, USER_POST_FETCH_SUCCEEDED } from "./actions";
import { all, put, call, takeEvery } from 'redux-saga/effects'

function* fetchUserPosts(action) {
  try {
    const userPosts = yield call(getUserPosts, action.payload.userId)
    yield put({
      type: USER_POST_FETCH_SUCCEEDED,
      payload: {
        data: userPosts,
      }
    })
  } catch(err) {
    yield put({
      type: USER_POST_FETCH_FAILED,
      payload: err.message,
    })

  }
}

export function* userPostsRequestedWatcherSaga() {
  yield takeEvery(USER_POST_FETCH_REQUEST, fetchUserPosts)
}

// eslint-disable-next-line require-yield
export function* someSaga() {
 console.log('%cqqq: someSaga', 'color: green;');
}

export function* rootSaga() {
  yield all([
    userPostsRequestedWatcherSaga(),
    someSaga()
  ])
}