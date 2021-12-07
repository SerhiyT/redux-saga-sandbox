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
import { takeSaga } from './store/sagas-takes';
import { eventChannelSaga } from './store/saga-event-channel';
import { channelSaga } from './store/saga-channel';
import { handleFilesUploading } from './store/saga-channel-upload';
import { userPostFetchWatcherWithBuffer } from './store/sagas-action-channel-with-buffer';

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
// sagaMiddleware.run(forkSaga)
// sagaMiddleware.run(takeSaga)
// sagaMiddleware.run(eventChannelSaga)
// sagaMiddleware.run(channelSaga)
// sagaMiddleware.run(handleFilesUploading)
sagaMiddleware.run(userPostFetchWatcherWithBuffer)





ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);






