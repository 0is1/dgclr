import { combineReducers } from 'redux';

import search, { initialState as searchInitialState } from 'components/SearchContainer/reducers';
import tabs, { initialState as tabsInitialState } from 'components/Tabs/reducers';

export const DEFAULT_STATE = {
  search: searchInitialState,
  tabs: tabsInitialState,
};

export default combineReducers({
  search,
  tabs,
});
