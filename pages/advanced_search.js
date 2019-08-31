// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import withApollo from 'lib/withApollo';
import { getTitle, isArrayWithLength, convertKilometersToMeters } from 'helpers/utils';
import Container from 'components/Container';
import AdvancedSearch from 'components/AdvancedSearch';
import { setFilter, setCurrentAdvancedSearchFilter } from 'components/AdvancedSearch/actions';
import { SELECT_FILTER_NAMES } from 'components/Select/constants';
import { ADVANCED_COURSE_INFO, ADVANCED_NEARBY } from 'lib/constants';
import { MAP_RADIUS_DISTANCE_MAX, MAP_RADIUS_DISTANCE_MIN } from 'components/Map/constants';

type Props = { query: { [key: string]: string } };
type MapStateToProps = {};
type MapDispatchToProps = { setAdvancedSearchFilter: Function, setFilter: Function };

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

const AdvancedSearchPage = (props: CombinedProps) => {
  const { query } = props;
  if (query && Object.keys(query).length > 0 && query.q) {
    try {
      const parsedQuery = JSON.parse(query.q);
      const filters = Object.keys(SELECT_FILTER_NAMES);
      Object.keys(parsedQuery).forEach((filterName) => {
        if (filters.includes(filterName)) {
          if (isArrayWithLength(parsedQuery[filterName])) {
            const filterData = parsedQuery[filterName].map(value => ({ value, label: value }));
            props.setFilter(filterName, filterData);
          } else {
            props.setFilter(filterName, { value: parsedQuery[filterName], label: parsedQuery[filterName] });
          }
        } else if (filterName === ADVANCED_COURSE_INFO) {
          // Special logic
          const courseInfoKeys = Object.keys(parsedQuery[filterName]);
          // eslint-disable-next-line max-len
          courseInfoKeys.forEach(filter => props.setFilter(filter, { value: parsedQuery[filterName][filter], label: parsedQuery[filterName][filter] }));
        } else if (filterName === ADVANCED_NEARBY) {
          // Special logic
          const { coordinates, maxDistance } = parsedQuery[filterName];
          const radius = convertKilometersToMeters(maxDistance);
          if (isArrayWithLength(coordinates) && radius && radius >= MAP_RADIUS_DISTANCE_MIN && radius <= MAP_RADIUS_DISTANCE_MAX) {
            const [lng, lat] = coordinates;
            props.setFilter(filterName, [{ coordinates: { lng, lat }, radius: `${radius}` }]);
          }
        }
      });
      props.setAdvancedSearchFilter(JSON.stringify(parsedQuery));
    } catch (e) {
      console.error('Parsing advanced search query failed: ', e.message);
    }
  }
  return (
    <Container activeRoute="/advanced_search">
      <Helmet>
        <title>{getTitle('Edistynyt haku')}</title>
      </Helmet>
      <AdvancedSearch />
    </Container>
  );
};

AdvancedSearchPage.getInitialProps = async ({ req, query }) => {
  if (req) {
    const { query: reqQuery } = req;
    return { query: reqQuery };
  }
  return query;
};

const mapDispatchToProps = (dispatch: Function) => ({
  setAdvancedSearchFilter: (query: string) => dispatch(setCurrentAdvancedSearchFilter(query)),
  setFilter: (filterName: string, data: any) => dispatch(setFilter(filterName, data)),
});

export default connect<CombinedProps, Props, any, any, any, Function>(
  null,
  mapDispatchToProps,
)(withApollo(withRouter(AdvancedSearchPage)));
