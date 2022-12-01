import { Col, PageHeader, Row, Space, Typography } from "antd";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/Layout";
import SiteMenu from "../components/Menu";
import { StaticProps } from "../types/pages";

const { Title } = Typography;

export default function AdvancedSearch() {
  const { t } = useTranslation(["common"]);
  return (
    <Layout>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <PageHeader
          title="DGCLR"
          backIcon={null}
          subTitle={t("common:sub_title")}
          footer={<SiteMenu />}
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
            <Title level={4}>{t("common:advanced_search")}</Title>
          </Col>
        </Row>
      </Space>
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
