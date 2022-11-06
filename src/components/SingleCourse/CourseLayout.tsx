import { getCourseLayoutByIndex } from "../../helpers/course";
import { Course, Hole } from "../../types";
import { List, Space, Tag, Typography } from "antd";
import { useTranslation } from "next-i18next";

const { Title } = Typography;

const CourseLayout = (props: {
  course: Course | null;
  layoutIndex: string;
}) => {
  const { t } = useTranslation(["common"]);
  const { course, layoutIndex } = props;
  const layout = getCourseLayoutByIndex(course, layoutIndex);
  if (!layout) {
    return null;
  }
  return (
    <List
      header={
        <Space direction="vertical">
          <Title level={5}>{t("common:course_hole_details")}</Title>
          <Space>
            {layout.rating && <Tag color="gold">{layout.rating}</Tag>}
            <Tag>
              {t("common:course_hole_count")} {layout.holeCount}
            </Tag>
            <Tag>
              {t("common:par")}: {layout.totalPar}
            </Tag>
          </Space>
        </Space>
      }
      dataSource={layout.holes}
      renderItem={(hole: Hole, index) => (
        <List.Item>
          <Space size="middle">
            <Tag color="purple">{index + 1}</Tag>
            <span>
              {t("common:par")}: {hole.par}
            </span>
            <span>
              {t("common:distance")}: {hole.length?.meter}m /{" "}
              {hole.length?.foot}ft{" "}
            </span>
          </Space>
        </List.Item>
      )}
    />
  );
};

export default CourseLayout;
