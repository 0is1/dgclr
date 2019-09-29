// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { withRouter } from 'next/router';
import { size } from 'lodash';
import { i18n, withTranslation } from 'lib/i18n';
import withApollo from 'lib/withApollo';
import Container from 'components/Container';
import Course from 'components/Course';
import { courseBySlugFromState } from 'components/Course/selectors';
import type { GraphQLData } from 'lib/types';

type Props = {
  currentLanguage: ?string,
  data: GraphQLData,
  slug: string,
  t: Function,
};

const CoursePage = (props: Props) => {
  const {
    currentLanguage, data, slug, t,
  } = props;
  return (
    <Container currentLanguage={currentLanguage}>
      <Helmet>
        <title>{`${t('title')} – ${slug}`}</title>
      </Helmet>
      <Course slug={slug} data={data} />
    </Container>
  );
};

CoursePage.getInitialProps = async ({ query, req }) => {
  const { slug } = query;
  const currentLanguage = req ? req.language : i18n.language;
  return { currentLanguage, namespacesRequired: ['common', 'course'], slug };
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

export default connect<any, Props, any, any, any, Function>(mapStateToProps)(
  withApollo(withRouter(withTranslation('common')(ComponentWithMutation))),
);
