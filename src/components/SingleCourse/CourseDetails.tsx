import { Descriptions, Space, Tag } from 'antd';
import { useTranslation } from 'next-i18next';
import { getCourseInfo } from '../../helpers/course';
import MapModal from '../Maps/MapModal';
import { Course } from '../../types';

const CourseDetails = (props: { course: Course | undefined }) => {
  const { course } = props;
  const { t } = useTranslation(['common']);
  const courseInfo = getCourseInfo(course);
  if (!courseInfo) {
    return null;
  }
  return (
    <Descriptions title={t('common:course_info')} layout="vertical" column={2}>
      <Descriptions.Item label={<strong>{t('common:course_address')}</strong>}>
        <Space direction="vertical">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${courseInfo.address}%20${courseInfo.city}%20${courseInfo.zip}`}
            target="_blank"
            rel="noreferrer"
          >
            {courseInfo.address}, {courseInfo.city}, {courseInfo.zip}
          </a>
          <MapModal />
        </Space>
      </Descriptions.Item>
      {courseInfo.fee?.amount && (
        <Descriptions.Item label={<strong>{t('common:course_fee')}</strong>}>
          {courseInfo.fee.amount} {courseInfo.fee.currency}
        </Descriptions.Item>
      )}
      <Descriptions.Item
        label={<strong>{t('common:course_maintenance_cycle')}</strong>}
      >
        <Tag>{courseInfo.maintenanceCycle}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label={<strong>{t('common:course_type')}</strong>}>
        {courseInfo.courseTypes.map((courseType) => (
          <Tag key={courseType}>{courseType}</Tag>
        ))}
      </Descriptions.Item>
      <Descriptions.Item
        label={<strong>{t('common:course_surface_type')}</strong>}
      >
        {courseInfo.surfaceShapeTypes.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>{t('common:course_designer')}</strong>}>
        {courseInfo.courseDesigner}
      </Descriptions.Item>
      <Descriptions.Item
        label={<strong>{t('common:course_range_master')}</strong>}
      >
        {courseInfo.rangeMaster}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CourseDetails;
