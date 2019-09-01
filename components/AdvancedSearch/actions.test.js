/* eslint-env jest */
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import {
  actionTypes,
  setAdvancedSearchMapZoom,
  setAdvancedSearchQuery,
  setCurrentAdvancedSearchFilter,
  setFilter,
  toggleAdvancedSearchMap,
  toggleAdvancedSearchInputs,
} from './actions';

describe('SearchContainer actions', () => {
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
  it('Return valid action from setAdvancedSearchMapZoom', () => {
    const zoom = 10;
    const expected = { type: actionTypes.SET_ADVANCED_MAP_ZOOM, zoom };
    expect(setAdvancedSearchMapZoom(zoom)).toEqual(expected);
  });
  it('Return valid action from toggleAdvancedSearchInputs (true)', () => {
    const open = true;
    const expected = { type: actionTypes.TOGGLE_ADVANCED_SEARCH_INPUTS, open };
    expect(toggleAdvancedSearchInputs(open)).toEqual(expected);
  });
  it('Return valid action from toggleAdvancedSearchInputs (false)', () => {
    const open = false;
    const expected = { type: actionTypes.TOGGLE_ADVANCED_SEARCH_INPUTS, open };
    expect(toggleAdvancedSearchInputs(open)).toEqual(expected);
  });
});
