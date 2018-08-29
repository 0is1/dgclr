// @flow

import React from 'react';
import { connect } from 'react-redux';
import { getActiveIndex } from 'components/Tabs/selectors';
import Layout from 'components/Layout';

type Props = {
  activeIndex: number | Boolean,
  id: String,
  layouts: [],
};

const Layouts = ({ activeIndex, layouts }: Props) => {
  const layoutData = layouts.map((layout, index) => (
    <Layout layout={layout} active={index === activeIndex} />
  ));
  return layoutData;
};

const mapStateToProps = (state, ownProps) => ({
  activeIndex: getActiveIndex(state, ownProps),
});

export default connect(mapStateToProps)(Layouts);
