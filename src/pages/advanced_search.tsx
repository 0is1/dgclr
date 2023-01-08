import { SlidersOutlined } from '@ant-design/icons';
import { Col, Row, Space, Typography } from 'antd';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdvancedSearchQuery from '../components/AdvancedSearch';
import Layout from '../components/Layout';
import SiteMenu from '../components/Menu';
import PageHeader from '../components/PageHeader';
import { StaticProps } from '../types/pages';

const { Title, Text } = Typography;

export default function AdvancedSearch() {
  const { t } = useTranslation(['common']);
  return (
    <Layout>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <PageHeader
          title="frisbeegolfrata.info:"
          beforeTitle={<SlidersOutlined />}
          description={t('common:sub_title')}
        >
          <SiteMenu />
        </PageHeader>
        <Row justify="center">
          <Col
            xs={{
              span: 24,
            }}
            sm={{
              span: 24,
            }}
            md={{
              span: 20,
            }}
            lg={{
              span: 16,
            }}
          >
            <Title level={4}>{t('common:advanced_search')}</Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Text strong>{t('common:advanced_search_description')}</Text>
              <AdvancedSearchQuery />
            </Space>
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
