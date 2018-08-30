// @flow
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Link from 'next/link';
import { connect } from 'react-redux';
import { differenceBy } from 'lodash';
import {
  setCourses as setCoursesFunc,
  setSearchQuery as setSearchQueryFunc,
} from 'components/SearchContainer/actions';
import {
  latestQuery as latestQueryFunc,
  queryResultsFromState as queryResultsFromStateFunc,
} from 'components/SearchContainer/selectors';
import { getRandomKey, uniqueLayoutRatings } from 'helpers/utils';
import LayoutRatingBadges from 'components/Layout/Badges';
import Styles from 'components/SearchContainer/SearchContainer.styles';
import BaseStyles from 'components/Container/Container.styles';

const { UL, LI } = BaseStyles;

const { SearchResultItem } = Styles;

type Props = {
  query: string,
  queryResults: [],
  data?: {},
  latestQuery: string,
  setCourses: Function,
  setSearchQuery: Function,
};

class SearchQuery extends Component<Props> {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const { data } = this.props;
      const { courseByName = [] } = data;
      if (courseByName) {
        this.setCourses(courseByName);
      }
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { data, latestQuery, query } = this.props;
    const { courseByName = [] } = data;
    const prevCourseArr = prevProps.data.courseByName;
    const prevCourses = prevCourseArr && prevCourseArr.length ? prevCourseArr : [];
    if (
      (courseByName
        && courseByName.length
        && differenceBy(courseByName, prevCourses, '_id').length > 0)
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
    const { query, queryResults, data } = this.props;
    if (!query && !queryResults.length) return null;
    if (data && data.loading) {
      return <h1>Loading...</h1>;
    }
    const { courseByName } = data;
    const courses = queryResults.length ? queryResults : courseByName;
    let results = <li>Ei hakutuloksia!</li>;
    if (courses && courses.length) {
      results = courses.map((course) => {
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

SearchQuery.defaultProps = {
  data: {},
};

const mapStateToProps = state => ({
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
