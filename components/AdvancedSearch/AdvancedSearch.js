// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { Box } from 'rebass';
import type { State as ReduxState } from 'lib/types';
import AdvancedSearchInputs from './AdvancedSearchInputs';
import AdvancedSearchQuery from './AdvancedSearchQuery';
import { getCurrentAdvancedFilter } from './selectors';
import Styles from './AdvancedSearch.styles';

const { TextSearchLink, Wrapper } = Styles;
const FILTER_UPDATED = 'FILTER_UPDATED';

type Props = {};
type MapStateToProps = { filter: string };
type MapDispatchToProps = {};

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

class AdvancedSearch extends PureComponent<CombinedProps> {
  componentDidMount() {
    const { pathname, query } = Router;
    const { filter } = this.props;
    if (query && Object.keys(query).length === 0 && filter) {
      const href = `${pathname}?q=${filter}`;
      Router.push(href, href, { shallow: true });
    }
  }

  componentDidUpdate(prevProps: CombinedProps, prevState: any, snapshot: any) {
    if (snapshot === FILTER_UPDATED) {
      const { filter } = this.props;
      const { pathname } = Router;
      const href = `${pathname}?q=${filter}`;
      Router.push(href, href, { shallow: true });
    }
  }

  getSnapshotBeforeUpdate(prevProps: CombinedProps) {
    const { filter } = this.props;
    if (prevProps.filter !== filter) {
      return FILTER_UPDATED;
    }
    return null;
  }

  render() {
    const { filter } = this.props;
    return (
      <Wrapper>
        <Box style={{ position: 'relative' }} m="1rem auto" px="2rem" width={[1, 1, 1, 0.7]}>
          <Link href="/">
            <TextSearchLink>Tekstihaku</TextSearchLink>
          </Link>
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
