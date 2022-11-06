import React from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import Footer from "./Footer";
import styles from "../styles/Home.module.css";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { t } = useTranslation(["common"]);
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{t("common:title")}</title>
          <meta name="description" content={t("common:sub_title")} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
