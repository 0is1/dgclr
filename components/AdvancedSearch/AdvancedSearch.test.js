import React from 'react';
import { shallow } from 'enzyme';
import { AdvancedSearch } from './AdvancedSearch';

const mockProps = (props = {}) => ({
  filter: '{}',
  mapChecked: true,
  ...props,
});

describe('<AdvancedSearch />', () => {
  describe('snapshots', () => {
    it('renders with default props', () => {
      const props = mockProps();
      const subject = shallow(<AdvancedSearch {...props} />);
      expect(subject).toMatchSnapshot();
    });
  });
});
