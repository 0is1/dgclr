import u from 'updeep';
import { createReducer } from 'lib/createReducer';
import { MAP_DEFAULT_ZOOM } from 'lib/constants';
import { actionTypes } from './actions';

export const initialState = {
  allAdvancedSearchInputsOpen: false,
  queries: {},
  advancedQueries: {
    rating: [],
  },
  advancedQueryHistory: [],
  currentAdvancedFilter: '{}',
  advancedSearchMapVisible: true,
  advancedSearchMapZoom: MAP_DEFAULT_ZOOM,
};

const addQueryHistory = (queryHistory, query) => [].concat([query], queryHistory);

const reducer = createReducer({
  [actionTypes.SET_ADVANCED_SEARCH_QUERY]: (state, action) => {
    const { courses, query } = action;
    return u(
      {
        queries: { [query]: courses },
        advancedQueryHistory: addQueryHistory(
          state.advancedQueryHistory,
          query,
        ),
      },
      state,
    );
  },
  [actionTypes.SET_ADVANCED_FILTER_TYPE]: (state, action) => {
    const { filterName, data } = action;
    return u.updateIn(['advancedQueries', filterName], data);
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
  [actionTypes.TOGGLE_ADVANCED_SEARCH_INPUTS]: (state, action) => {
    const { open } = action;
    return { ...state, allAdvancedSearchInputsOpen: open };
  },
});

export default reducer;
