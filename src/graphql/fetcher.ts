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
  return data;
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
  return data;
};

export const getCourseBySlug = async (slug: string) => {
  const url = getAbsoluteOrRelativeUrl(
    `/api/search-course-by-slug?slug=${slug}`
  );
  const response = await fetch(url);
  const data = (await response.json()) as SearchCourseBySlug;
  return data;
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
  return data;
};
