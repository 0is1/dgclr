import styled from 'styled-components';
import { Button } from 'rebass';
import colors from 'components/colors';

const Styles = {
  LocationButton: styled(Button)`
    align-items: center;
    background-color: ${colors.lighterGray};
    border-radius: 10px;
    border: 1px solid ${colors.grayAlpha};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 30px;
    justify-content: center;
    padding: 1rem;
    width: 30px;
    &:focus {
      box-shadow: 0 0 0 2px ${colors.grayAlpha};
    }
  `,
  LocationIconWrapper: styled.span`
    > svg {
      color: ${props => (props.useCurrentLocation ? colors.pink : colors.gray)};
    }
  `,
};

export default Styles;
