import React from 'react';
import { shallow } from 'enzyme';
import LanguageSelectorWrapper from './LanguageSelectorWrapper';
import LanguageSelector from './LanguageSelector';

const mockProps = (props = {}) => ({
  currentLanguage: 'fi',
  ...props,
});

describe('<LanguageSelectorWrapper />', () => {
  describe('snapshots', () => {
    it('renders with default props', () => {
      const props = mockProps();
      const subject = shallow(<LanguageSelectorWrapper {...props} />);
      const languageSelectors = subject.find(LanguageSelector);
      expect(languageSelectors.at(0).prop('language')).toEqual('en');
      expect(languageSelectors.at(1).prop('language')).toEqual('fi');
      expect(subject).toMatchSnapshot();
    });
  });
});
