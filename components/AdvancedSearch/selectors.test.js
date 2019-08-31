/* eslint-env jest */
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { DEFAULT_STATE } from 'lib/rootReducer';
import {
  getAdvancedMapZoom,
  getCurrentAdvancedFilter,
  getFilterTypeData,
  isAdvancedSearchMapVisible,
  isAdvancedSearchOpen,
  latestAdvancedQuery,
  latestQuery,
  queryResultsFromState,
} from './selectors';

describe('SearchContainer selectors', () => {
  describe('getAdvancedMapZoom', () => {
    it('Return default value from default state', () => {
      const result = getAdvancedMapZoom(DEFAULT_STATE);
      expect(result).toEqual(9);
    });
    it('Return default value if value undefined', () => {
      const result = getAdvancedMapZoom({ ...DEFAULT_STATE, search: { advancedSearchMapZoom: null } });
      expect(result).toEqual(9);
    });
    it('Return correct value', () => {
      const result = getAdvancedMapZoom({ ...DEFAULT_STATE, search: { advancedSearchMapZoom: 11 } });
      expect(result).toEqual(11);
    });
  });
  describe('queryResultsFromState', () => {
    it('Return query result with initialState', () => {
      const result = queryResultsFromState(DEFAULT_STATE, 'query');
      expect(result).toEqual([]);
    });
    it('Return query result with return value', () => {
      const query = 'query';
      const result = queryResultsFromState({ ...DEFAULT_STATE, search: { queries: { [query]: mockCoursesData } } }, query);
      expect(result).toEqual(mockCoursesData);
    });
  });
  describe('latestQuery', () => {
    it('Return latestQuery result with initialState', () => {
      const result = latestQuery(DEFAULT_STATE);
      expect(result).toEqual('');
    });
    it('Return latestQuery result with return value', () => {
      const query = 'query';
      const result = latestQuery({ ...DEFAULT_STATE, search: { queryHistory: [query] } });
      expect(result).toEqual(query);
    });
  });
  describe('latestAdvancedQuery', () => {
    it('Return latestAdvancedQuery result with initialState', () => {
      const result = latestAdvancedQuery(DEFAULT_STATE);
      expect(result).toEqual('');
    });
    it('Return latestAdvancedQuery result with return value', () => {
      const query = 'advancedQuery';
      const result = latestAdvancedQuery({
        ...DEFAULT_STATE,
        search: { advancedQueryHistory: [query] },
      });
      expect(result).toEqual(query);
    });
  });
  describe('isAdvancedSearchOpen', () => {
    it('Return isAdvancedSearchOpen result with initialState', () => {
      const result = isAdvancedSearchOpen(DEFAULT_STATE);
      expect(result).toEqual(false);
    });
    it('Return isAdvancedSearchOpen result with return value', () => {
      const open = true;
      const result = isAdvancedSearchOpen({
        ...DEFAULT_STATE,
        search: { advancedSearchOpen: open },
      });
      expect(result).toEqual(open);
    });
  });
  describe('getFilterTypeData', () => {
    it('Return getFilterTypeData result with initialState', () => {
      const result = getFilterTypeData(DEFAULT_STATE);
      expect(result).toEqual([]);
    });
    it('Return getFilterTypeData result with return value', () => {
      const key = 'basketType';
      const data = [{ value: 'value', label: 'label' }];
      const result = getFilterTypeData(
        {
          ...DEFAULT_STATE,
          search: { advancedQueries: { [key]: data } },
        },
        key,
      );
      expect(result).toEqual(data);
    });
  });
  describe('getCurrentAdvancedFilter', () => {
    it('Return getCurrentAdvancedFilter result with initialState', () => {
      const result = getCurrentAdvancedFilter(DEFAULT_STATE);
      expect(result).toEqual('{}');
    });
    it('Return getCurrentAdvancedFilter result with return value', () => {
      const advancedFilter = '{filter:{}}';
      const result = getCurrentAdvancedFilter({
        ...DEFAULT_STATE,
        search: { currentAdvancedFilter: advancedFilter },
      });
      expect(result).toEqual(advancedFilter);
    });
  });
  describe('isAdvancedSearchMapVisible', () => {
    it('Return isAdvancedSearchMapVisible true', () => {
      const result = isAdvancedSearchMapVisible(DEFAULT_STATE);
      expect(result).toEqual(true);
    });
    it('Return isAdvancedSearchMapVisible false', () => {
      const result = isAdvancedSearchMapVisible({ ...DEFAULT_STATE, search: { ...DEFAULT_STATE.search, advancedSearchMapVisible: false } });
      expect(result).toEqual(false);
    });
  });
});
