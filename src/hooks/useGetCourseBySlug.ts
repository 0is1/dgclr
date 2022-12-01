import { useQuery } from "@tanstack/react-query";
import { SearchCourseBySlug } from "../types";
import { getCourseBySlug } from "../graphql/fetcher";

const useGetCourseBySlug = (slug: string) => {
  if (!slug) {
    return {
      data: undefined,
      error: new Error("slug missing"),
      isLoading: false,
    };
  }
  const { data, error, isLoading } = useQuery<SearchCourseBySlug>({
    queryKey: [`courseBySlug_${slug}`],
    queryFn: async () => {
      const data = await getCourseBySlug(`${slug}`);
      return data;
    },
  });

  return { data, error, isLoading };
};

export default useGetCourseBySlug;
