import { keyBy } from 'lodash/fp';
import update, { updateIn } from 'updeep';
import { createReducer } from 'lib/createReducer';
import { actionTypes } from './actions';

export const initialState = {
  advancedSearchOpen: false,
  advancedQueries: {
    rating: [],
  },
  advancedQueryHistory: [],
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
    return update(
      { queries: { [query]: courses }, queryHistory: addQueryHistory(state.queryHistory, query) },
      state,
    );
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
  [actionTypes.SET_ADVANCED_RATING_FILTER]: (state, action) => {
    const { rating } = action;
    return updateIn(['advancedQueries', 'rating'], rating);
  },
  [actionTypes.SET_ADVANCED_BASKET_TYPE_FILTER]: (state, action) => {
    const { basketType } = action;
    return updateIn(['advancedQueries', 'basketType'], basketType);
  },
});

export default reducer;
