import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers/rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './store/sagas/sagas';
import { userPostsRequestedWatcherSaga } from './store/sagas/sagas-action-channel';
import { loginFlowSaga } from './store/sagas/sagas-login';
import { forkSaga } from './store/sagas/sagas-fork';
import { takeSaga } from './store/sagas/sagas-takes';
import { eventChannelSaga } from './store/sagas/saga-event-channel';
import { channelSaga } from './store/sagas/saga-channel';
import { handleFilesUploading } from './store/sagas/saga-channel-upload';
import { userPostFetchWatcherWithBuffer } from './store/sagas/sagas-action-channel-with-buffer';
import { sagaThrottleDebounce } from './store/sagas/sagas-throttle-debounce';
import * as postAPI from './api/posts';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware({
  context: {
    postAPI,
  },
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

// *run all request at the same time - put/takeEvery
// sagaMiddleware.run(rootSaga)

// *run request one by one (after finish first, run next and etc.) Action Channel
sagaMiddleware.run(userPostsRequestedWatcherSaga);
// sagaMiddleware.run(loginFlowSaga)
// sagaMiddleware.run(forkSaga)
// sagaMiddleware.run(takeSaga)
// sagaMiddleware.run(eventChannelSaga)
// sagaMiddleware.run(channelSaga)
// sagaMiddleware.run(handleFilesUploading)
// sagaMiddleware.run(userPostFetchWatcherWithBuffer)
// sagaMiddleware.run(sagaThrottleDebounce)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
