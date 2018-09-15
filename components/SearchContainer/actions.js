export const actionTypes = {
  SET_COURSES: 'DGCLR_SET_COURSES',
  SET_SEARCH_QUERY: 'DGCLR_SET_SEARCH_QUERY',
  TOGGLE_ADVANCED_SEARCH: 'DGCLR_TOGGLE_ADVANCED_SEARCH',
  SET_ADVANCED_SEARCH_QUERY: 'DGCLR_SET_ADVANCED_SEARCH_QUERY',
  SET_ADVANCED_FILTER_TYPE: 'DGCLR_SET_ADVANCED_FILTER_TYPE',
  SET_CURRENT_ADVANCED_FILTER: 'DGCLR_SET_CURRENT_ADVANCED_FILTER',
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

/**
 * Toggle advanced search open
 * @param {boolean} open
 * @return {Object} action of TOGGLE_ADVANCED_SEARCH
 */
export const toggleAdvancedSearch = (open = false) => ({
  type: actionTypes.TOGGLE_ADVANCED_SEARCH,
  open,
});

/**
 * Set filter data to store
 * @param {string} filterName
 * @param {Array} data
 * @return {Object} action of SET_ADVANCED_BASKET_TYPE_FILTER
 */
export const setFilter = (filterName = '', data = []) => ({
  type: actionTypes.SET_ADVANCED_FILTER_TYPE,
  filterName,
  data,
});

/**
 * Set advanced search query action
 * @param {Array} courses
 * @param {String} query
 * @return {Object} action of SET_ADVANCED_SEARCH_QUERY
 */
export const setAdvancedSearchQuery = (courses = [], query) => ({
  type: actionTypes.SET_ADVANCED_SEARCH_QUERY,
  courses,
  query,
});

/**
 * Set current advanced search filters
 * @param {String} filter stringified JSON
 * @return {Object} action of SET_CURRENT_ADVANCED_FILTER
 */
export const setCurrentAdvancedSearchFilter = (filter = '') => ({
  type: actionTypes.SET_CURRENT_ADVANCED_FILTER,
  filter,
});
