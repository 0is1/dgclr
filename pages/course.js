// @flow
import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { withRouter } from 'next/router';
import { size } from 'lodash';
import withApollo from 'lib/withApollo';
import Container from 'components/Container';
import Course from 'components/Course';
import { courseBySlugFromState } from 'components/Course/selectors';
import type { GraphQLData } from 'lib/types';

type Props = {
  data: GraphQLData,
  slug: string,
};

const CoursePage = (props: Props) => {
  const { data, slug } = props;
  return (
    <Container>
      <Course slug={slug} data={data} />
    </Container>
  );
};

CoursePage.getInitialProps = async ({ query }) => {
  const { slug } = query;
  return { slug };
};

const SEARCH_COURSE = gql`
  query CourseBySlugQuery($slug: String!) {
    courseBySlug(slug: $slug) {
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

const ComponentWithMutation = graphql(SEARCH_COURSE, {
  options: ({ router: { query } }) => ({
    variables: {
      slug: query.slug,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
  skip: ({ course }) => size(course) > 0,
})(CoursePage);

const mapStateToProps = (state, ownProps) => ({
  course: courseBySlugFromState(state, ownProps),
});

export default connect(mapStateToProps)(withApollo(withRouter(ComponentWithMutation)));
