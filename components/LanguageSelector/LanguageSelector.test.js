import React from 'react';
import { shallow } from 'enzyme';
import LanguageSelector from './LanguageSelector';
import Styles from './LanguageSelector.styles';

const { Text } = Styles;

const mockProps = (props = {}) => ({
  currentLanguage: 'fi',
  language: 'fi',
  ...props,
});

describe('<LanguageSelector />', () => {
  describe('snapshots', () => {
    it('renders with default props', () => {
      const props = mockProps();
      const subject = shallow(<LanguageSelector {...props} />);
      const textComponent = subject.find(Text);
      expect(textComponent.prop('active')).toEqual(true);
      expect(textComponent.text()).toEqual('fi');
      expect(subject).toMatchSnapshot();
    });
    it('renders with language prop', () => {
      const props = mockProps({ language: 'en' });
      const subject = shallow(<LanguageSelector {...props} />);
      const textComponent = subject.find(Text);
      expect(textComponent.prop('active')).toEqual(false);
      expect(textComponent.text()).toEqual('en');
      expect(subject).toMatchSnapshot();
    });
  });
});
