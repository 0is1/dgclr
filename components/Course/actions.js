// @flow
import type { Course } from 'lib/types';

export const actionTypes = {
  SET_COURSES: 'dgclr/SET_COURSES',
};

/**
 * Set courses action
 * @param {Array} courses
 * @return {Object} action of SET_COURSES
 */
export const setCourses = (courses: Array<Course> = []) => ({
  type: actionTypes.SET_COURSES,
  courses,
});
