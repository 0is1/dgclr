import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Space, Typography } from 'antd';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import SiteMenu from '../components/Menu';
import PageHeader from '../components/PageHeader';
import { StaticProps } from '../types/pages';

const { Paragraph, Title } = Typography;

export default function Info() {
  const { t } = useTranslation(['common']);
  return (
    <Layout>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <PageHeader
          title="frisbeegolfrata.info:"
          beforeTitle={<InfoCircleOutlined />}
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
            <Title level={4}>{t('info:title')}</Title>
            <Paragraph>{t('info:paragraph_01')}</Paragraph>
            <Paragraph>{t('info:paragraph_02')}</Paragraph>
            <Paragraph>{t('info:paragraph_03')}</Paragraph>
          </Col>
        </Row>
      </Space>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: StaticProps) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'info'])),
    },
  };
};
