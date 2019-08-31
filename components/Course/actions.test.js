import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { actionTypes, setCourses } from './actions';

describe('Course actions', () => {
  it('Return valid action from setCourses', () => {
    const expected = { type: actionTypes.SET_COURSES, courses: mockCoursesData };
    expect(setCourses(mockCoursesData)).toEqual(expected);
  });
});
