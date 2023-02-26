import { Slider, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import useAdvancedQuery from '../../hooks/useAdvancedQuery';
import { CourseQueryParams } from '../../types';

const { Paragraph } = Typography;

const getFilterHoleAverageLengthFromQuery = (
  query: CourseQueryParams
): [number, number] => {
  if (query?.filter?.holeAverageLength) {
    const { min, max } = query.filter.holeAverageLength;
    if (min !== undefined && max !== undefined) {
      return [min, max];
    }
  }
  return [0, 180];
};

function AdvancedSearchRangeSlider() {
  const { query, setQuery } = useAdvancedQuery();
  const { t } = useTranslation(['common']);
  const defaultValues = getFilterHoleAverageLengthFromQuery(query);
  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Paragraph style={{ marginBottom: 0 }}>
        {t('common:search_course_hole_average_length')}
      </Paragraph>
      <Slider
        range
        step={10}
        min={0}
        max={180}
        defaultValue={defaultValues}
        tooltip={{
          open: true,
          placement: 'bottom',
          formatter: (value) => `${value}m`,
        }}
        onAfterChange={(value) => {
          const [min, max] = value;
          setQuery((prev) => {
            return {
              ...prev,
              filter: {
                ...prev.filter,
                holeAverageLength: {
                  min,
                  max,
                },
              },
            };
          });
        }}
      />
    </Space>
  );
}

export default AdvancedSearchRangeSlider;
