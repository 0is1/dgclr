import { GetServerSidePropsContext } from "next";
import request from "graphql-request";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SERVER_URL, SEARCH_COURSE } from "../../graphql/queries";
import Layout from "../../components/Layout";
import SingleCourse from "../../components/SingleCourse";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;
  const { locale } = context;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([`courseBySlug_${slug}`], () =>
    request(SERVER_URL, SEARCH_COURSE, { slug })
  );

  return {
    props: {
      ...(await serverSideTranslations(`${locale}`, ["common"])),
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function CourseBySlug() {
  return (
    <Layout>
      <SingleCourse />
    </Layout>
  );
}
