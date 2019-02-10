// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'rebass';
import { getActiveIndex } from 'components/Tabs/selectors';
import { setTabs as setTabsFunc } from 'components/Tabs/actions';
import { getRandomKey } from 'helpers/utils';
import type { State } from 'lib/types';
import Tab from './Tab';

type Props = {
  activeIndex: ?number,
  id: String,
  setTabs: Function,
  tabs: [String],
};

class TabsComponent extends Component<Props> {
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
    const tabData = tabs.map((name, index) => <Tab {...props} key={getRandomKey()} index={index} name={name} />);
    return <Tabs>{tabData}</Tabs>;
  }
}

const mapStateToProps = (state: State, ownProps) => ({
  activeIndex: getActiveIndex(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  setTabs: (id, activeIndex = 0) => dispatch(setTabsFunc(id, activeIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabsComponent);
