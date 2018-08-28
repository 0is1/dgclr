export const actionTypes = {
  LOAD_DATA: 'DGCLR_LOAD_DATA',
  LOAD_DATA_SUCCESS: 'DGCLR_LOAD_DATA_SUCCESS',
  LOAD_DATA_ERROR: 'DGCLR_LOAD_DATA_ERROR',
  SET_COURSES: 'DGCLR_SET_COURSES',
};

export function loadData() {
  return { type: actionTypes.LOAD_DATA };
}

export function loadDataSuccess(data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data,
  };
}

export function loadDataError(error) {
  return {
    type: actionTypes.LOAD_DATA_ERROR,
    error,
  };
}

export const setCourses = (courses = []) => ({ type: actionTypes.SET_COURSES, courses });
