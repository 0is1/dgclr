import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  Track: styled.div`
    background-color: ${props => (props.disabled ? '#999' : colors.green)};
    border-radius: 7;
    cursor: pointer;
    height: 14px;
    left: ${props => props.sourcePercent}%;
    position: absolute;
    transform: translate(0%, -50%);
    width: ${props => props.targetPercent - props.sourcePercent}%;
    z-index: 1;
  `,
};

export default Styles;
