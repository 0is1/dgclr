import React from 'react';
import { shallow } from 'enzyme';
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
  });
});
