export const actionTypes = {
  SET_COURSES: 'DGCLR_SET_COURSES',
  SET_SEARCH_QUERY: 'DGCLR_SET_SEARCH_QUERY',
  TOGGLE_ADVANCED_SEARCH: 'DGCLR_TOGGLE_ADVANCED_SEARCH',
  SET_ADVANCED_RATING_FILTER: 'DGCLR_SET_ADVANCED_RATING_FILTER',
  SET_ADVANCED_BASKET_TYPE_FILTER: 'DGCLR_SET_ADVANCED_BASKET_TYPE_FILTER',
  SET_ADVANCED_SEARCH_QUERY: 'DGCLR_SET_ADVANCED_SEARCH_QUERY',
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
 * Set rating filter
 * @param {Array} rating
 * @return {Object} action of SET_ADVANCED_RATING_FILTER
 */
export const setRatingFilter = (rating = []) => ({
  type: actionTypes.SET_ADVANCED_RATING_FILTER,
  rating,
});
/**
 * Set basketType filter
 * @param {Array} basketType
 * @return {Object} action of SET_ADVANCED_BASKET_TYPE_FILTER
 */
export const setBasketTypeFilter = (basketType = []) => ({
  type: actionTypes.SET_ADVANCED_BASKET_TYPE_FILTER,
  basketType,
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
