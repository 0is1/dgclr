import { DEFAULT_STATE } from 'lib/rootReducer';
import {
  getAdvancedMapZoom,
  getCurrentAdvancedFilter,
  getFilterTypeData,
  isAdvancedSearchMapVisible,
  isAdvancedSearchOpen,
  latestAdvancedQuery,
} from './selectors';

describe('SearchContainer selectors', () => {
  describe('getAdvancedMapZoom', () => {
    it('Return default value from default state', () => {
      const result = getAdvancedMapZoom(DEFAULT_STATE);
      expect(result).toEqual(9);
    });
    it('Return default value if value undefined', () => {
      const result = getAdvancedMapZoom({ ...DEFAULT_STATE, advancedSearch: { advancedSearchMapZoom: null } });
      expect(result).toEqual(9);
    });
    it('Return correct value', () => {
      const result = getAdvancedMapZoom({ ...DEFAULT_STATE, advancedSearch: { advancedSearchMapZoom: 11 } });
      expect(result).toEqual(11);
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
        advancedSearch: { advancedQueryHistory: [query] },
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
        advancedSearch: { advancedSearchOpen: open },
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
          advancedSearch: { advancedQueries: { [key]: data } },
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
        advancedSearch: { currentAdvancedFilter: advancedFilter },
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
      const result = isAdvancedSearchMapVisible({
        ...DEFAULT_STATE,
        advancedSearch: { ...DEFAULT_STATE.search, advancedSearchMapVisible: false },
      });
      expect(result).toEqual(false);
    });
  });
});
