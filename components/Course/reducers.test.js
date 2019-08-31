import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { actionTypes } from './actions';
import reducer, { initialState } from './reducers';

describe('SearchContainer reducers', () => {
  it('Return initialState', () => {
    const action = {};
    expect(reducer(initialState, action)).toEqual(initialState);
  });
  it('Return SET_COURSES', () => {
    const action = { type: actionTypes.SET_COURSES, courses: mockCoursesData };
    const expected = {
      ...initialState,
      [mockCoursesData[0].slug]: mockCoursesData[0],
      [mockCoursesData[1].slug]: mockCoursesData[1],
    };
    expect(reducer(initialState, action)).toEqual(expected);
  });
});
