import styled from 'styled-components';
// import colors from 'components/colors';

const Styles = {
  ZIndexContainer: styled.div`
    position: relative;
    z-index: ${props => (props.zIndex ? props.zIndex : 4)};
  `,
};

export default Styles;
