import React from 'react';
import { shallow } from 'enzyme';
import { AdvancedSearchInputs } from './AdvancedSearchInputs';

const mockProps = (props = {}) => ({
  filter: '{}',
  mapChecked: true,
  allInputsOpen: false,
  ...props,
});

describe('<AdvancedSearchInputs />', () => {
  describe('snapshots', () => {
    it('renders with default props', () => {
      const props = mockProps();
      const subject = shallow(<AdvancedSearchInputs {...props} />);
      expect(subject).toMatchSnapshot();
    });
    it('renders with allInputsOpen', () => {
      const props = mockProps({ allInputsOpen: true });
      const subject = shallow(<AdvancedSearchInputs {...props} />);
      expect(subject).toMatchSnapshot();
    });
  });
});
