import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  Label: styled.label`
    align-items: center;
    display: flex;
    flex-direction: row;
    margin: 0.5rem 0;
  `,
  LabelText: styled.span`
    color: ${colors.text};
    font-size: 1rem;
    margin-right: 1rem;
  `,
};

export default Styles;
