// @flow
import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Tabs, Text } from 'rebass';
import * as gtag from 'lib/gtag';
import colors from 'components/colors';
import { withTranslation } from 'lib/i18n';
import LanguageSelector from 'components/LanguageSelector';
import Styles from './Container.styles';

type Props = {
  activeRoute: string,
  children: Node,
  currentLanguage: ?string,
  router: {
    events: {
      on: Function,
      off: Function,
    },
  },
  t: Function,
};

const {
  Container, Footer, HeaderLink, Tab, MobileMenuUL, MobileMenu, MobileNav, DesktopNav,
} = Styles;

class ContainerComponent extends Component<Props> {
  componentDidMount() {
    const { router } = this.props;
    router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    const { router } = this.props;
    router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  handleRouteChange = (url: string) => {
    gtag.pageview(url);
  };

  getHeaderLink = (translationKey: string) => {
    const { t } = this.props;
    return <HeaderLink fontSize={['1rem', '1rem', '.7rem', '1rem']}>{t(translationKey)}</HeaderLink>;
  };

  getTab = ({ activeRoute, translationKey, href }: { activeRoute: string, translationKey: string, href: string }) => (
    <Tab borderColor={activeRoute === href ? `${colors.border}` : 'transparent'} px={3}>
      <Link href={href}>{this.getHeaderLink(translationKey)}</Link>
    </Tab>
  );

  render() {
    const {
      activeRoute, children, currentLanguage, t,
    } = this.props;
    const homeLink = this.getTab({
      activeRoute,
      href: '/',
      translationKey: 'menu-text-search',
    });
    const advancedSearchLink = this.getTab({
      activeRoute,
      href: '/advanced_search',
      translationKey: 'menu-text-advanced-search',
    });
    const infoLink = this.getTab({
      activeRoute,
      href: '/info',
      translationKey: 'menu-text-info',
    });
    return (
      <>
        <header>
          <Tabs px={4} py={2}>
            <DesktopNav>
              {homeLink}
              {advancedSearchLink}
              {infoLink}
            </DesktopNav>
            <MobileNav role="navigation">
              <MobileMenu>
                <input type="checkbox" />
                <span />
                <span />
                <span />

                <MobileMenuUL>
                  <li>{homeLink}</li>
                  <li>{advancedSearchLink}</li>
                  <li>{infoLink}</li>
                </MobileMenuUL>
              </MobileMenu>
            </MobileNav>
            <LanguageSelector currentLanguage={currentLanguage} />
          </Tabs>
        </header>
        <Container p={['0 0 2rem 0', '0.5rem 0', '0.5rem 0', '2rem 0']}>{children}</Container>
        <Footer>
          <Text mt={2} textAlign="center">
            {t('footer-disclaimer')}
          </Text>
          <Text mt={2} textAlign="center">
            <a
              className="github-button"
              href="https://github.com/0is1/dgclr"
              data-size="large"
              data-show-count="false"
              aria-label="See 0is1/dgclr in GitHub"
            >
              {t('github-text')}
            </a>
          </Text>
        </Footer>
      </>
    );
  }
}

export default withRouter(withTranslation('common')(ContainerComponent));
