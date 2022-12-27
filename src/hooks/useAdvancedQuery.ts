import useLocalStorageState from 'use-local-storage-state';
import { CourseQueryParams } from '../types';
import { DEFAULT_LIMIT } from '../utils/constants';

function useAdvancedQuery() {
  const [query, setQuery] = useLocalStorageState<CourseQueryParams>(
    'advanced_search',
    {
      defaultValue: {
        filter: {
          courseInfo: undefined,
          locationInfo: undefined,
          rating: undefined,
          nearby: undefined,
          holeAverageLength: undefined,
        },
        limit: DEFAULT_LIMIT,
        skip: 0,
      },
    }
  );
  return { query, setQuery };
}

export default useAdvancedQuery;
