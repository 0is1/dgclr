// @flow
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Link from 'next/link';
import { connect } from 'react-redux';
import { differenceBy } from 'lodash';
import { Box } from 'rebass';
import { GoChevronRight } from 'react-icons/go';
import { getRandomKey, uniqueLayoutRatings } from 'helpers/utils';
import { COURSE_QUERY } from 'lib/constants';
import LayoutRatingBadges from 'components/Layout/Badges';
import { ClipLoader } from 'components/Spinners';
import BaseStyles from 'components/Container/Container.styles';
import AdvancedSearchQueryStyles from 'components/AdvancedSearch/AdvancedSearchQuery.styles';
import type { GraphQLData, State } from 'lib/types';
import { setCourses as setCoursesFunc } from 'components/Course/actions';
import Styles from './SearchContainer.styles';
import { setSearchQuery as setSearchQueryFunc } from './actions';
import { latestQuery as latestQueryFunc, queryResultsFromState as queryResultsFromStateFunc } from './selectors';

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

const mapDispatchToProps = (dispatch: Function) => ({
  setCourses: courses => dispatch(setCoursesFunc(courses)),
  setSearchQuery: (courses, query) => dispatch(setSearchQueryFunc(courses, query)),
});

const SEARCH_COURSES = gql`
  query CoursesQuery($query: String!) {
    courseByName(query: $query) {
      ${COURSE_QUERY}
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

export default connect<any, Props, any, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentWithMutation);
