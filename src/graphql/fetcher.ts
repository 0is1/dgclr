import { SearchCourseByName, SearchCourseBySlug } from "../types";

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

export const getCourseBySlug = async (slug: string) => {
  const url = getAbsoluteOrRelativeUrl(
    `/api/search-course-by-slug?slug=${slug}`
  );
  const response = await fetch(url);
  const data = (await response.json()) as SearchCourseBySlug;
  return data;
};
