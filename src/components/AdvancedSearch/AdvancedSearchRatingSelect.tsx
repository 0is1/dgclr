import { useTranslation } from 'react-i18next';
import { Select, Space, Typography } from 'antd';
import { RATING_OPTIONS } from '../../utils/constants';
import useNotification from '../../hooks/useNotification';
import useAdvancedQuery from '../../hooks/useAdvancedQuery';
import { CourseQueryParams } from '../../types';

const getFilterRatingsFromQuery = (query: CourseQueryParams) => {
  if (query.filter && query.filter.rating) {
    return query.filter.rating;
  }
  return [];
};
const { Paragraph } = Typography;

function AdvancedSearchRatingSelect() {
  const { query, setQuery } = useAdvancedQuery();
  const { t } = useTranslation(['common']);
  const defaultValues = getFilterRatingsFromQuery(query);
  const { openNotification, contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <Space style={{ width: '100%' }} direction="vertical">
        <Paragraph style={{ marginBottom: 0 }}>
          {t('common:search_course_ratings')}
        </Paragraph>
        <Select
          size="large"
          value={defaultValues}
          style={{ width: '100%' }}
          options={RATING_OPTIONS}
          mode="multiple"
          onChange={(value: string[]) => {
            console.log(value);
            if (value.length > 5) {
              openNotification(
                'You can only select 5 ratings at a time',
                'Remove one of the ratings to add a new one'
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
                    rating: undefined,
                  },
                };
              }
              return {
                ...prev,
                filter: {
                  ...prev.filter,
                  rating: value,
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

export default AdvancedSearchRatingSelect;
