export const actionTypes = {
  SET_COURSES: 'DGCLR_SET_COURSES',
  SET_SEARCH_QUERY: 'DGCLR_SET_SEARCH_QUERY',
};

/**
 * Set courses action
 * @param {Array} courses
 * @return {Object} action of SET_COURSES
 */
export const setCourses = (courses = []) => ({ type: actionTypes.SET_COURSES, courses });

/**
 * Set search query action
 * @param {Array} courses
 * @param {String} query
 * @return {Object} action of SET_SEARCH_QUERY
 */
export const setSearchQuery = (courses = [], query) => ({
  type: actionTypes.SET_SEARCH_QUERY,
  courses,
  query,
});
