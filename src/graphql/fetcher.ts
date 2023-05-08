import { omitHiddenLayoutsFromCourses } from '../helpers/course';
import { isArrayWithLength } from '../helpers/utils';
import {
  CourseQueryFilterInput,
  SearchCourseByName,
  SearchCourseBySlug,
  SearchCourses,
  SearchNearbyCourses,
} from '../types';

const getAbsoluteOrRelativeUrl = (relativeUrl: string) => {
  if (process.env.VERCEL_URL) {
    return `${process.env.VERCEL_URL}${relativeUrl}`;
  }
  return relativeUrl;
};

export const getCoursesByName = async (query: string) => {
  const url = getAbsoluteOrRelativeUrl(
    `/api/search-course-by-name?query=${query}`
  );
  const response = await fetch(url);
  const data = (await response.json()) as SearchCourseByName;
  const result = omitHiddenLayoutsFromCourses(data.courseByName);
  return { courseByName: result } as SearchCourseByName;
};

export const getNearbyCourses = async (
  coordinates: number[],
  maxDistance: number
) => {
  if (!isArrayWithLength(coordinates, 2)) {
    return { nearbyCourse: [] } as SearchNearbyCourses;
  }
  const url = getAbsoluteOrRelativeUrl(
    `/api/search-nearby-courses?coordinates=${JSON.stringify(
      coordinates
    )}&maxDistance=${maxDistance}`
  );
  const response = await fetch(url);
  const data = (await response.json()) as SearchNearbyCourses;
  const result = omitHiddenLayoutsFromCourses(data.nearbyCourse);
  return { nearbyCourse: result } as SearchNearbyCourses;
};

export const getCourseBySlug = async (slug: string) => {
  const url = getAbsoluteOrRelativeUrl(
    `/api/search-course-by-slug?slug=${slug}`
  );
  const response = await fetch(url);
  const data = (await response.json()) as SearchCourseBySlug;
  const result = omitHiddenLayoutsFromCourses(data.courseBySlug);
  return { courseBySlug: result } as SearchCourseBySlug;
};

export const getCourses = async ({
  filter,
  limit,
}: {
  filter: CourseQueryFilterInput;
  limit: number;
}) => {
  const stringifiedFilter = JSON.stringify(filter);
  const url = getAbsoluteOrRelativeUrl(
    `/api/search-courses?filter=${stringifiedFilter}&limit=${limit}`
  );
  const response = await fetch(url);
  const data = (await response.json()) as SearchCourses;
  const result = omitHiddenLayoutsFromCourses(data.courses);
  return { courses: result } as SearchCourses;
};
