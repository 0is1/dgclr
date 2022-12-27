import { useQuery } from '@tanstack/react-query';
import { SearchCourseBySlug } from '../types';
import { getCourseBySlug } from '../graphql/fetcher';

const useGetCourseBySlug = (slug: string) => {
  const { data, error, isLoading } = useQuery<SearchCourseBySlug>({
    queryKey: [`courseBySlug_${slug}`],
    queryFn: async () => {
      if (!slug) throw new Error('slug missing');
      const data = await getCourseBySlug(`${slug}`);
      return data;
    },
  });

  return { data, error, isLoading };
};

export default useGetCourseBySlug;
