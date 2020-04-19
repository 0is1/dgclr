import styled from 'styled-components';

const Styles = {
  FadeInBox: styled.div`
    height: ${(props) => (props.show ? 'auto' : '0px')};
    width: ${(props) => (props.show ? '100%' : '0px')};
    position: ${(props) => (props.show ? 'inherit' : 'absolute')};
    margin-top: ${(props) => (props.show ? '0px' : '-9999px')};
    opacity: ${(props) => (props.show ? 1 : 0)};
    top: ${(props) => (props.show ? '0px' : '-9999px')};
    transition: opacity 0.5s ease-in-out;
    display: flex;
    flex-wrap: wrap;
  `,
};

export default Styles;
