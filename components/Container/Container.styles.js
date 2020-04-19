import styled from 'styled-components';
import { Box, Tab, Text } from 'rebass';
import colors from 'components/colors';
import { device } from 'components/constants';

const Styles = {
  Container: styled(Box)`
    background-color: ${colors.lightGray};
    color: rgb(43, 43, 43);
    width: 100%;
  `,
  HeaderLink: styled(Text)`
    color: ${colors.text};
    cursor: pointer;
    display: block;
    line-height: 1.5;
    text-align: center;
  `,
  BaseText: styled(Text)`
    margin-top: 0.85rem;
    padding-left: 1rem;
  `,
  Footer: styled.footer`
    padding: 1rem;
  `,
  UL: styled.ul`
    padding: ${(props) => (props.padding ? props.padding : 0)};
  `,
  OL: styled.ol`
    padding: 0 2rem;
  `,
  LI: styled.li`
    line-height: 1.35;
    list-style: ${(props) => (props.listStyle ? props.listStyle : 'inherit')};
  `,
  Tab: styled(Tab)`
    cursor: pointer;
    display: block;
    width: 100%;
    &:hover {
      border-color: ${colors.border};
    }
    @media ${device.tablet} {
    }
    @media ${device.laptop} {
      width: auto;
    }
  `,
  DesktopNav: styled.div`
    display: none;
    width: 100%;
    @media ${device.tablet} {
      display: flex;
    }
  `,
  MobileNav: styled.nav`
    width: 100%;
    @media ${device.tablet} {
      display: none;
    }
  `,
  MobileMenu: styled.div`
    -webkit-user-select: none;
    display: block;
    left: 0px;
    padding: 1.5rem 0 1rem;
    position: relative;
    top: 0px;
    user-select: none;
    z-index: 10;

    input {
      cursor: pointer;
      display: block;
      height: 40px;
      left: -10px;
      opacity: 0;
      position: absolute;
      top: 10px;
      width: 40px;
      z-index: 2;
      -webkit-touch-callout: none;
      &:checked ~ span {
        background: ${colors.purple};
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
      }
      &:checked ~ span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
      &:checked ~ span:nth-last-child(2) {
        transform: rotate(-45deg) translate(0, -1px);
      }

      &:checked ~ ul {
        transform: none;
      }
    }
    span {
      background: ${colors.purple};
      border-radius: 3px;
      display: block;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
      width: 33px;
      z-index: 1;

      &:first-child {
        transform-origin: 0% 0%;
      }
      &:nth-last-child(2) {
        transform-origin: 0% 100%;
      }
    }
  `,
  MobileMenuUL: styled.ul`
    background: ${colors.lighterGray};
    list-style-type: none;
    margin: -100px 0 0 -50px;
    padding: 6rem 5rem 3rem;
    position: absolute;
    transform-origin: 0% 0%;
    transform: translate(-100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    width: 105vw;
    -webkit-font-smoothing: antialiased;
    /* to stop flickering of text in safari */
    li {
      margin: 0 2rem 2rem;
      a {
        padding-bottom: 1rem;
      }
    }
  `,
};

export default Styles;
