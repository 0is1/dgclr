import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  Wrapper: styled.div`
    margin: 0 auto;
    padding-top: 1rem;
  `,
  SearchResultItem: styled.a`
    display: block;
    font-size: 1rem;
    font-weight: 700;
    color: ${colors.text};
    line-height: 2;
    cursor: pointer;
    &:hover {
      color: #544c8e;
    }
  `,
};

export default Styles;
