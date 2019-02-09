/* eslint-env jest */
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { actionTypes } from './actions';
import reducer, { initialState } from './reducers';

describe('SearchContainer reducers', () => {
  it('Return initialState', () => {
    const action = {};
    expect(reducer(initialState, action)).toEqual(initialState);
  });
  it('Return SET_COURSES', () => {
    const action = { type: actionTypes.SET_COURSES, courses: mockCoursesData };
    const expected = {
      ...initialState,
      courses: {
        [mockCoursesData[0].slug]: mockCoursesData[0],
        [mockCoursesData[1].slug]: mockCoursesData[1],
      },
    };
    expect(reducer(initialState, action)).toEqual(expected);
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
  it('Return TOGGLE_ADVANCED_SEARCH (true)', () => {
    const open = true;
    const action = { type: actionTypes.TOGGLE_ADVANCED_SEARCH, open };
    const expected = {
      ...initialState,
      advancedSearchOpen: open,
    };
    expect(reducer(initialState, action)).toEqual(expected);
  });
  it('Return TOGGLE_ADVANCED_SEARCH (false)', () => {
    const open = false;
    const action = { type: actionTypes.TOGGLE_ADVANCED_SEARCH, open };
    const expected = {
      ...initialState,
      advancedSearchOpen: open,
    };
    expect(reducer(initialState, action)).toEqual(expected);
  });
  it('Return SET_ADVANCED_FILTER_TYPE', () => {
    const filterName = 'filter';
    const data = [{ value: 'value', label: 'label' }];
    const action = { type: actionTypes.SET_ADVANCED_FILTER_TYPE, filterName, data };
    const expected = {
      ...initialState,
      advancedQueries: {
        ...initialState.advancedQueries,
        [filterName]: data,
      },
    };
    expect(reducer(initialState, action)).toEqual(expected);
  });
  it('Return SET_ADVANCED_SEARCH_QUERY', () => {
    const query = 'query';
    const courses = mockCoursesData;
    const action = { type: actionTypes.SET_ADVANCED_SEARCH_QUERY, query, courses };
    const expected = {
      ...initialState,
      queries: { [query]: courses },
      advancedQueryHistory: [query],
    };
    expect(reducer(initialState, action)).toEqual(expected);
  });
  it('Return SET_CURRENT_ADVANCED_FILTER', () => {
    const filter = 'filter';
    const action = { type: actionTypes.SET_CURRENT_ADVANCED_FILTER, filter };
    const expected = {
      ...initialState,
      currentAdvancedFilter: filter,
    };
    expect(reducer(initialState, action)).toEqual(expected);
  });
  it('Return TOGGLE_ADVANCED_SEARCH_MAP', () => {
    const visible = false;
    const action = { type: actionTypes.TOGGLE_ADVANCED_SEARCH_MAP, visible };
    const expected = {
      ...initialState,
      advancedSearchMapVisible: false,
    };
    expect(reducer(initialState, action)).toEqual(expected);
  });
});
