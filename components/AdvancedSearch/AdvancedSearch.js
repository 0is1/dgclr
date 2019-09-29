// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Box } from 'rebass';
import type { State as ReduxState } from 'lib/types';
import AdvancedSearchInputsComponent from './AdvancedSearchInputs';
import AdvancedSearchQueryComponent from './AdvancedSearchQuery';
import { getCurrentAdvancedFilter, isAdvancedSearchMapVisible } from './selectors';
import Styles from './AdvancedSearch.styles';

const { Wrapper } = Styles;
const FILTER_UPDATED = 'FILTER_UPDATED';

type Props = {};
type MapStateToProps = { filter: string, mapChecked: boolean };
type MapDispatchToProps = {};

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

export class AdvancedSearch extends PureComponent<CombinedProps> {
  componentDidMount() {
    const { query } = Router;
    const { filter } = this.props;
    if (query && Object.keys(query).length === 0 && filter) {
      this.updateUrlQuery();
    }
  }

  componentDidUpdate(prevProps: CombinedProps, prevState: any, snapshot: any) {
    if (snapshot === FILTER_UPDATED) {
      this.updateUrlQuery();
    }
  }

  getSnapshotBeforeUpdate(prevProps: CombinedProps) {
    const { filter, mapChecked } = this.props;
    if (prevProps.filter !== filter || mapChecked !== prevProps.mapChecked) {
      return FILTER_UPDATED;
    }
    return null;
  }

  updateUrlQuery = () => {
    const { pathname } = Router;
    const { filter, mapChecked } = this.props;
    const filterObject = JSON.parse(filter);
    const urlFilter = { ...filterObject, mapChecked };
    const href = `${pathname}?q=${encodeURIComponent(JSON.stringify(urlFilter))}`;
    Router.push(href, href, { shallow: true });
  };

  render() {
    const { filter } = this.props;
    return (
      <Wrapper>
        <Box style={{ position: 'relative' }} m="1rem auto" px="2rem" width={[1, 1, 1, 0.7]}>
          <AdvancedSearchInputsComponent />
          <AdvancedSearchQueryComponent filter={JSON.parse(filter)} />
        </Box>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: ReduxState): MapStateToProps => ({
  mapChecked: isAdvancedSearchMapVisible(state),
  filter: getCurrentAdvancedFilter(state),
});

export default connect<CombinedProps, Props, any, any, any, Function>(mapStateToProps)(AdvancedSearch);
