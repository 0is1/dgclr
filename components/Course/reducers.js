import { keyBy } from 'lodash/fp';
import update from 'updeep';
import { createReducer } from 'lib/createReducer';
import { actionTypes } from './actions';

export const initialState = {};

const reducer = createReducer({
  [actionTypes.SET_COURSES]: (state, action) => {
    const courses = keyBy(course => course.slug, action.courses);
    return update(courses, state);
  },
});

export default reducer;
