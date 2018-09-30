// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTabs as setTabsFunc } from 'components/Tabs/actions';
import Styles from './Tabs.styles';

type Props = {
  activeIndex: number,
  index: number,
  id: string,
  name: string,
  setTabs: Function,
};
const { Tab } = Styles;

class TabComponent extends Component<Props> {
  changeActiveIndex = () => {
    const { index, id, setTabs } = this.props;
    setTabs(id, index);
  };

  render() {
    const { activeIndex, index, name } = this.props;
    const borderColor = index === activeIndex ? 'blue' : 'transparent';
    return (
      <Tab onClick={this.changeActiveIndex} borderColor={borderColor}>
        {name}
      </Tab>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setTabs: (id, activeIndex = 0) => dispatch(setTabsFunc(id, activeIndex)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TabComponent);
