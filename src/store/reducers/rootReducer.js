import { combineReducers } from 'redux';
import { loginFlowReducer } from './login-flow-reducer';
import { reducer } from './reducer';

export const rootReducer = combineReducers({
  global: reducer,
  user: loginFlowReducer,
});
