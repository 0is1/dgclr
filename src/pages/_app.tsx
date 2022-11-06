// import "antd/dist/antd.css";
// import "antd/dist/antd.dark.css";
import "antd/dist/antd.variable.min.css";
import "../styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

ConfigProvider.config({
  theme: {
    primaryColor: "hsl(200, 50%, 20%)",
  },
});

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
