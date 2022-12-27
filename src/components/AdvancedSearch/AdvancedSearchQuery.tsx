import { useQuery } from '@tanstack/react-query';
import { Space, Table, Tag } from 'antd';
import { useRouter } from 'next/router';
// import type { SortOrder } from 'antd/lib/table/interface';
// import Link from 'next/link';
import useLocalStorageState from 'use-local-storage-state';
import { useTranslation } from 'next-i18next';
// import { Course } from '../../types';

import { getCourses } from '../../graphql/fetcher';
import { CourseQueryFilterInput } from '../../types';
import AdvancedMapComponent from '../Maps/AdvancedMapComponent';

function AdvancedSearchQuery() {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const [query, setQuery] = useLocalStorageState('advanced_search', {
    defaultValue: {
      filter: {},
      limit: 50,
      events: {},
      skip: 0,
    },
  });
  console.log('query: ', query);
  if (query.limit !== 50) {
    setQuery({
      ...query,
      limit: 50,
    });
  }
  const { data, failureReason, isError, isLoading } = useQuery({
    queryKey: [`courses_${JSON.stringify(query)}`],
    queryFn: async () => {
      const { filter, limit } = query;
      const filterAsFilterInput = filter as CourseQueryFilterInput;
      const data = await getCourses({
        filter: filterAsFilterInput,
        limit,
      });
      return data;
    },
    retry: 2,
  });
  if (isError) {
    console.log(failureReason);
    return (
      <div>
        <>{t('common:search_error')}</>
      </div>
    );
  }
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  console.log('data: ', data);
  const locations = data?.courses.map((course) => {
    const { locationInfo } = course;
    const { location } = locationInfo;
    const { coordinates } = location;
    if (!coordinates) {
      return {
        id: course._id,
        name: course.name,
        slug: course.slug,
        lat: undefined,
        lng: undefined,
      };
    }
    return {
      id: course._id,
      name: course.name,
      slug: course.slug,
      lat: coordinates[1],
      lng: coordinates[0],
    };
  });
  return <AdvancedMapComponent locations={locations} />;
}

export default AdvancedSearchQuery;
