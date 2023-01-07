import { Col, Divider, Row, Space, Typography } from 'antd';
import { useTranslation } from 'next-i18next';
import { HomeOutlined } from '@ant-design/icons';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import TextSearch from '../components/TextSearch';
import NearbySearch from '../components/NearbySearch';
import SiteMenu from '../components/Menu';
import PageHeader from '../components/PageHeader';
import { StaticProps } from '../types/pages';

const { Title } = Typography;

export default function Home() {
  const { t } = useTranslation(['common']);
  return (
    <Layout>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <PageHeader
          title="DGCLR"
          beforeTitle={<HomeOutlined />}
          description={t('common:sub_title')}
        >
          <SiteMenu />
        </PageHeader>
        <Row justify="center" gutter={[16, 16]}>
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
            <Title level={4}>{t('common:text_search_placeholder')}</Title>
            <TextSearch />
            <Divider />
            <Title level={4}>{t('common:nearby_search_title')}</Title>
            <NearbySearch />
          </Col>
        </Row>
      </Space>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: StaticProps) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
