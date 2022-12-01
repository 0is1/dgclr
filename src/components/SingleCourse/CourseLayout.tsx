import { getCourseLayoutByIndex } from "../../helpers/course";
import { Course, Hole } from "../../types";
import { List, Space, Tag, Typography } from "antd";
import { useTranslation } from "next-i18next";

const { Paragraph, Title } = Typography;

const CourseLayout = (props: {
  course: Course | undefined;
  layoutIndex: string;
}) => {
  const { t } = useTranslation(["common"]);
  const { course, layoutIndex } = props;
  const layout = getCourseLayoutByIndex(course, layoutIndex);
  if (!layout) {
    return null;
  }
  console.log("layout", layout);
  return (
    <List
      header={
        <Space direction="vertical">
          <Title level={5}>{t("common:course_hole_details")}</Title>
          <Paragraph>{layout.name}</Paragraph>
          {layout.rating && <Tag color="gold">{layout.rating}</Tag>}
          <Space>
            <Tag>
              {t("common:course_hole_count")}: {layout.holeCount}
            </Tag>
            <Tag>
              {t("common:par")}: {layout.totalPar}
            </Tag>
          </Space>
          <Space>
            {layout.holeAverageLength?.meter && (
              <Tag>
                {t("common:course_hole_average_length")}:{" "}
                {layout.holeAverageLength.meter}m /{" "}
                {layout.holeAverageLength.foot}ft
              </Tag>
            )}
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
