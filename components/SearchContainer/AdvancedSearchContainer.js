// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box } from 'rebass';
import { GoSettings } from 'react-icons/go';
import { toggleAdvancedSearch as toggleAdvancedSearchFunc } from 'components/SearchContainer/actions';
import { isAdvancedSearchOpen } from 'components/SearchContainer/selectors';
import AdvancedSearchInputs from 'components/SearchContainer/AdvancedSearchInputs';
import Styles from 'components/SearchContainer/AdvancedSearchContainer.styles';
import colors from 'components/colors';
import type { State } from 'lib/types';

const { ToggleButtonWrapper } = Styles;

type Props = {};
type MapStateToProps = { isOpen: boolean };
type MapDispatchToProps = { toggleAdvancedSearch: Function };

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

class AdvancedSearchContainer extends Component<CombinedProps> {
  toggleOpen = () => {
    const { isOpen, toggleAdvancedSearch } = this.props;
    toggleAdvancedSearch(!isOpen);
  };

  handleKeyPress = () => {};

  render() {
    const { isOpen } = this.props;
    const inputs = isOpen ? <AdvancedSearchInputs /> : null;
    const settingsColor = isOpen ? colors.info : colors.text;
    return (
      <Box style={{ position: 'relative' }}>
        {inputs}
        <ToggleButtonWrapper onClick={this.toggleOpen} onKeyPress={this.handleKeyPress} role="button" tabIndex="0">
          <GoSettings size="1.5rem" color={settingsColor} />
        </ToggleButtonWrapper>
      </Box>
    );
  }
}

const mapStateToProps = (state: State): MapStateToProps => ({
  isOpen: isAdvancedSearchOpen(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  toggleAdvancedSearch: (isOpen = false) => dispatch(toggleAdvancedSearchFunc(isOpen)),
});

export default connect<CombinedProps, Props, MapStateToProps, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchContainer);
