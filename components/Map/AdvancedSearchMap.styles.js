import styled from 'styled-components';
import { Button, Box } from 'rebass';
import colors from 'components/colors';

const Styles = {
  LocationButton: styled(Button)`
    align-items: center;
    background-color: ${colors.lighterGray};
    border-radius: 10px;
    border: 1px solid ${colors.grayAlpha};
    bottom: 30px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 30px;
    justify-content: center;
    left: 10px;
    padding: 1rem;
    position: absolute;
    width: 30px;
    &:focus {
      box-shadow: 0 0 0 2px ${colors.grayAlpha};
    }
  `,
  LocationIconWrapper: styled.span`
    width: 20px;
    > svg {
      color: ${props => (props.useCurrentLocation ? colors.pink : colors.gray)};
      width: 15px;
    }
  `,
  ErrorWrapperBox: styled(Box)`
    align-items: center;
    background-color: ${colors.white};
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    svg {
      color: ${colors.red};
      margin-right: 1rem;
    }
  `,
};

export default Styles;
