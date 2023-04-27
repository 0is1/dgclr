import '../styles/globals.css';
import { ConfigProvider, theme } from 'antd';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { toggleDarkClassToBody } from '../helpers/utils';

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const [useDarkTheme] = useLocalStorageState('use_dark_theme', {
    defaultValue: false,
  });
  useEffect(() => {
    toggleDarkClassToBody(useDarkTheme);
  }, [useDarkTheme]);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ConfigProvider
          theme={{
            algorithm: useDarkTheme
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          }}
        >
          <Component {...pageProps} />
          <Analytics />
        </ConfigProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
