import { call, cancel, cancelled, fork, put, take } from "@redux-saga/core/effects";
import { clearToken, login, saveToken } from "../api/user";
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, STOP_LOGIN_PENDING } from "./actions";


function* authorize(username, password) {
  try {
    const token = yield call(login, username, password)
    yield put({ type: LOGIN_SUCCESS, payload: { token }})
    yield call(saveToken, token)
  } catch (err) {
    yield put({ type: LOGIN_ERROR, payload: { err }})
  } finally {
    if(yield cancelled()) {
      yield put({ type: STOP_LOGIN_PENDING })
    }
  }
}


export function* loginFlowSaga() {

  while(true) {
    const { payload } = yield take(LOGIN_REQUEST)
    const authTask = yield fork(authorize, payload.username, payload.password)
    const action = yield take([ LOGOUT, LOGIN_ERROR ])
    if(action.type === LOGOUT) yield cancel(authTask)
    yield call(clearToken)
  }
}