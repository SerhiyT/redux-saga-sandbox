import { buffers } from "@redux-saga/core";
import { actionChannel, call, put, take } from "@redux-saga/core/effects";
import { getUserPosts } from "../api/posts";
import { USER_POSTS_FETCH_REQUESTED, USER_POST_FETCH_SUCCEEDED } from "./actions";


function* fetchUserPosts(action) {
  console.log(`Processing action: ${action.type}; dispatchId: ${action.payload.id}`);
  const userPosts = yield call(getUserPosts, action.payload.userId)
  yield put({
    type: USER_POST_FETCH_SUCCEEDED,
    payload: {
      data: userPosts
    }
  })
}


export function* userPostFetchWatcherWithBuffer() {
  const limit = 2;
  const initialSize = 2;
  const requestChannel = yield actionChannel(
    USER_POSTS_FETCH_REQUESTED,
    // buffers.none()  //* no buffering, new messages will be lost if there are no pending takers
    // buffers.fixed(limit) //* new messages will be buffered up to limit. Overflow will raise an Error. Default limit = 10.
    // buffers.expanding(initialSize) //* like fixed but Overflow will cause the buffer to expand dynamically.
    // buffers.dropping(limit) //* same as fixed but Overflow will silently drop the messages.
    // buffers.sliding(limit) //* same as fixed but Overflow will insert the new message at the end and drop the oldest message in the buffer.
  )

  while(true) {
    const action = yield take(requestChannel)
    yield call(fetchUserPosts, action)
  }
}