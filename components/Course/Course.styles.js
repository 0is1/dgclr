import styled from 'styled-components';
import {
  Box, Heading, Panel, Text,
} from 'rebass';
import colors from 'components/colors';

const Styles = {
  Wrapper: styled.div`
    margin: 1rem;
    padding: 1rem;
  `,
  Title: styled(Heading)`
    color: ${colors.text};
    margin-bottom: 1.5rem;
  `,
  Description: styled(Text)`
    color: ${colors.text};
    font-weight: 200;
    line-height: 1.4;
  `,
  Box: styled(Box)``,
  PanelWrapper: styled(Panel)``,
  PanelHeader: styled(Panel.Header)`
    background: ${colors.info};
    color: ${colors.white};
  `,
  PanelFooter: styled(Panel.Footer)``,
  Strong: styled.span`
    font-weight: 700;
  `,
};

export default Styles;
