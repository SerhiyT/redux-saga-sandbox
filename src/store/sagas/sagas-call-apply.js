import { apply, call, put, takeEvery } from 'redux-saga/effects';
import { USER_POSTS_FETCH_REQUESTED, USER_POST_FETCH_SUCCEEDED } from '../actions';

const createPostService = (baseUrl) => {
  return {
    getUrl(userId) {
      return `${baseUrl}/users/${userId}/posts`;
    },
    getUserPosts(userId) {
      return fetch(this.getUrl(userId)).then((res) => res.json());
    },
  };
};

const postService = createPostService('https://jsonplaceholder.typicode.com');

function* fetchUserPosts(action) {
  // const userPost = yield call(postService.getUserPosts, action.payload.userId);

  // postService.getUserPosts
  //   .call(postService, action.payload.userId)
  //   .then((res) => console.log('%cqqq: res', 'color: green;', res));

  // postService.getUserPosts
  //   .apply(postService, [action.payload.userId])
  //   .then((res) => console.log('%cqqq: res', 'color: green;', res));

  // const userPost = yield call([postService, postService.getUserPosts], action.payload.userId);
  const userPost = yield apply(postService, postService.getUserPosts, [action.payload.userId]);

  yield put({
    type: USER_POST_FETCH_SUCCEEDED,
    payload: {
      data: userPost,
    },
  });
}

export function* userPostFetchCallApplyWatcherSaga() {
  yield takeEvery(USER_POSTS_FETCH_REQUESTED, fetchUserPosts);
}
