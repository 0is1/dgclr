// import "antd/dist/antd.css";
// import "antd/dist/antd.dark.css";

import "../styles/globals.css";
import { ConfigProvider, theme } from "antd";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getBrowserPrefersDarkMode } from "../helpers/utils";

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [useDarkTheme] = useLocalStorageState("use_dark_theme", {
    defaultValue: getBrowserPrefersDarkMode(),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ConfigProvider
          theme={{
            algorithm: useDarkTheme
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
            // token: {
            //   colorPrimary: "hsl(200, 50%, 20%)",
            // },
          }}
        >
          <Component {...pageProps} />
        </ConfigProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
