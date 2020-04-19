import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  HandleDiv: styled.div`
    left: ${(props) => props.percent}%;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    z-index: 5;
    width: 28px;
    height: 42px;
    cursor: pointer;
    background-color: transparent;
  `,
  Slider: styled.div`
    left: ${(props) => props.percent}%;
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    background-color: ${(props) => (props.disabled ? colors.darkGray : colors.lightGray)};
  `,
};

export default Styles;
