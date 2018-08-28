// @flow
import React from 'react';
import withApollo from 'lib/withApollo';
import Course from 'components/Course';

type Props = {
  slug: string,
};

const CoursePage = (props: Props) => {
  const { slug } = props;
  return <Course slug={slug} />;
};

CoursePage.getInitialProps = async ({ query }) => {
  const { slug } = query;
  return { slug };
};

export default withApollo(CoursePage);
