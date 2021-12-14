import { call, fork, put, spawn } from '@redux-saga/core/effects';
import { getUserAlbums } from '../api/albums';
import { getUserPosts } from '../api/posts';
import { SAVE_USER_ALBUMS, SAVE_USER_POSTS } from './actions';

function* fetchAlbums(userId) {
  const data = yield call(getUserAlbums, userId);
  yield put({
    type: SAVE_USER_ALBUMS,
    payload: {
      data,
    },
  });
}

function* fetchPosts(userId) {
  const data = yield call(getUserPosts, userId);
  yield put({
    type: SAVE_USER_POSTS,
    payload: {
      data,
    },
  });
}

function* fetchUserData(userId) {
  //*detached fork, tied to the parent, error up to parent, parent sagas will be canceled
  yield fork(fetchAlbums, userId);
  yield fork(fetchPosts, userId);

  //*detached spawn, not tied to the parent, error don`t up to parent, parent sagas will not be canceled
  //**also if parent task will be canceled child task will not be canceled
  // yield spawn(fetchAlbums, userId)
  // yield spawn(fetchPosts, userId)
  console.log('%cqqq: done', 'color: green;');
}

export function* forkSaga() {
  const userId = 3;
  yield call(fetchUserData, userId);
}
