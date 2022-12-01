import { Course } from "../types";

type SearchCourseBySlug = {
  courseBySlug: Course[];
};
export const getCourseDataFromSearchCourseBySlug = (
  data?: SearchCourseBySlug
) => {
  if (!data || !data.courseBySlug) {
    return undefined;
  }
  return data.courseBySlug[0];
};

export const getCourseNameFromCourseData = (data?: Course) => {
  if (!data) {
    return null;
  }
  return data.name;
};

export const getCourseAddressFromCourseData = (data?: Course) => {
  if (!data?.locationInfo) {
    return "";
  }
  const { address, city, zip } = data.locationInfo;
  if (!address || !city || !zip) {
    return "";
  }
  return `${address}, ${zip} ${city}`;
};

export const getLocationCoordinatesFromCourseData = (data?: Course) => {
  if (!data?.locationInfo?.location?.coordinates) {
    return undefined;
  }
  return data.locationInfo.location.coordinates;
};

export const getCourseLayoutImage = (
  course: Course | null,
  layoutIndex: string
) => {
  if (!course) {
    return "";
  }
  const layout = course.layouts[parseInt(layoutIndex, 10)];
  if (!layout) {
    return "";
  }
  return layout.mapUrl;
};

export const getTabListFromCourseLayouts = (course: Course | null) => {
  if (!course || !course.layouts) {
    return [];
  }
  return course.layouts.map((layout, index) => {
    return {
      key: index.toString(),
      tab: layout.name,
    };
  });
};
export const getCourseLayoutByIndex = (
  course: Course | null,
  layoutIndex: string
) => {
  if (!course || !course.layouts) {
    return null;
  }
  return course.layouts[parseInt(layoutIndex, 10)];
};

export const getCourseInfo = (course: Course | null) => {
  if (!course) {
    return null;
  }
  return {
    ...course.courseInfo,
    ...course.locationInfo,
  };
};
