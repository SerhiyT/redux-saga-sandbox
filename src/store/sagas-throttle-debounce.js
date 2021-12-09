import { call, throttle, debounce } from 'redux-saga/effects'
import { saveName } from '../api/user'
import { CHANGE_USERNAME } from './actions'

function* changeUsername(action) {
  console.log('username', action.payload.username)
  yield call(saveName, action.payload.username)
}

export function* sagaThrottleDebounce() {
  yield throttle(500, CHANGE_USERNAME, changeUsername)
  // yield debounce(500, CHANGE_USERNAME, changeUsername)
} 