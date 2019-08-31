import { keyBy } from 'lodash/fp';
import update, { updateIn } from 'updeep';
import { createReducer } from 'lib/createReducer';
import { MAP_DEFAULT_ZOOM } from 'lib/constants';
import { actionTypes } from './actions';

export const initialState = {
  advancedSearchOpen: false,
  advancedQueries: {
    rating: [],
  },
  advancedQueryHistory: [],
  currentAdvancedFilter: '{}',
  advancedSearchMapVisible: true,
  advancedSearchMapZoom: MAP_DEFAULT_ZOOM,
  courses: {},
  queries: {},
  queryHistory: [],
  error: false,
};

const addQueryHistory = (queryHistory, query) => [].concat([query], queryHistory);

const reducer = createReducer({
  [actionTypes.SET_COURSES]: (state, action) => {
    const courses = keyBy(course => course.slug, action.courses);
    return update({ courses }, state);
  },
  [actionTypes.SET_SEARCH_QUERY]: (state, action) => {
    const { courses, query } = action;
    return update({ queries: { [query]: courses }, queryHistory: addQueryHistory(state.queryHistory, query) }, state);
  },
  [actionTypes.SET_ADVANCED_SEARCH_QUERY]: (state, action) => {
    const { courses, query } = action;
    return update(
      {
        queries: { [query]: courses },
        advancedQueryHistory: addQueryHistory(state.advancedQueryHistory, query),
      },
      state,
    );
  },
  [actionTypes.TOGGLE_ADVANCED_SEARCH]: (state, action) => {
    const { open } = action;
    return { ...state, advancedSearchOpen: open };
  },
  [actionTypes.SET_ADVANCED_FILTER_TYPE]: (state, action) => {
    const { filterName, data } = action;
    return updateIn(['advancedQueries', filterName], data);
  },
  [actionTypes.SET_CURRENT_ADVANCED_FILTER]: (state, action) => {
    const { filter } = action;
    return { ...state, currentAdvancedFilter: filter };
  },
  [actionTypes.TOGGLE_ADVANCED_SEARCH_MAP]: (state, action) => {
    const { visible } = action;
    return { ...state, advancedSearchMapVisible: visible };
  },
  [actionTypes.SET_ADVANCED_MAP_ZOOM]: (state, action) => {
    const { zoom } = action;
    return { ...state, advancedSearchMapZoom: zoom };
  },
});

export default reducer;