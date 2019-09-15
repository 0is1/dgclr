import React from 'react';
import { shallow } from 'enzyme';
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { AdvancedSearchQuery } from './AdvancedSearchQuery';

const mockProps = (props = {}) => ({
  filter: {},
  queryResults: [],
  data: [],
  latestQuery: '',
  setCourses: jest.fn(),
  setSearchQuery: jest.fn(),
  ...props,
});

describe('<AdvancedSearchQuery />', () => {
  describe('snapshots', () => {
    it('renders with default props', () => {
      const props = mockProps();
      const subject = shallow(<AdvancedSearchQuery {...props} />);
      expect(subject).toMatchSnapshot();
    });
    it('renders with queryResults', () => {
      const props = mockProps({ queryResults: mockCoursesData });
      const subject = shallow(<AdvancedSearchQuery {...props} />);
      expect(subject).toMatchSnapshot();
    });
  });
});
