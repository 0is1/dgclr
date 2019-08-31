/* eslint-env jest */
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { actionTypes } from './actions';
import reducer, { initialState } from './reducers';

describe('SearchContainer reducers', () => {
  it('Return initialState', () => {
    const action = {};
    expect(reducer(initialState, action)).toEqual(initialState);
  });
  it('Return SET_SEARCH_QUERY', () => {
    const query = 'espoo';
    const action = { type: actionTypes.SET_SEARCH_QUERY, courses: mockCoursesData, query };
    const expected = {
      ...initialState,
      queries: { [query]: mockCoursesData },
      queryHistory: [query],
    };
    expect(reducer(initialState, action)).toEqual(expected);
  });
});
