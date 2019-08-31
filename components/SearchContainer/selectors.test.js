import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { DEFAULT_STATE } from 'lib/rootReducer';
import { latestQuery, queryResultsFromState } from './selectors';

describe('SearchContainer selectors', () => {
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
});
