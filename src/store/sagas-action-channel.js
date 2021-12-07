// *run request one by one (after finish first, run next and etc.) Action Channel
// *Most often used when it is necessary to react to events from the redux store.
import { getUserPosts } from "../api/posts";
import { USER_POST_FETCH_FAILED, USER_POSTS_FETCH_REQUESTED, USER_POST_FETCH_SUCCEEDED } from "./actions";
import { put, call, take, actionChannel } from 'redux-saga/effects'
import { buffers } from "@redux-saga/core";

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
  const requestChannel = yield actionChannel(USER_POSTS_FETCH_REQUESTED)

  // *run only 1 request (first income)
  // const requestChannelWithoutBuffers = yield actionChannel(USER_POSTS_FETCH_REQUESTED, buffers.none)

  while(true) {
    const action = yield take(requestChannel)
    yield call(fetchUserPosts, action)
  }
}