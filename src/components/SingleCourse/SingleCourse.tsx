import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactHtmlParser from "html-react-parser";
import { Col, PageHeader, Row, Card, Space, Divider } from "antd";
import { toBase64, shimmer } from "../../helpers/image";
import {
  convertWWWToHttpAndAddLinks,
  convertLinksToHtml,
} from "../../helpers/utils";
import styles from "../../styles/Course.module.css";
import headerStyles from "../../styles/PageHeader.module.css";
import {
  getCourseDataFromSearchCourseBySlug,
  getCourseLayoutImage,
  getTabListFromCourseLayouts,
} from "../../helpers/course";
import CourseLayout from "./CourseLayout";
import CourseDetails from "./CourseDetails";
import SiteMenu from "../Menu";
import useGetCourseBySlug from "../../hooks/useGetCourseBySlug";

const { Meta } = Card;

const SingleCourse = () => {
  const router = useRouter();
  const [activeLayoutIndex, setActiveLayout] = useState<string>("0");
  const { slug } = router.query;
  const { data, error, isLoading } = useGetCourseBySlug(slug as string);
  if (error) {
    return <p>Something went wrong</p>;
  }
  const course = getCourseDataFromSearchCourseBySlug(data);
  if (!isLoading && !course) {
    return <p>Course not found</p>;
  }
  const layoutImage = getCourseLayoutImage(course, activeLayoutIndex);
  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        title="DGCLR"
        subTitle={course?.name}
        onBack={() => router.back()}
        className={headerStyles.header}
        footer={<SiteMenu />}
      />
      <Row justify="center">
        <Col
          xs={{
            span: 24,
          }}
          sm={{
            span: 24,
          }}
          md={{
            span: 22,
          }}
          lg={{
            span: 20,
          }}
          xl={{
            span: 18,
          }}
        >
          <Card
            loading={isLoading}
            className={styles.card}
            tabList={getTabListFromCourseLayouts(course)}
            activeTabKey={activeLayoutIndex}
            onTabChange={(key) => {
              setActiveLayout(key);
            }}
            cover={
              layoutImage ? (
                <div className={styles.card_image_container}>
                  <Image
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(1200, 800)
                    )}`}
                    alt={`${course?.name}`}
                    src={layoutImage}
                    fill
                    className={styles.card_image}
                  />
                </div>
              ) : null
            }
          >
            <Space direction="vertical" size="large">
              <Meta
                title={course?.name}
                description={ReactHtmlParser(
                  convertWWWToHttpAndAddLinks(
                    convertLinksToHtml(course?.description)
                  )
                )}
              />
              <Divider />
              <Row gutter={[16, 32]}>
                <Col sm={24} md={24} lg={12}>
                  <CourseLayout
                    course={course}
                    layoutIndex={activeLayoutIndex}
                  />
                </Col>
                <Col sm={24} md={24} lg={12}>
                  <CourseDetails course={course} />
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default SingleCourse;
