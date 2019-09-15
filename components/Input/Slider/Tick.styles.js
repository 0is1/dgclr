import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  TickWrapper: styled.div`
    position: absolute;
    margin-top: 14px;
    width: 1px;
    height: 5px;
    background-color: ${colors.gray};
    left: ${props => props.percent}%;
  `,
  TickComponent: styled.div`
    position: absolute;
    margin-top: 22px;
    font-size: 10px;
    text-align: center;
    margin-left: ${props => -(100 / props.count) / 2}%;
    width: ${props => 100 / props.count}%;
    left: ${props => props.percent}%;
  `,
};

export default Styles;
