import { combineReducers } from 'redux';

import search, { initialState as searchInitialState } from 'components/SearchContainer/reducers';
import advancedSearch, { initialState as advancedSearchInitialState } from 'components/AdvancedSearch/reducers';
import courses, { initialState as coursesInitialState } from 'components/Course/reducers';
import tabs, { initialState as tabsInitialState } from 'components/Tabs/reducers';

export const DEFAULT_STATE = {
  advancedSearch: advancedSearchInitialState,
  courses: coursesInitialState,
  search: searchInitialState,
  tabs: tabsInitialState,
};

export default combineReducers({
  advancedSearch,
  courses,
  search,
  tabs,
});
