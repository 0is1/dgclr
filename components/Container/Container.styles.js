import styled from 'styled-components';
import { Box, Text } from 'rebass';
import colors from 'components/colors';

const Styles = {
  Container: styled(Box)`
    background-color: ${colors.lightGray};
    color: rgb(43, 43, 43);
    width: 100%;
  `,
  HeaderLink: styled.span`
    display: block;
    font-size: 1rem;
    color: ${colors.text};
    line-height: 1.5;
    cursor: pointer;
  `,
  BaseText: styled(Text)`
    margin-top: 0.85rem;
    padding-left: 1rem;
  `,
  Footer: styled.footer`
    padding: 1rem;
  `,
  UL: styled.ul`
    padding: 0;
  `,
  OL: styled.ol`
    padding: 0 2rem;
  `,
  LI: styled.li`
    line-height: 1.35;
    list-style: ${props => (props.listStyle ? props.listStyle : 'inherit')};
  `,
};

export default Styles;
