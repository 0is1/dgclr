import React from 'react';
import { config } from 'lib/i18n';
import { isArrayWithLength } from 'helpers/utils';
import LanguageSelector from './LanguageSelector';
import Styles from './LanguageSelector.styles';

const { Wrapper } = Styles;

type Props = { currentLanguage: ?string };

function LanguageSelectorWrapper({ currentLanguage }: Props) {
  const languages = config.allLanguages;

  if (!isArrayWithLength(languages)) {
    return null;
  }
  const languageSelectors = languages.map((language) => (
    <LanguageSelector key={language} language={language} currentLanguage={currentLanguage} />
  ));
  return <Wrapper>{languageSelectors}</Wrapper>;
}

export default LanguageSelectorWrapper;
