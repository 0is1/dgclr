import { useQuery } from '@tanstack/react-query';
import { Empty, Space, Table, Tag, Typography } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DoubleRightOutlined } from '@ant-design/icons';
import useLocalStorageState from 'use-local-storage-state';
import { useTranslation } from 'next-i18next';
import { Course } from '../../types';
import { getNearbyCourses } from '../../graphql/fetcher';
import { getRatingListFromCourseLayouts } from '../../helpers/course';

const { Text } = Typography;

function NearbySearchQuery() {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const [query] = useLocalStorageState('nearby_search', {
    defaultValue: {
      coordinates: [],
      maxDistance: 50,
    },
  });
  const [currentPageForQuery, setCurrentPageForQuery] = useLocalStorageState(
    `current_page_${JSON.stringify(query)}`,
    {
      defaultValue: 1,
    }
  );
  const { data, failureReason, isError, isLoading } = useQuery({
    queryKey: [`courseByName_${JSON.stringify(query)}`],
    queryFn: async () => {
      const data = await getNearbyCourses(query.coordinates, query.maxDistance);
      return data;
    },
    retry: 2,
  });
  if (isError) {
    console.log(failureReason);
    return (
      <Empty
        description={<Text type="warning">{t('common:search_error')}</Text>}
      ></Empty>
    );
  }
  const columns = [
    {
      title: `${t('common:course_name')}`,
      dataIndex: 'name',
      key: 'name',
      showSorterTooltip: false,
      sorter: (a: Course, b: Course) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      render: (text: string, record: Course) => {
        const tags = getRatingListFromCourseLayouts(record);
        return (
          <Space>
            <Link href={`/${record.slug}`}>
              {text} <DoubleRightOutlined />
            </Link>
            <span>
              {tags.map((tag) => (
                <Tag color="blue" key={tag.key}>
                  {tag.rating}
                </Tag>
              ))}
            </span>
          </Space>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={data?.nearbyCourse}
      columns={columns}
      loading={isLoading}
      rowKey="_id"
      pagination={{
        current: currentPageForQuery,
        onChange: (page) => {
          setCurrentPageForQuery(page);
        },
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            router.push(`/${record.slug}`);
          },
        };
      }}
    />
  );
}

export default NearbySearchQuery;
