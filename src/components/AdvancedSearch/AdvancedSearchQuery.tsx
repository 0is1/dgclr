import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { Col, Spin, Typography } from 'antd';
import { getCourses } from '../../graphql/fetcher';
import { CourseQueryFilterInput } from '../../types';
import AdvancedMapComponent from '../Maps/AdvancedMapComponent';
import useAdvancedQuery from '../../hooks/useAdvancedQuery';

const { Title } = Typography;

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
      <Col span={24}>
        <Spin tip="Loading" size="large" style={{ marginTop: '4rem' }}>
          <div className="content" />
        </Spin>
      </Col>
    );
  }
  if (data?.courses.length === 0) {
    return (
      <Col span={24}>
        <Title level={2}>No results</Title>
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
