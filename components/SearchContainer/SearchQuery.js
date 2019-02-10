// @flow
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Link from 'next/link';
import { connect } from 'react-redux';
import { differenceBy } from 'lodash';
import { Box } from 'rebass';
import { GoChevronRight } from 'react-icons/go';
import { setCourses as setCoursesFunc, setSearchQuery as setSearchQueryFunc } from 'components/SearchContainer/actions';
import { latestQuery as latestQueryFunc, queryResultsFromState as queryResultsFromStateFunc } from 'components/SearchContainer/selectors';
import { getRandomKey, uniqueLayoutRatings } from 'helpers/utils';
import LayoutRatingBadges from 'components/Layout/Badges';
import { ClipLoader } from 'components/Spinners';
import Styles from 'components/SearchContainer/SearchContainer.styles';
import BaseStyles from 'components/Container/Container.styles';
import AdvancedSearchQueryStyles from 'components/SearchContainer/AdvancedSearchQuery.styles';
import type { GraphQLData, State } from 'lib/types';

const { UL, LI } = BaseStyles;
const { NoResults } = AdvancedSearchQueryStyles;
const { SearchResultItem, SearchResultIcon } = Styles;

type Props = {
  query: string,
  queryResults: [],
  data: GraphQLData,
  latestQuery: string,
  setCourses: Function,
  setSearchQuery: Function,
};

class SearchQuery extends Component<Props> {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const { data = {} } = this.props;
      const { courseByName = [] } = data;
      if (courseByName) {
        this.setCourses(courseByName);
      }
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { data = {}, latestQuery, query } = this.props;
    const { courseByName = [] } = data;
    const prevCourseData = prevProps.data;
    const prevCourseArr = prevCourseData && prevProps.data.courseByName;
    const prevCourses = prevCourseArr && prevCourseArr.length ? prevCourseArr : [];
    if (
      (courseByName && courseByName.length && differenceBy(courseByName, prevCourses, '_id').length > 0)
      || (!courseByName.length && query !== latestQuery)
    ) {
      return true;
    }
    return null;
  }

  setCourses = (courses) => {
    const { setCourses, setSearchQuery, query } = this.props;
    setCourses(courses);
    setSearchQuery(courses, query);
  };

  render() {
    const { query, queryResults, data = {} } = this.props;
    if (!query && !queryResults.length) return null;
    if (data && data.loading) {
      return <ClipLoader />;
    }
    const { courseByName } = data;
    const courses = queryResults.length ? queryResults : courseByName;
    let results = false;
    if (courses && courses.length) {
      results = courses.map((course) => {
        const ratings = uniqueLayoutRatings(course.layouts);
        return (
          <LI key={getRandomKey()} listStyle="none">
            <Link as={`/${course.slug}`} href={`/course?slug=${course.slug}`}>
              <SearchResultItem>
                {course.name}
                <LayoutRatingBadges tiny ratings={ratings} />
                <SearchResultIcon>
                  <GoChevronRight size="1.5rem" color="#0067ee" />
                </SearchResultIcon>
              </SearchResultItem>
            </Link>
          </LI>
        );
      });
    }
    if (!results) {
      return (
        <Box p={[0, '0.5rem 2rem']}>
          <NoResults>Ei hakutuloksia!</NoResults>
        </Box>
      );
    }
    return (
      <Box p={[0, '0.5rem 2rem']}>
        <UL>{results}</UL>
      </Box>
    );
  }
}

const mapStateToProps = (state: State) => ({
  latestQuery: latestQueryFunc(state),
  queryResults: queryResultsFromStateFunc(state, latestQueryFunc(state)),
});

const mapDispatchToProps = dispatch => ({
  setCourses: courses => dispatch(setCoursesFunc(courses)),
  setSearchQuery: (courses, query) => dispatch(setSearchQueryFunc(courses, query)),
});

const SEARCH_COURSES = gql`
  query CoursesQuery($query: String!) {
    courseByName(query: $query) {
      _id
      name
      description
      slug
      courseInfo {
        basketType
        teeType
        infoSignType
        surfaceShapeTypes
        courseTypes
        mapUrl
        founded
        maintenanceCycle
        rangeMaster
        courseDesigner
        fee {
          amount
          currency
          value
        }
      }
      locationInfo {
        address
        city
        zip
        location {
          coordinates
        }
      }
      layouts {
        name
        mapUrl
        rating
        holes {
          par
          length {
            foot
            meter
          }
        }
        holeCount
        totalPar
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
const ComponentWithMutation = graphql(SEARCH_COURSES, {
  options: ({ query }) => ({
    variables: {
      query,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
  skip: ({ query }) => !query || query.length < 2,
})(SearchQuery);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentWithMutation);
