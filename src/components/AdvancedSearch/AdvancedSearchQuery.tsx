import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { Col, Empty, Spin, Typography } from 'antd';
import { getCourses } from '../../graphql/fetcher';
import { CourseQueryFilterInput } from '../../types';
import AdvancedMapComponent from '../Maps/AdvancedMapComponent';
import useAdvancedQuery from '../../hooks/useAdvancedQuery';

const { Text, Title } = Typography;

function AdvancedSearchQuery() {
  const { t } = useTranslation(['common']);
  const { query } = useAdvancedQuery();
  const { data, failureReason, isError, isLoading } = useQuery({
    queryKey: [`courses_${JSON.stringify(query)}`],
    queryFn: async () => {
      const { filter, limit } = query;
      const filterAsFilterInput = filter as CourseQueryFilterInput;
      const data = await getCourses({
        filter: filterAsFilterInput,
        limit,
      });
      return data;
    },
    retry: 2,
  });
  if (isError) {
    console.log(failureReason);
    return (
      <Col span={24}>
        <Title level={2}>
          <>{t('common:search_error')}</>
        </Title>
      </Col>
    );
  }
  if (isLoading) {
    return (
      <Col
        span={24}
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          minHeight: '125px',
        }}
      >
        <Spin tip="Loading" size="large" style={{ marginTop: '4rem' }}>
          <div className="content" />
        </Spin>
      </Col>
    );
  }
  if (data?.courses.length === 0) {
    return (
      <Col span={24}>
        <Empty
          description={<Text strong>{t('common:search_no_results')}</Text>}
        />
      </Col>
    );
  }
  const locations = data?.courses.map((course) => {
    const { locationInfo } = course;
    const { location } = locationInfo;
    const { coordinates } = location;
    if (!coordinates) {
      return {
        id: course._id,
        name: course.name,
        slug: course.slug,
        lat: undefined,
        lng: undefined,
      };
    }
    return {
      id: course._id,
      name: course.name,
      slug: course.slug,
      lat: coordinates[1],
      lng: coordinates[0],
    };
  });
  return (
    <Col span={24}>
      <AdvancedMapComponent locations={locations} />
    </Col>
  );
}

export default AdvancedSearchQuery;
