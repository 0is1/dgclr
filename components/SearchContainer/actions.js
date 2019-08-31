// @flow
import type { Course } from 'lib/types';

export const actionTypes = {
  SET_SEARCH_QUERY: 'dgclr/SET_SEARCH_QUERY',
};

/**
 * Set search query action
 * @param {Array} courses
 * @param {String} query
 * @return {Object} action of SET_SEARCH_QUERY
 */
export const setSearchQuery = (courses: Array<Course> = [], query: string) => ({
  type: actionTypes.SET_SEARCH_QUERY,
  courses,
  query,
});
