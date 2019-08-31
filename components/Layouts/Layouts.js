// @flow

import React from 'react';
import { connect } from 'react-redux';
import { getActiveIndex } from 'components/Tabs/selectors';
import Layout from 'components/Layout';
import { getRandomKey } from 'helpers/utils';
import type { State as ReduxState } from 'lib/types';

type Props = {
  id: string,
  layouts: [],
};
type MapStateToProps = { activeIndex: ?number };

type MapDispatchToProps = {};

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

const Layouts = ({ activeIndex, layouts }: CombinedProps) => {
  const layoutData = layouts.map<any>((layout, index: number) => (
    <Layout key={getRandomKey()} layout={layout} active={index === activeIndex} />
  ));
  return layoutData;
};

const mapStateToProps = (state: ReduxState, ownProps: Props): MapStateToProps => ({
  activeIndex: getActiveIndex(state, ownProps),
});

export default connect<CombinedProps, Props, any, any, any, Function>(mapStateToProps)(Layouts);
