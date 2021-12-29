// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { COURSE_QUERY } from 'lib/constants';
import { withRouter } from 'next/router';
import { size } from 'lodash';
import { i18n, withTranslation } from 'lib/i18n';
import withApollo from 'lib/withApollo';
import { courseBySlugFromState } from 'components/Course/selectors';
import Container from 'components/Container';
import Course from 'components/Course';
import type { GraphQLData } from 'lib/types';

type Props = {|
  currentLanguage: ?string,
  data: GraphQLData,
  slug: string,
  t: Function,
|};

function CoursePage(props: Props) {
  const {
    currentLanguage, data, slug, t,
  } = props;
  return (
    <Container activeRoute={`/${slug}`} currentLanguage={currentLanguage}>
      <Helmet>
        <title>{`${t('title')} – ${slug}`}</title>
      </Helmet>
      <Course slug={slug} data={data} />
    </Container>
  );
}

CoursePage.getInitialProps = async ({ query, req }) => {
  // TODO: figure out how to get data from apolloClient cache instead of redux
  // console.log('apolloClient: ', apolloClient);
  const { slug } = query;
  const currentLanguage = req ? req.language : i18n.language;
  return { currentLanguage, namespacesRequired: ['common', 'course'], slug };
};

const SEARCH_COURSE = gql`
  query CourseBySlugQuery($slug: String!) {
    courseBySlug(slug: $slug) {
      ${COURSE_QUERY}
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
