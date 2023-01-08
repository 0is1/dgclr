import React, { useEffect, useState } from 'react';
import { Space, Typography, Empty, Button, Spin, Row, Col } from 'antd';
import { useGeolocated } from 'react-geolocated';
import { RedoOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import NearbySearchQuery from './NearbySearchQuery';
import useLocalStorageState from 'use-local-storage-state';
import { isArrayWithLength } from '../../helpers/utils';
import NearbyDistanceSlider from './NearbyDistanceSlider';

const { Text } = Typography;

function NearbySearch() {
  const { t } = useTranslation(['common']);
  const [waitForSSR, setWaitForSSR] = useState(true);
  const { coords, getPosition, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 15000,
    });
  const [query, setQuery] = useLocalStorageState('nearby_search', {
    defaultValue: {
      coordinates: [] as number[],
      maxDistance: 50,
    },
  });
  useEffect(() => {
    // wait for SSR to finish
    setWaitForSSR(false);
  }, []);
  useEffect(() => {
    // if coords and query are not the same, update query
    if (coords) {
      const { latitude, longitude } = coords;
      const { coordinates } = query;
      if (longitude !== coordinates[0] || latitude !== coordinates[1]) {
        setQuery({
          coordinates: [longitude, latitude],
          maxDistance: 50,
        });
      }
    }
  }, [coords, setQuery, query]);
  if (waitForSSR) {
    return null;
  }
  if (!isGeolocationAvailable) {
    return (
      <Empty
        description={
          <Text type="warning">{t('common:geolocation_not_available')}</Text>
        }
      ></Empty>
    );
  }
  if (!isGeolocationEnabled) {
    return (
      <Empty
        description={
          <Space direction="vertical">
            <Text type="warning">{t('common:geolocation_not_enabled')}</Text>
            <Button
              icon={<RedoOutlined />}
              type="primary"
              onClick={() => {
                getPosition();
              }}
            >
              {t('common:try_again')}
            </Button>
          </Space>
        }
      ></Empty>
    );
  }
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      {isArrayWithLength(query?.coordinates, 2) && (
        <>
          <NearbySearchQuery />
          <NearbyDistanceSlider />
        </>
      )}
      {!isArrayWithLength(query?.coordinates, 2) && (
        <Row justify="center">
          <Col span={6}>
            <Spin
              tip="Loading..."
              style={{
                backgroundColor: 'rgba(200,200,200,0.5)',
                padding: '1rem',
              }}
            />
          </Col>
        </Row>
      )}
    </Space>
  );
}

export default NearbySearch;
