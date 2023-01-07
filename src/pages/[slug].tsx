import { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import SingleCourse from '../components/SingleCourse';
import { getCourseBySlug } from '../graphql/fetcher';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;
  const { defaultLocale, locale } = context;
  const localeForTranslation = locale || defaultLocale;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([`courseBySlug_${slug}`], async () => {
    const data = await getCourseBySlug(`${slug}`);
    return data;
  });
  const translations = await serverSideTranslations(`${localeForTranslation}`, [
    'common',
  ]);
  return {
    props: {
      ...translations,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function SearchCourseBySlug() {
  return (
    <Layout>
      <SingleCourse />
    </Layout>
  );
}
