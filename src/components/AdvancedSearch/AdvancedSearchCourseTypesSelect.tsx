import { Select, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LIMIT, COURSE_TYPE_OPTIONS } from '../../utils/constants';
import useNotification from '../../hooks/useNotification';
import useAdvancedQuery from '../../hooks/useAdvancedQuery';
import { CourseQueryParams } from '../../types';

const getFilterCourseTypesFromQuery = (query: CourseQueryParams) => {
  if (query?.filter?.courseInfo?.courseTypes) {
    return query.filter.courseInfo.courseTypes;
  }
  return [];
};
const { Paragraph } = Typography;

function AdvancedSearchCourseTypesSelect() {
  const { query, setQuery } = useAdvancedQuery();
  const { t } = useTranslation(['common']);
  const defaultValues = getFilterCourseTypesFromQuery(query);
  const { openNotification, contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <Space style={{ width: '100%' }} direction="vertical">
        <Paragraph style={{ marginBottom: 0 }}>
          {t('common:search_course_types')}
        </Paragraph>
        <Select
          size="large"
          value={defaultValues}
          style={{ width: '100%' }}
          options={COURSE_TYPE_OPTIONS}
          mode="multiple"
          onChange={(value: string[]) => {
            if (value.length > 3) {
              openNotification(
                'You can only select 3 course types at a time',
                'Remove one of the course types to add a new one'
              );
              return;
            }
            // @ts-ignore
            setQuery((prev) => {
              // get other than rating filter
              if (value.length === 0) {
                // omit rating from filter
                return {
                  ...prev,
                  filter: {
                    ...prev.filter,
                    courseInfo: {
                      ...prev.filter?.courseInfo,
                      courseTypes: undefined,
                    },
                  },
                  limit: DEFAULT_LIMIT,
                };
              }
              return {
                ...prev,
                filter: {
                  ...prev.filter,
                  courseInfo: {
                    ...prev.filter?.courseInfo,
                    courseTypes: value,
                  },
                },
                limit: undefined,
              };
            });
          }}
        />
      </Space>
    </>
  );
}

export default AdvancedSearchCourseTypesSelect;
