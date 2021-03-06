// @flow
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import withApollo from 'lib/withApollo';
import { omit } from 'lodash/fp';
import { i18n, withTranslation } from 'lib/i18n';
import { isArrayWithLength, convertKilometersToMeters } from 'helpers/utils';
import Container from 'components/Container';
import AdvancedSearch from 'components/AdvancedSearch';
import { setFilter as setFilterAction, setCurrentAdvancedSearchFilter, toggleAdvancedSearchMap } from 'components/AdvancedSearch/actions';
import { SELECT_FILTER_NAMES } from 'components/Select/constants';
import { INPUT_FILTER_NAMES } from 'components/Input/constants';
import { ADVANCED_COURSE_INFO, ADVANCED_NEARBY } from 'lib/constants';
import { MAP_RADIUS_DISTANCE_MAX, MAP_RADIUS_DISTANCE_MIN, MAP_CHECKED_FILTER } from 'components/Map/constants';
import type { Props as WithApolloProps } from 'lib/withApollo';

type Props = { currentLanguage: ?string, query: { [key: string]: string }, t: Function };
type MapStateToProps = {};
type MapDispatchToProps = {
  setAdvancedSearchFilter: Function,
  setFilter: Function,
  toggleMapVisibility: Function,
};

type CombinedProps = Props & MapStateToProps & MapDispatchToProps & WithApolloProps;

class AdvancedSearchPage extends Component<CombinedProps> {
  static getInitialProps: (any) => any;

  constructor(props: CombinedProps) {
    super(props);
    const {
      setFilter, setAdvancedSearchFilter, toggleMapVisibility, query,
    } = props;
    if (query && Object.keys(query).length > 0 && query.q) {
      try {
        const parsedQuery = JSON.parse(decodeURIComponent(query.q));
        const selectFilters = Object.keys(SELECT_FILTER_NAMES);
        const inputFilters = Object.keys(INPUT_FILTER_NAMES);
        let mapChecked = false;
        Object.keys(parsedQuery).forEach((filterName) => {
          if (selectFilters.includes(filterName)) {
            if (isArrayWithLength(parsedQuery[filterName])) {
              const filterData = parsedQuery[filterName].map((value) => ({
                value,
                label: value,
              }));

              setFilter(filterName, filterData);
            } else {
              setFilter(filterName, {
                value: parsedQuery[filterName],
                label: parsedQuery[filterName],
              });
            }
          } else if (filterName === ADVANCED_COURSE_INFO) {
            // Special logic
            const courseInfoKeys = Object.keys(parsedQuery[filterName]);
            // eslint-disable-next-line max-len
            courseInfoKeys.forEach((filter) => {
              setFilter(filter, {
                value: parsedQuery[filterName][filter],
                label: parsedQuery[filterName][filter],
              });
            });
          } else if (filterName === ADVANCED_NEARBY) {
            // Special logic
            const { coordinates, maxDistance } = parsedQuery[filterName];
            const radius = convertKilometersToMeters(maxDistance);
            if (isArrayWithLength(coordinates) && radius && radius >= MAP_RADIUS_DISTANCE_MIN && radius <= MAP_RADIUS_DISTANCE_MAX) {
              const [lng, lat] = coordinates;

              setFilter(filterName, [{ coordinates: { lng, lat }, radius: `${radius}` }]);
            }
          } else if (filterName === MAP_CHECKED_FILTER) {
            toggleMapVisibility(parsedQuery[filterName]);
            if (parsedQuery[filterName]) {
              mapChecked = true;
            }
          } else if (inputFilters.includes(filterName) && isArrayWithLength(Object.values(parsedQuery[filterName]))) {
            setFilter(filterName, Object.values(parsedQuery[filterName]));
          }
        });
        // Remove MAP_CHECKED_FILTER because that's not part of graphql query
        // Remove also ADVANCED_NEARBY if mapChecked is false because we are not using that filter in that case
        const finalQuery = mapChecked ? omit([MAP_CHECKED_FILTER], parsedQuery) : omit([ADVANCED_NEARBY, MAP_CHECKED_FILTER], parsedQuery);
        setAdvancedSearchFilter(JSON.stringify(finalQuery));
      } catch (e) {
        console.error('Parsing advanced search query failed: ', e.message);
      }
    }
  }

  render() {
    const { currentLanguage, t } = this.props;
    return (
      <Container activeRoute="/advanced_search" currentLanguage={currentLanguage}>
        <Helmet>
          <title>{`${t('title')} – ${t('advanced-search')}`}</title>
        </Helmet>
        <AdvancedSearch />
      </Container>
    );
  }
}

AdvancedSearchPage.getInitialProps = async ({ req, query }) => {
  const currentLanguage = req ? req.language : i18n.language;
  const namespacesRequired = ['common', 'advanced-search'];
  if (req) {
    const { query: reqQuery } = req;
    return { currentLanguage, query: reqQuery, namespacesRequired };
  }
  return { currentLanguage, query, namespacesRequired };
};

const mapDispatchToProps = (dispatch: Function) => ({
  setAdvancedSearchFilter: (query: string) => dispatch(setCurrentAdvancedSearchFilter(query)),
  setFilter: (filterName: string, data: any) => dispatch(setFilterAction(filterName, data)),
  toggleMapVisibility: (visible: boolean) => dispatch(toggleAdvancedSearchMap(visible)),
});

export default connect<CombinedProps, Props, any, any, any, Function>(
  null,
  mapDispatchToProps,
)(withApollo(withRouter(withTranslation('common')(AdvancedSearchPage))));
