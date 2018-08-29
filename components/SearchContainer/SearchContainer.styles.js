import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  Wrapper: styled.div`
    margin: 1rem;
    padding: 2rem;
  `,
  SearchResultItem: styled.a`
    display: block;
    font-size: 19px;
    color: ${colors.text};
    line-height: 1.65;
    cursor: pointer;
    &:hover {
      color: #544c8e;
    }
  `,
};

export default Styles;
