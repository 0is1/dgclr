/* eslint-env jest */
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { actionTypes, setSearchQuery } from './actions';

describe('SearchContainer actions', () => {
  it('Return valid action from setSearchQuery', () => {
    const query = 'espoo';
    const expected = { type: actionTypes.SET_SEARCH_QUERY, courses: mockCoursesData, query };
    expect(setSearchQuery(mockCoursesData, query)).toEqual(expected);
  });
});
