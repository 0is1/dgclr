// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'rebass';
import { getActiveIndex } from 'components/Tabs/selectors';
import { setTabs as setTabsFunc } from 'components/Tabs/actions';
import Tab from './Tab';

type Props = {
  activeIndex: number | Boolean,
  id: String,
  setTabs: Function,
  tabs: [String],
};

class TabsComponent extends PureComponent<Props> {
  componentDidMount() {
    const { activeIndex, id, setTabs } = this.props;
    if (!activeIndex) {
      setTabs(id, 0);
    }
  }

  render() {
    const { activeIndex, id, tabs } = this.props;
    console.log('activeIndex: ', activeIndex);
    console.log(typeof activeIndex);
    if (typeof activeIndex !== 'number') return null;
    const props = { activeIndex, id };
    const tabData = tabs.map((name, index) => <Tab {...props} index={index} name={name} />);
    return <Tabs>{tabData}</Tabs>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  activeIndex: getActiveIndex(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  setTabs: (id, activeIndex = 0) => dispatch(setTabsFunc(id, activeIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabsComponent);
