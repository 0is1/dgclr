import { Course } from "../types";

type CourseBySlug = {
  courseBySlug: Course[];
};
export const getCourseDataFromCourseBySlug = (courseBySlug?: CourseBySlug) => {
  if (!courseBySlug) {
    return null;
  }
  return courseBySlug.courseBySlug[0];
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
