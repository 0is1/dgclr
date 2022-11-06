import { Col, PageHeader, Row } from "antd";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/Layout";
import TextSearch from "../components/TextSearch";
import { StaticProps } from "../types/pages";

export default function Home() {
  const { t } = useTranslation(["common"]);
  return (
    <Layout>
      <PageHeader
        title="DGCLR"
        backIcon={null}
        subTitle={t("common:sub_title")}
      />
      <Row justify="center">
        <Col
          xs={{
            span: 24,
          }}
          sm={{
            span: 24,
          }}
          md={{
            span: 12,
          }}
        >
          <TextSearch />
        </Col>
      </Row>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: StaticProps) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
