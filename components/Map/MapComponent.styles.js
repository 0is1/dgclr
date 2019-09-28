import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  Wrapper: styled.div`
    height: 500px;
  `,
  LoaderWrapper: styled.div`
    display: flex;
    justify-content: center;
    height: 500px;
  `,
  InfoBoxContainer: styled.div`
    background-color: ${colors.info};
    padding: 10px;
  `,
  InfoBoxText: styled.p`
    fontsize: 13px;
    color: ${colors.white};
  `,
};

export default Styles;
