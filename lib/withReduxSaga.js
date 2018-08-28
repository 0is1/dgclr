import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import nextReduxWrapper from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';

import rootReducer, { DEFAULT_STATE } from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState = DEFAULT_STATE) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  // NOTE: https://github.com/zeit/next.js/issues/4057#issue-308481098
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();
  return store;
}

export default function (BaseComponent) {
  return nextReduxWrapper(configureStore)(nextReduxSaga(BaseComponent));
}
