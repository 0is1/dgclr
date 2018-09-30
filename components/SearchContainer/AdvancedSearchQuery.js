// @flow
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Link from 'next/link';
import { connect } from 'react-redux';
import { differenceBy, size } from 'lodash';
import {
  setCourses as setCoursesFunc,
  setAdvancedSearchQuery,
} from 'components/SearchContainer/actions';
import {
  latestAdvancedQuery as latestQueryFunc,
  queryResultsFromState as queryResultsFromStateFunc,
} from 'components/SearchContainer/selectors';
import { getRandomKey, uniqueLayoutRatings } from 'helpers/utils';
import LayoutRatingBadges from 'components/Layout/Badges';
import { ClipLoader } from 'components/Spinners';
import Styles from 'components/SearchContainer/SearchContainer.styles';
import BaseStyles from 'components/Container/Container.styles';
import type { GraphQLData, State } from 'lib/types';

const { UL, LI } = BaseStyles;

const { SearchResultItem } = Styles;

type Props = {
  filter: {},
  queryResults: [],
  data: GraphQLData,
  latestQuery: string,
  setCourses: Function,
  setSearchQuery: Function,
};

class AdvancedSearchQuery extends Component<Props> {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const { data = {} } = this.props;
      const { courses = [] } = data;
      if (courses) {
        this.setCourses(courses);
      }
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { data = {}, latestQuery, filter } = this.props;
    const { courses = [] } = data;
    const prevCourseData = prevProps.data;
    const prevCourseArr = prevCourseData && prevProps.data.courses;
    const prevCourses = prevCourseArr && prevCourseArr.length ? prevCourseArr : [];
    const stringifyFilter = JSON.stringify(filter);
    // console.log('courses: ', courses);
    // console.log('prevCourses: ', prevCourses);
    if (
      (courses && courses.length && differenceBy(courses, prevCourses, '_id').length > 0)
      || (!courses.length && stringifyFilter !== latestQuery)
      || (courses.length !== prevCourses.length && stringifyFilter !== latestQuery)
    ) {
      return true;
    }
    return null;
  }

  setCourses = (courses) => {
    const { setCourses, setSearchQuery, filter } = this.props;
    setCourses(courses);
    setSearchQuery(courses, JSON.stringify(filter));
  };

  render() {
    const { filter, queryResults, data = {} } = this.props;
    if (size(filter) < 1 && !queryResults.length) return null;
    if (data && data.loading) {
      return <ClipLoader />;
    }
    const { courses } = data;
    const courseData = queryResults.length ? queryResults : courses;
    let results = <li>Ei hakutuloksia!</li>;
    if (courseData && courseData.length) {
      results = courseData.map((course) => {
        const ratings = uniqueLayoutRatings(course.layouts);
        return (
          <LI key={getRandomKey()}>
            <Link as={`/${course.slug}`} href={`/course?slug=${course.slug}`}>
              <SearchResultItem>
                {course.name}
                <LayoutRatingBadges tiny ratings={ratings} />
              </SearchResultItem>
            </Link>
          </LI>
        );
      });
    }
    return <UL>{results}</UL>;
  }
}

const mapStateToProps = (state: State) => ({
  latestQuery: latestQueryFunc(state),
  queryResults: queryResultsFromStateFunc(state, latestQueryFunc(state)),
});

const mapDispatchToProps = dispatch => ({
  setCourses: courses => dispatch(setCoursesFunc(courses)),
  setSearchQuery: (courses, query) => dispatch(setAdvancedSearchQuery(courses, query)),
});

const SEARCH_COURSES = gql`
  query AdvancedCoursesQuery($filter: CourseQueryFilterInput!) {
    courses(filter: $filter) {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentWithMutation);
