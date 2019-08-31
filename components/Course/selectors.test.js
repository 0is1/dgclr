/* eslint-env jest */
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { DEFAULT_STATE } from 'lib/rootReducer';
import { courseBySlugFromState } from './selectors';

describe('SearchContainer selectors', () => {
  it('Select courseBySlugFromState with initialState', () => {
    const result = courseBySlugFromState(DEFAULT_STATE, 'query');
    expect(result).toEqual({});
  });
  it('Select courseBySlugFromState with return value', () => {
    const ownProps = { slug: mockCoursesData[1].slug };
    const result = courseBySlugFromState(
      {
        ...DEFAULT_STATE,
        courses: {
          [mockCoursesData[0].slug]: mockCoursesData[0],
          [mockCoursesData[1].slug]: mockCoursesData[1],
        },
      },
      ownProps,
    );
    expect(result).toEqual(mockCoursesData[1]);
  });
});
