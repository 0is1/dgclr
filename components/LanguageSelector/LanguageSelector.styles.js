import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  Wrapper: styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 60%;
  `,
  Text: styled.a`
    cursor: pointer;
    font-size: 1rem;
    border-bottom: ${(props) => (props.active ? `2px solid ${colors.hover}` : 'none')};
    margin-right: 1.25rem;
    padding: 0 .25rem .25rem;
    position: relative;
    :not(:last-of-type) {
        :after {
            content: '/';
            color: ${colors.darkGray};
            position: absolute;
            right: -.75rem;
            top: 0;
        }
      }
    }
  `,
};

export default Styles;
