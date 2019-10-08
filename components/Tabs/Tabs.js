// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'rebass';
import { getActiveIndex } from 'components/Tabs/selectors';
import { setTabs as setTabsFunc } from 'components/Tabs/actions';
import type { State as ReduxState } from 'lib/types';
import Tab from './Tab';

type Props = {
  id: string,
  tabs: [string],
};
type MapStateToProps = { activeIndex: ?number };
type MapDispatchToProps = { setTabs: Function };

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

class TabsComponent extends Component<CombinedProps> {
  componentDidMount() {
    const { activeIndex, id, setTabs } = this.props;
    if (!activeIndex) {
      setTabs(id, 0);
    }
  }

  render() {
    const { activeIndex, id, tabs } = this.props;
    if (typeof activeIndex !== 'number') return null;
    const props = { activeIndex, id };
    const tabData = tabs.map((name, index) => {
      const key = `${name}-${index}`;
      return <Tab {...props} key={key} index={index} name={name} />;
    });
    return <Tabs>{tabData}</Tabs>;
  }
}

const mapStateToProps = (state: ReduxState, ownProps: Props): MapStateToProps => ({
  activeIndex: getActiveIndex(state, ownProps),
});

const mapDispatchToProps = (dispatch: Function): MapDispatchToProps => ({
  setTabs: (id, activeIndex = 0) => dispatch(setTabsFunc(id, activeIndex)),
});

export default connect<CombinedProps, Props, MapStateToProps, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(TabsComponent);
