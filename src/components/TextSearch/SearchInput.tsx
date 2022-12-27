import React from 'react';
import { Input } from 'antd';
import useLocalStorageState from 'use-local-storage-state';
import { useTranslation } from 'next-i18next';

const SearchInput = () => {
  const { t } = useTranslation(['common']);
  const [search, setSearch] = useLocalStorageState('text_search', {
    defaultValue: '',
  });
  return (
    <Input.Search
      autoFocus
      placeholder={t('common:text_search_placeholder') as string}
      enterButton={t('common:search')}
      defaultValue={search}
      size="large"
      onSearch={(value) => setSearch(value)}
    />
  );
};

export default SearchInput;
