// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

type Props = {
  query: String,
};

const SEARCH_COURSES = gql`
  query CoursesQuery($query: String!) {
    courseByName(query: $query) {
      _id
      name
      description
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

const SearchQuery = ({ query }: Props) => {
  if (!query || query === '') return null;
  console.log('query: ', query);
  return (
    <Query query={SEARCH_COURSES} variables={{ query }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        const { courseByName } = data;
        let results = <li>Ei hakutuloksia!</li>;
        if (courseByName && courseByName.length) {
          results = courseByName.map((course) => {
            console.log('course: ', course);
            // eslint-disable-next-line no-underscore-dangle
            return <li key={course._id}>{course.name}</li>;
          });
        }
        return <ul>{results}</ul>;
      }}
    </Query>
  );
};

export default SearchQuery;
