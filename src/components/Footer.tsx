import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Col, Row, Space, Typography } from 'antd';
import styles from '../styles/Footer.module.css';
import useLocalStorageState from 'use-local-storage-state';

const { Paragraph, Text } = Typography;

const Footer = () => {
  const { t } = useTranslation(['common']);
  const [useDarkTheme] = useLocalStorageState('use_dark_theme', {
    defaultValue: false,
  });
  return (
    <footer className={`${styles.footer} ${useDarkTheme && styles.footerDark}`}>
      <Row justify="center" gutter={[16, 16]} style={{ textAlign: 'center' }}>
        <Col span={24}>
          <Paragraph>{t('common:powered_by')}</Paragraph>
          <a
            href="https://frisbeegolfradat.fi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/fgr-footer-logo.png"
              alt="FGR Logo"
              width={157}
              height={32}
            />
          </a>
        </Col>
        <Col span={24}>
          <a
            href="https://discgolfmetrix.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/metrix_logo.png"
              height={49}
              width={150}
              alt="Metrix Logo"
            />
          </a>
        </Col>
        <Col span={24}>
          <Text type="secondary">{t('common:disclaimer')}</Text>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
