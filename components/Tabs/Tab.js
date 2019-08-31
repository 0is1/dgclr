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
};
type MapStateToProps = {};
type MapDispatchToProps = { setTabs: Function };

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

const { Tab } = Styles;

class TabComponent extends Component<CombinedProps> {
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

const mapDispatchToProps = (dispatch: Function): MapDispatchToProps => ({
  setTabs: (id, activeIndex = 0) => dispatch(setTabsFunc(id, activeIndex)),
});

export default connect<CombinedProps, Props, MapStateToProps, any, any, Function>(
  null,
  mapDispatchToProps,
)(TabComponent);
