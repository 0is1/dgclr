import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { RadioChangeEvent, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { Radio } from 'antd';
import useLocalStorageState from 'use-local-storage-state';

const options = [
  { label: '🇫🇮', value: 'fi' },
  { label: '🇺🇸', value: 'en' },
];

const LanguageSelector = () => {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const [locale, setLocale] = useLocalStorageState('locale', {
    defaultValue: 'fi',
  });
  useEffect(() => {
    const toggleLang = async () => {
      await i18n.changeLanguage(locale);
    };
    if (typeof i18n?.changeLanguage === 'function') toggleLang();
  }, [i18n, locale]);

  return (
    <Radio.Group
      onChange={async ({ target: { value } }: RadioChangeEvent) => {
        setLocale(value);
        await i18n.changeLanguage(value);
        router.push(`${router.pathname}`, undefined, { locale: value });
      }}
      value={locale}
      optionType="button"
    >
      {options.map((option) => (
        <Tooltip title={t('common:change_language')} key={option.value}>
          <Radio.Button value={option.value}>{option.label}</Radio.Button>
        </Tooltip>
      ))}
    </Radio.Group>
  );
};

export default LanguageSelector;
