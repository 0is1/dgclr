import styled from 'styled-components';

const Styles = {
  Wrapper: styled.div`
    margin: 0 auto;
    padding-top: 1rem;
  `,
  ToggleButtonWrapper: styled.div`
    padding: 0.25rem;
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    &:hover {
      cursor: pointer;
    }
  `,
};

export default Styles;
