import { Button, Modal } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'next-i18next';
import {
  getCourseAddressFromCourseData,
  getCourseDataFromSearchCourseBySlug,
  getLocationCoordinatesFromCourseData,
} from '../../helpers/course';
import useGetCourseBySlug from '../../hooks/useGetCourseBySlug';
import MapComponent from './MapComponent';
import useWindowSize from '../../hooks/useWindowSize';

const MapModal: React.FC = () => {
  const router = useRouter();
  const { isMobileWidth } = useWindowSize();
  const { t } = useTranslation(['common']);
  const { slug } = router.query;
  const { data } = useGetCourseBySlug(slug as string);
  const course = getCourseDataFromSearchCourseBySlug(data);
  const title = getCourseAddressFromCourseData(course);
  const coordinates = getLocationCoordinatesFromCourseData(course);
  const showModal = () => {
    Modal.info({
      bodyStyle: {
        padding: isMobileWidth ? 0 : '1rem 1rem .5rem',
        minHeight: '50vh',
      },
      width: isMobileWidth ? '100vw' : '80vw',
      title,
      content: <MapComponent coordinates={coordinates} />,
      okText: t('common:close'),
    });
  };
  if (!title) {
    return null;
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t('common:show_on_map')}
      </Button>
    </>
  );
};

export default MapModal;
