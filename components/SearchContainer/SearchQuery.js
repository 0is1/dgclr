// @flow
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { connect } from 'react-redux';
import { setCourses as setCoursesFunc } from 'components/SearchContainer/actions';
import Styles from 'components/SearchContainer/SearchContainer.styles';

const { SearchResultItem } = Styles;

type Props = {
  query: string,
  setCourses: Function,
};

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
      }
      locationInfo {
        address
        city
        zip
      }
      layouts {
        name
        rating
        holes {
          bar
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

class SearchQuery extends Component<Props> {
  setCourses = (courses) => {
    const { setCourses } = this.props;
    setCourses(courses);
  };

  renderQuery = () => {
    const { query } = this.props;
    console.log('query: ', query);
    return (
      <Query query={SEARCH_COURSES} variables={{ query }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          const { courseByName } = data;
          let results = <li>Ei hakutuloksia!</li>;
          if (courseByName && courseByName.length) {
            this.setCourses(courseByName);
            results = courseByName.map(course => (
              // eslint-disable-next-line no-underscore-dangle
              <li key={course._id}>
                <Link as={`/${course.slug}`} href={`/course?slug=${course.slug}`}>
                  <SearchResultItem>{course.name}</SearchResultItem>
                </Link>
              </li>
            ));
          }
          return <ul>{results}</ul>;
        }}
      </Query>
    );
  };

  render() {
    const { query } = this.props;
    if (!query || query.length < 2) return null;
    return this.renderQuery();
  }
}
const mapDispatchToProps = dispatch => ({
  setCourses: courses => dispatch(setCoursesFunc(courses)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SearchQuery);
