import { SlidersOutlined } from '@ant-design/icons';
import { Col, Row, Space, Typography } from 'antd';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdvancedSearchQuery from '../components/AdvancedSearch';
import Layout from '../components/Layout';
import SiteMenu from '../components/Menu';
import PageHeader from '../components/PageHeader';
import { StaticProps } from '../types/pages';

const { Title } = Typography;

export default function AdvancedSearch() {
  const { t } = useTranslation(['common']);
  return (
    <Layout>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <PageHeader
          title="DGCLR"
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
              span: 12,
            }}
          >
            <Title level={4}>{t('common:advanced_search')}</Title>
            <AdvancedSearchQuery />
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