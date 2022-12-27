import { Select, Space, Typography } from 'antd';
// import useLocalStorageState from 'use-local-storage-state';
import { DEFAULT_LIMIT, SURFACE_TYPE_OPTIONS } from '../../utils/constants';
import useNotification from '../../hooks/useNotification';
import useAdvancedQuery from '../../hooks/useAdvancedQuery';
import { CourseQueryParams } from '../../types';

const getFilterSurfaceShapeTypesFromQuery = (query: CourseQueryParams) => {
  if (query?.filter?.courseInfo?.surfaceShapeTypes) {
    return query.filter.courseInfo.surfaceShapeTypes;
  }
  return [];
};
const { Paragraph } = Typography;

function AdvancedSearchSurfaceShapeTypesSelect() {
  const { query, setQuery } = useAdvancedQuery();
  const defaultValues = getFilterSurfaceShapeTypesFromQuery(query);
  const { openNotification, contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <Space style={{ width: '100%' }} direction="vertical">
        <Paragraph style={{ marginBottom: 0 }}>Surface shape types</Paragraph>
        <Select
          value={defaultValues}
          style={{ width: '100%' }}
          options={SURFACE_TYPE_OPTIONS}
          mode="multiple"
          onChange={(value: string[]) => {
            console.log(value);
            if (value.length > 3) {
              openNotification(
                'You can only select 3 surface types at a time',
                'Remove one of the surface types to add a new one'
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
                      surfaceShapeTypes: undefined,
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
                    surfaceShapeTypes: value,
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

export default AdvancedSearchSurfaceShapeTypesSelect;
