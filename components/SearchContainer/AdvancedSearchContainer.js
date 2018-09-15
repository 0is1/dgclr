// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'rebass';
import { GoSettings } from 'react-icons/go';
import { toggleAdvancedSearch as toggleAdvancedSearchFunc } from 'components/SearchContainer/actions';
import { isAdvancedSearchOpen } from 'components/SearchContainer/selectors';
import AdvancedSearchInputs from 'components/SearchContainer/AdvancedSearchInputs';
import Styles from 'components/SearchContainer/AdvancedSearchContainer.styles';
import colors from 'components/colors';

const { ToggleButtonWrapper } = Styles;

type Props = { open: boolean, onFilterChange: Function, toggleAdvancedSearch: Function };

class AdvancedSearchContainer extends Component<Props> {
  toggleOpen = () => {
    const { open, toggleAdvancedSearch } = this.props;
    toggleAdvancedSearch(!open);
  };

  handleKeyPress = () => {};

  onChange = (filter: {}) => {
    const { onFilterChange } = this.props;
    onFilterChange(filter);
  };

  render() {
    const { open } = this.props;
    const inputs = open ? <AdvancedSearchInputs onChange={this.onChange} /> : null;
    const settingsColor = open ? colors.info : colors.text;
    return (
      <Flex style={{ position: 'relative' }}>
        {inputs}
        <ToggleButtonWrapper
          onClick={this.toggleOpen}
          onKeyPress={this.handleKeyPress}
          role="button"
          tabIndex="0"
        >
          <GoSettings size="1.5rem" color={settingsColor} />
        </ToggleButtonWrapper>
      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  open: isAdvancedSearchOpen(state),
});

const mapDispatchToProps = dispatch => ({
  toggleAdvancedSearch: (open = false) => dispatch(toggleAdvancedSearchFunc(open)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchContainer);
