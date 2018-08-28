import styled from 'styled-components';

const Styles = {
  Wrapper: styled.div`
    margin: 1rem;
    padding: 2rem;
  `,
  SearchResultItem: styled.a`
    display: block;
    font-size: 19px;
    color: #262626;
    letter-spacing: 0.32px;
    line-height: 26px;
    font-weight: 700;
    cursor: pointer;
    transition: all 200ms;
    &:hover {
      transform: scale(1.01);
    }
  `,
};

export default Styles;
