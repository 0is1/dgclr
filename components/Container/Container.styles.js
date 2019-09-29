import styled from 'styled-components';
import { Box, Tab, Text } from 'rebass';
import colors from 'components/colors';

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
    padding: ${props => (props.padding ? props.padding : 0)};
  `,
  OL: styled.ol`
    padding: 0 2rem;
  `,
  LI: styled.li`
    line-height: 1.35;
    list-style: ${props => (props.listStyle ? props.listStyle : 'inherit')};
  `,
  Tab: styled(Tab)`
    cursor: pointer;
    &:hover {
      border-color: ${colors.border};
    }
  `,
};

export default Styles;
