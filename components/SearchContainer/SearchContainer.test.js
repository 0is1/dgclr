import React from 'react';
import { shallow } from 'enzyme';
import { SearchContainer } from './SearchContainer';

const mockProps = (props = {}) => ({
  t: jest.fn(value => value),
  latestQuery: '',
  ...props,
});

describe('<SearchContainer />', () => {
  describe('snapshots', () => {
    it('renders with default props', () => {
      const props = mockProps();
      const subject = shallow(<SearchContainer {...props} />);
      expect(subject).toMatchSnapshot();
    });
    it('renders with latestQuery prop', () => {
      const props = mockProps({ latestQuery: 'espoo' });
      const subject = shallow(<SearchContainer {...props} />);
      expect(subject).toMatchSnapshot();
    });
  });
});
