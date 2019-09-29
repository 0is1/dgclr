import React, { PureComponent } from 'react';
import { i18n } from 'i18n';
import Styles from './LanguageSelector.styles';

const { Text } = Styles;

type Props = {
  currentLanguage: ?string,
  language: string,
};

class LanguageSelector extends PureComponent<Props> {
  changeLanguage = async () => {
    const { language } = this.props;
    try {
      await i18n.changeLanguage(language);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { currentLanguage, language } = this.props;
    const languageToCompare = i18n.language || currentLanguage;
    return (
      <Text active={languageToCompare === language} onClick={this.changeLanguage}>
        {language}
      </Text>
    );
  }
}

export default LanguageSelector;
