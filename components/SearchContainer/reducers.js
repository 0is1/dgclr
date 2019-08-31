import update from 'updeep';
import { createReducer } from 'lib/createReducer';
import { actionTypes } from './actions';

export const initialState = {
  queries: {},
  queryHistory: [],
  error: false,
};

const addQueryHistory = (queryHistory, query) => [].concat([query], queryHistory);

const reducer = createReducer({
  [actionTypes.SET_SEARCH_QUERY]: (state, action) => {
    const { courses, query } = action;
    return update({ queries: { [query]: courses }, queryHistory: addQueryHistory(state.queryHistory, query) }, state);
  },
});

export default reducer;
