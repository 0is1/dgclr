import { combineReducers } from 'redux';

import search, { initialState as searchInitialState } from 'components/SearchContainer/reducers';

export const DEFAULT_STATE = {
  search: searchInitialState,
};

export default combineReducers({
  search,
});
