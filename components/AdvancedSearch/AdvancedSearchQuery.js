// @flow
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Link from 'next/link';
import { connect } from 'react-redux';
import { differenceBy, size } from 'lodash';
import { Box } from 'rebass';
import { withTranslation } from 'lib/i18n';
import { GoChevronRight } from 'react-icons/go';
import { uniqueLayoutRatings, isArrayWithLength } from 'helpers/utils';
import { COURSE_QUERY } from 'lib/constants';
import LayoutRatingBadges from 'components/Layout/Badges';
import { ClipLoader } from 'components/Spinners';
import Styles from 'components/SearchContainer/SearchContainer.styles';
import BaseStyles from 'components/Container/Container.styles';
import type {
  GraphQLData, State, QueryResults, Course,
} from 'lib/types';
import { setCourses as setCoursesFunc } from 'components/Course/actions';
import { queryResultsFromState as queryResultsFromStateSelector } from 'components/SearchContainer/selectors';
import { setAdvancedSearchQuery } from './actions';
import { latestAdvancedQuery as latestQueryFunc } from './selectors';
import AdvancedSearchQueryStyles from './AdvancedSearchQuery.styles';

const { UL, LI } = BaseStyles;
const { SearchResultItem, SearchResultIcon } = Styles;
const { NoResults } = AdvancedSearchQueryStyles;

type Props = {
  filter: {},
  data: GraphQLData,
  t: Function,
};

type MapStateToProps = {
  latestQuery: string,
  queryResults: QueryResults,
};

type MapDispatchToProps = {
  setCourses: Function,
  setSearchQuery: Function,
};

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

export class AdvancedSearchQuery extends Component<CombinedProps> {
  componentDidUpdate(prevProps: CombinedProps, prevState: any, snapshot: any) {
    if (snapshot !== null) {
      // $FlowFixMe data is set in Props but flow complains that it's missing in MapStateToProps or MapDispatchToProps
      const { data } = this.props;
      const { courses = [] } = data || {};
      this.setCourses(courses);
    }
  }

  getSnapshotBeforeUpdate(prevProps: CombinedProps) {
    const { data, latestQuery, filter } = this.props;
    const { courses = [] } = data || {};
    const prevCourseData = prevProps.data;
    const prevCourseArr = prevCourseData && prevProps.data.courses;
    const prevCourses = isArrayWithLength(prevCourseArr) ? prevCourseArr : [];
    const stringifyFilter = JSON.stringify(filter);
    // console.log('courses: ', courses);
    // console.log('prevCourses: ', prevCourses);
    // console.log('latestQuery: ', latestQuery);
    // console.log('stringifyFilter: ', stringifyFilter);
    if (
      (isArrayWithLength(courses) && differenceBy(courses, prevCourses, '_id').length > 0)
      || (!isArrayWithLength(courses) && stringifyFilter !== latestQuery)
      || (isArrayWithLength(courses) && stringifyFilter !== '' && latestQuery === '')
      || (prevCourses && courses.length !== prevCourses.length && stringifyFilter !== latestQuery)
    ) {
      return true;
    }
    return null;
  }

  setCourses = (courses: Array<?Course>) => {
    const { setCourses, setSearchQuery, filter } = this.props;
    setCourses(courses);
    setSearchQuery(courses, JSON.stringify(filter));
  };

  getResultList = () => {
    // $FlowFixMe queryResults is set in MapStateToProps but flow complains that it's missing in Props or MapDispatchToProps
    const { queryResults, data = {} } = this.props;
    const { courses } = data;
    const courseData = isArrayWithLength(queryResults) ? queryResults : courses;
    let results = false;
    if (isArrayWithLength(courseData)) {
      // $FlowFixMe flow does not understand that isArrayWithLength checks queryResults type
      results = courseData.map((course) => {
        const ratings = uniqueLayoutRatings(course.layouts);
        return (
          <LI key={course.slug} listStyle="none">
            <Link as={`/${course.slug}`} href={`/course?slug=${course.slug}`}>
              <SearchResultItem>
                {course.name}
                <LayoutRatingBadges tiny ratings={ratings} />
                <SearchResultIcon>
                  <GoChevronRight size="25" color="#0067ee" />
                </SearchResultIcon>
              </SearchResultItem>
            </Link>
          </LI>
        );
      });
    }
    return results;
  };

  render() {
    // $FlowFixMe queryResults is set in MapStateToProps but flow complains that it's missing in Props or MapDispatchToProps
    const {
      filter, queryResults, data = {}, t,
    } = this.props;
    if (size(filter) < 1 && !queryResults.length) return null;
    if (data && data.loading) {
      return <ClipLoader />;
    }
    const results = this.getResultList();
    if (!results) {
      return (
        <Box p={[0, '0.5rem 2rem']}>
          <NoResults>{t('no-search-results')}</NoResults>
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

const mapStateToProps = (state: State): MapStateToProps => ({
  latestQuery: latestQueryFunc(state),
  queryResults: queryResultsFromStateSelector(state, latestQueryFunc(state)),
});

const mapDispatchToProps = (dispatch: Function): MapDispatchToProps => ({
  setCourses: courses => dispatch(setCoursesFunc(courses)),
  setSearchQuery: (courses, query) => dispatch(setAdvancedSearchQuery(courses, query)),
});

const SEARCH_COURSES = gql`
  query AdvancedCoursesQuery($filter: CourseQueryFilterInput!) {
    courses(filter: $filter, limit: 150) {
      ${COURSE_QUERY}
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (AdvancedSearchQuery)
const ComponentWithMutation = graphql(SEARCH_COURSES, {
  options: ({ filter }) => ({
    variables: {
      filter,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
  skip: ({ filter }) => !filter || size(filter) < 1,
})(AdvancedSearchQuery);

export default connect<CombinedProps, Props, any, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(ComponentWithMutation));
