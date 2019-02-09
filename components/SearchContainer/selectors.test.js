/* eslint-env jest */
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { DEFAULT_STATE } from 'lib/rootReducer';
import {
  queryResultsFromState,
  latestQuery,
  latestAdvancedQuery,
  isAdvancedSearchOpen,
  getFilterTypeData,
  getCurrentAdvancedFilter,
  isAdvancedSearchMapVisible,
} from './selectors';

describe('SearchContainer selectors', () => {
  it('Select query result with initialState', () => {
    const result = queryResultsFromState(DEFAULT_STATE, 'query');
    expect(result).toEqual([]);
  });
  it('Select query result with return value', () => {
    const query = 'query';
    const result = queryResultsFromState({ ...DEFAULT_STATE, search: { queries: { [query]: mockCoursesData } } }, query);
    expect(result).toEqual(mockCoursesData);
  });
  it('Select latestQuery result with initialState', () => {
    const result = latestQuery(DEFAULT_STATE);
    expect(result).toEqual('');
  });
  it('Select latestQuery result with return value', () => {
    const query = 'query';
    const result = latestQuery({ ...DEFAULT_STATE, search: { queryHistory: [query] } });
    expect(result).toEqual(query);
  });
  it('Select latestAdvancedQuery result with initialState', () => {
    const result = latestAdvancedQuery(DEFAULT_STATE);
    expect(result).toEqual('');
  });
  it('Select latestAdvancedQuery result with return value', () => {
    const query = 'advancedQuery';
    const result = latestAdvancedQuery({
      ...DEFAULT_STATE,
      search: { advancedQueryHistory: [query] },
    });
    expect(result).toEqual(query);
  });
  it('Select isAdvancedSearchOpen result with initialState', () => {
    const result = isAdvancedSearchOpen(DEFAULT_STATE);
    expect(result).toEqual(false);
  });
  it('Select isAdvancedSearchOpen result with return value', () => {
    const open = true;
    const result = isAdvancedSearchOpen({
      ...DEFAULT_STATE,
      search: { advancedSearchOpen: open },
    });
    expect(result).toEqual(open);
  });
  it('Select latestAdvancedQuery result with initialState', () => {
    const result = latestAdvancedQuery(DEFAULT_STATE);
    expect(result).toEqual('');
  });
  it('Select latestAdvancedQuery result with return value', () => {
    const query = 'advancedQuery';
    const result = latestAdvancedQuery({
      ...DEFAULT_STATE,
      search: { advancedQueryHistory: [query] },
    });
    expect(result).toEqual(query);
  });
  it('Select getFilterTypeData result with initialState', () => {
    const result = getFilterTypeData(DEFAULT_STATE);
    expect(result).toEqual([]);
  });
  it('Select getFilterTypeData result with return value', () => {
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
  it('Select getCurrentAdvancedFilter result with initialState', () => {
    const result = getCurrentAdvancedFilter(DEFAULT_STATE);
    expect(result).toEqual('{}');
  });
  it('Select getCurrentAdvancedFilter result with return value', () => {
    const advancedFilter = '{filter:{}}';
    const result = getCurrentAdvancedFilter({
      ...DEFAULT_STATE,
      search: { currentAdvancedFilter: advancedFilter },
    });
    expect(result).toEqual(advancedFilter);
  });
  it('Select isAdvancedSearchMapVisible true', () => {
    const result = isAdvancedSearchMapVisible(DEFAULT_STATE);
    expect(result).toEqual(true);
  });
  it('Select isAdvancedSearchMapVisible false', () => {
    const result = isAdvancedSearchMapVisible({ ...DEFAULT_STATE, search: { ...DEFAULT_STATE.search, advancedSearchMapVisible: false } });
    expect(result).toEqual(false);
  });
});
