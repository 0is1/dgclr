import { Course } from '../types';

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
    return '';
  }
  const { address, city, zip } = data.locationInfo;
  if (!address || !city || !zip) {
    return '';
  }
  return `${address}, ${zip} ${city}`;
};

export const getCourseCoordinatesFromCourseData = (data?: Course) => {
  if (!data?.locationInfo?.location?.coordinates) {
    return [];
  }
  return data.locationInfo.location.coordinates;
};

export const getLocationCoordinatesFromCourseData = (data?: Course) => {
  if (!data?.locationInfo?.location?.coordinates) {
    return undefined;
  }
  return data.locationInfo.location.coordinates;
};

export const getCourseLayoutImage = (
  course: Course | undefined,
  layoutIndex: string
) => {
  if (!course) {
    return '';
  }
  const layout = course.layouts[parseInt(layoutIndex, 10)];
  if (!layout) {
    return '';
  }
  return layout.mapUrl;
};

export const getTabListFromCourseLayouts = (course: Course | undefined) => {
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
export const getRatingListFromCourseLayouts = (course: Course | undefined) => {
  if (!course || !course.layouts) {
    return [];
  }
  return course.layouts
    .map((layout, index) => {
      return {
        key: index.toString(),
        rating: layout.rating,
      };
    })
    .filter((layout) => layout.rating);
};

export const getCourseLayoutByIndex = (
  course: Course | undefined,
  layoutIndex: string
) => {
  if (!course || !course.layouts) {
    return null;
  }
  return course.layouts[parseInt(layoutIndex, 10)];
};

export const getCourseInfo = (course: Course | undefined) => {
  if (!course) {
    return null;
  }
  return {
    ...course.courseInfo,
    ...course.locationInfo,
  };
};

export const omitHiddenLayoutsFromCourses = (courses: Course[]) => {
  const coursesWithoutHiddenLayouts = courses.map((course) => {
    const { layouts } = course;
    if (!layouts?.length) return course;
    const layoutsWithoutHidden = layouts.filter((layout) => !layout.hidden);
    return { ...course, layouts: layoutsWithoutHidden };
  });
  return coursesWithoutHiddenLayouts;
};

export const getCourseInitialNameFromSlug = (slug: string) => {
  // slug is in the format of "course-name-city" like "golf-club-berlin"
  const initialName = slug.split('-').slice(0, -1).join(' ');
  // convert first word first letter to uppercase
  return initialName.charAt(0).toUpperCase() + initialName.slice(1);
};
