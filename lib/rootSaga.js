import { all } from 'redux-saga/effects';

import search from 'components/SearchContainer/sagas';

function* rootSaga() {
  yield all([search]);
}

export default rootSaga;
