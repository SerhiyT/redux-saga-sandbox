import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers/rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './store/sagas'
import { userPostsRequestedWatcherSaga } from './store/sagas-action-channel';
import { loginFlowSaga } from './store/sagas-login';
import { forkSaga } from './store/sagas-fork';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

// *run all request at the same time - put/takeEvery
// sagaMiddleware.run(rootSaga)

// *run request one by one (after finish first, run next and etc.) Action Channel
// sagaMiddleware.run(userPostsRequestedWatcherSaga)
// sagaMiddleware.run(loginFlowSaga)
sagaMiddleware.run(forkSaga)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);






