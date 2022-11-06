import { getCourseInfo } from "../../helpers/course";
import { Course } from "../../types";
import styles from "../../styles/Course.module.css";
import { Descriptions, List, Space, Tag } from "antd";
import { useTranslation } from "next-i18next";

const CourseDetails = (props: { course: Course | null }) => {
  const { course } = props;
  const { t } = useTranslation(["common"]);
  const courseInfo = getCourseInfo(course);
  if (!courseInfo) {
    return null;
  }
  console.log("courseInfo", courseInfo);
  return (
    <Descriptions title={t("common:course_info")} layout="vertical" column={2}>
      <Descriptions.Item label={<strong>{t("common:course_address")}</strong>}>
        {courseInfo.address}, {courseInfo.city}, {courseInfo.zip}
      </Descriptions.Item>
      <Descriptions.Item
        label={<strong>{t("common:course_maintenance_cycle")}</strong>}
      >
        <Tag>{courseInfo.maintenanceCycle}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label={<strong>{t("common:course_type")}</strong>}>
        {courseInfo.courseTypes.map((courseType) => (
          <Tag key={courseType}>{courseType}</Tag>
        ))}
      </Descriptions.Item>
      <Descriptions.Item
        label={<strong>{t("common:course_surface_type")}</strong>}
      >
        {courseInfo.surfaceShapeTypes.map((type) => (
          <Tag key={type}>{type}</Tag>
        ))}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>{t("common:course_designer")}</strong>}>
        {courseInfo.courseDesigner}
      </Descriptions.Item>
      <Descriptions.Item
        label={<strong>{t("common:course_range_master")}</strong>}
      >
        {courseInfo.rangeMaster}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CourseDetails;
