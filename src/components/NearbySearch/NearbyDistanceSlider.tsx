import { Col, InputNumber, Row, Slider, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import useLocalStorageState from 'use-local-storage-state';

const { Text } = Typography;

const NearbyDistanceSlider = () => {
  const { t } = useTranslation(['common']);
  const [query, setQuery] = useLocalStorageState('nearby_search', {
    defaultValue: {
      coordinates: [] as number[],
      maxDistance: 50,
    },
  });
  const [value, setValue] = useState<number>(query.maxDistance);
  const onChange = useCallback(
    (value: number | null) => {
      if (value) {
        setQuery({
          coordinates: query.coordinates,
          maxDistance: value,
        });
      }
    },
    [setQuery, query]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(debounce(onChange, 500), [
    onChange,
  ]);

  return (
    <Row gutter={[16, 16]} justify="space-between">
      <Col span={24}>
        <Text>{t('common:nearby_distance_title')}</Text>
      </Col>
      <Col span={16}>
        <Slider
          step={5}
          min={5}
          max={150}
          onChange={(value) => {
            setValue(value);
            debouncedChangeHandler(value);
          }}
          value={value}
        />
      </Col>
      <Col span={6}>
        <InputNumber
          min={5}
          max={150}
          formatter={(value) => `${value} km`}
          parser={(value) =>
            value ? parseInt(value?.replace(' km', ''), 10) : 50
          }
          value={value}
          onChange={(value) => {
            if (value) {
              setValue(value);
              debouncedChangeHandler(value);
            }
          }}
        />
      </Col>
    </Row>
  );
};

export default NearbyDistanceSlider;
