import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Space } from "antd";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  const { t } = useTranslation(["common"]);
  return (
    <footer className={styles.footer}>
      <a
        href="https://frisbeegolfradat.fi"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Space>
          <span>{t("common:powered_by")}:</span>
          <Image
            src="/fgr-footer-logo.png"
            alt="FGR Logo"
            width={157}
            height={32}
          />
        </Space>
      </a>
    </footer>
  );
};

export default Footer;
