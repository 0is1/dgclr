import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  TooltipContainer: styled.div`
    left: ${(props) => props.percent}%;
    position: absolute;
    margin-left: -11px;
    margin-top: -35px;
  `,
  Tooltip: styled.div`
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted ${colors.darkGray};
    margin-left: 22px;
  `,
  TooltipText: styled.span`
    width: 100px;
    background-color: ${colors.darkGray};
    color: ${colors.whiteText};
    opacity: 0.8;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: ${colors.darkGray} transparent transparent transparent;
    }
  `,
  RailStyle: styled.div`
    position: absolute;
    width: 100%;
    transform: translate(0%, -50%);
    height: 40px;
    cursor: pointer;
    z-index: 3;
  `,

  RailCenterStyle: styled.div`
    position: absolute;
    width: 100%;
    transform: translate(0%, -50%);
    height: 14px;
    border-radius: 7px;
    cursor: pointer;
    pointer-events: none;
    background-color: ${colors.greenAlpha};
  `,
};

export default Styles;
