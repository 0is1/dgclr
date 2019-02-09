/* eslint-env jest */
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import {
  actionTypes,
  setCourses,
  setSearchQuery,
  toggleAdvancedSearch,
  setFilter,
  setAdvancedSearchQuery,
  setCurrentAdvancedSearchFilter,
  toggleAdvancedSearchMap,
} from './actions';

describe('SearchContainer actions', () => {
  it('Return valid action from setCourses', () => {
    const expected = { type: actionTypes.SET_COURSES, courses: mockCoursesData };
    expect(setCourses(mockCoursesData)).toEqual(expected);
  });
  it('Return valid action from setSearchQuery', () => {
    const query = 'espoo';
    const expected = { type: actionTypes.SET_SEARCH_QUERY, courses: mockCoursesData, query };
    expect(setSearchQuery(mockCoursesData, query)).toEqual(expected);
  });
  it('Return valid action from toggleAdvancedSearch (true)', () => {
    const open = true;
    const expected = { type: actionTypes.TOGGLE_ADVANCED_SEARCH, open };
    expect(toggleAdvancedSearch(open)).toEqual(expected);
  });
  it('Return valid action from toggleAdvancedSearch (false)', () => {
    const open = false;
    const expected = { type: actionTypes.TOGGLE_ADVANCED_SEARCH, open };
    expect(toggleAdvancedSearch(open)).toEqual(expected);
  });
  it('Return valid action from setFilter', () => {
    const filterName = 'filter';
    const data = [{ value: 'value', label: 'label' }];
    const expected = { type: actionTypes.SET_ADVANCED_FILTER_TYPE, filterName, data };
    expect(setFilter(filterName, data)).toEqual(expected);
  });
  it('Return valid action from setAdvancedSearchQuery', () => {
    const query = 'query';
    const courses = mockCoursesData;
    const expected = { type: actionTypes.SET_ADVANCED_SEARCH_QUERY, query, courses };
    expect(setAdvancedSearchQuery(courses, query)).toEqual(expected);
  });
  it('Return valid action from setCurrentAdvancedSearchFilter', () => {
    const filter = 'filter';
    const expected = { type: actionTypes.SET_CURRENT_ADVANCED_FILTER, filter };
    expect(setCurrentAdvancedSearchFilter(filter)).toEqual(expected);
  });
  it('Return valid action from toggleAdvancedSearchMap', () => {
    const visible = false;
    const expected = { type: actionTypes.TOGGLE_ADVANCED_SEARCH_MAP, visible };
    expect(toggleAdvancedSearchMap(visible)).toEqual(expected);
  });
});
