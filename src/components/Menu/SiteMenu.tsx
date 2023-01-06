import {
  SlidersOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  ArrowUpOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { MenuProps, Menu, Col, Row, Button } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LanguageSelector from '../LanguageSelector';
import ThemeSwithcer from '../ThemeSwitcher';
import useWindowSize from '../../hooks/useWindowSize';

const SiteMenu = () => {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const currentRoute = router.pathname;
  const [current, setCurrent] = useState(currentRoute);
  const { isMobileWidth } = useWindowSize();
  const [menuOpen, setMenuOpen] = useState(!isMobileWidth);
  useEffect(() => {
    // Menu is always open on desktop
    if (!menuOpen && !isMobileWidth) {
      setMenuOpen(true);
    }
  }, [isMobileWidth, menuOpen]);

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
    setCurrent(e.key);
  };
  return (
    <>
      {isMobileWidth && (
        <Row gutter={[46, 32]} style={{ paddingBottom: '1rem' }}>
          <Col span={12}>
            <LanguageSelector />
          </Col>
          <Col span={6} offset={6}>
            <ThemeSwithcer />
          </Col>
        </Row>
      )}
      {menuOpen && (
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode={isMobileWidth ? 'vertical' : 'horizontal'}
          items={[
            {
              label: t('common:menu_text_search'),
              key: '/',
              icon: <SearchOutlined />,
            },
            {
              label: t('common:menu_text_advanced_search'),
              key: '/advanced_search',
              icon: <SlidersOutlined />,
            },
            {
              label: t('common:menu_text_info'),
              key: '/info',
              icon: <InfoCircleOutlined />,
            },
          ]}
        />
      )}
      {isMobileWidth && (
        <Row justify="center">
          <Col>
            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              icon={menuOpen ? <ArrowUpOutlined /> : <MenuOutlined />}
              size="large"
            >
              {!menuOpen ? t('common:menu') : t('common:menu_close')}
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SiteMenu;
