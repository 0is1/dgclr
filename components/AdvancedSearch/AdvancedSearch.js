// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Box } from 'rebass';
import type { State as ReduxState } from 'lib/types';
import AdvancedSearchInputs from './AdvancedSearchInputs';
import AdvancedSearchQuery from './AdvancedSearchQuery';
import { getCurrentAdvancedFilter } from './selectors';
import Styles from './AdvancedSearchContainer.styles';

const { Wrapper } = Styles;

type Props = {};
type MapStateToProps = { filter: string };
type MapDispatchToProps = {};

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

class AdvancedSearch extends PureComponent<CombinedProps> {
  toggleOpen = () => {
    // TODO: link
  };

  handleKeyPress = () => {};

  render() {
    const { filter } = this.props;
    return (
      <Wrapper>
        <Box m="1rem auto" px="2rem" width={[1, 1, 1, 0.7]}>
          <AdvancedSearchInputs />
          <AdvancedSearchQuery filter={JSON.parse(filter)} />
        </Box>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: ReduxState): MapStateToProps => ({
  filter: getCurrentAdvancedFilter(state),
});

export default connect<CombinedProps, Props, any, any, any, Function>(mapStateToProps)(AdvancedSearch);
