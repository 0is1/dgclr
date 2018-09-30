// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { size } from 'lodash';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import {
  Image, Card, Flex, Subhead,
} from 'rebass';
import {
  convertLinksToHtml,
  convertCoordinatesToObject,
  courseAddressDetails,
  uniqueLayoutRatings,
  getTitle,
} from 'helpers/utils';
import { courseBySlugFromState } from 'components/Course/selectors';
import { setCourses as setCoursesFunc } from 'components/SearchContainer/actions';
import Map from 'components/Map';
import Layouts from 'components/Layouts';
import Tabs from 'components/Tabs';
import LayoutRatingBadges from 'components/Layout/Badges';
import { ClipLoader } from 'components/Spinners';
import Styles from 'components/Course/Course.styles';
import BaseStyles from 'components/Container/Container.styles';
import type { Course as CourseType, GraphQLData, State } from 'lib/types';

type Props = {
  course: CourseType,
  data: GraphQLData,
  setCourses: Function,
  // slug: string,
};

const {
  Box, Description, PanelWrapper, PanelHeader, PanelFooter, Strong, Title,
} = Styles;

const { BaseText } = BaseStyles;

class Course extends Component<Props> {
  componentDidMount() {
    const { course, data = {} } = this.props;
    const { courseBySlug } = data;
    if (size(course) < 1 && courseBySlug && courseBySlug.length) {
      this.setCourses(courseBySlug);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const { course, data } = this.props;
      const { courseBySlug } = data;
      if (size(course) < 1 && courseBySlug && courseBySlug.length) {
        this.setCourses(courseBySlug);
      }
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { data = {} } = this.props;
    const { courseBySlug } = data;
    if (size(prevProps.course) < 1 && courseBySlug && courseBySlug.length) {
      return true;
    }
    return null;
  }

  setCourses = (courses) => {
    const { setCourses } = this.props;
    setCourses(courses);
  };

  render() {
    const { course, data = {} } = this.props;
    const { courseBySlug = [] } = data;
    if ((size(course) < 1 && size(courseBySlug) < 1) || (data && data.loading)) {
      return <ClipLoader />;
    }
    const courseData = size(course) > 0 ? course : courseBySlug[0];
    const {
      name, courseInfo, description, locationInfo, layouts,
    } = courseData;
    const { mapUrl } = courseInfo;
    const descriptionWithLinks = convertLinksToHtml(description);
    const coordinates = convertCoordinatesToObject(
      locationInfo.location && locationInfo.location.coordinates,
    );
    const layoutNames = layouts.map(layout => layout.name);
    const layoutTabs = <Tabs tabs={layoutNames} id={courseData._id} />;
    const mapElement = coordinates ? <Map coordinates={coordinates} course={courseData} /> : null;
    const courseImage = mapUrl && mapUrl !== '#' ? <Image src={mapUrl} /> : null;
    const ratings = uniqueLayoutRatings(layouts);
    return (
      <Box
        width={[1, 1, 1, '90%']}
        p={[0, 0, '0 0.5rem', '0 1rem']}
        m={['.5rem 0', '.5rem 0', '.5rem 0', '1rem auto']}
      >
        <Helmet>
          <title>{getTitle(name)}</title>
        </Helmet>
        <PanelWrapper>
          <PanelHeader>Radan tiedot</PanelHeader>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1, 1 / 2]} p={[2, 2, null, 4]}>
              <Title>
                {name}
                <LayoutRatingBadges ratings={ratings} />
              </Title>
              <Description>{ReactHtmlParser(descriptionWithLinks)}</Description>
              <PanelWrapper mt={4}>
                <PanelHeader>Radan lisätiedot:</PanelHeader>
                <Box width="100%" px={1} pt={2} pb="1rem">
                  {courseInfo.founded && (
                    <BaseText>
                      <Strong>Perustettu: </Strong>
                      {`${courseInfo.founded}`}
                    </BaseText>
                  )}
                  {courseInfo.courseDesigner && (
                    <BaseText>
                      <Strong>Suunnittelija: </Strong>
                      {`${courseInfo.courseDesigner}`}
                    </BaseText>
                  )}
                  {courseInfo.rangeMaster && (
                    <BaseText>
                      <Strong>Ratamestari: </Strong>
                      {`${courseInfo.rangeMaster}`}
                    </BaseText>
                  )}
                  {courseInfo.basketType && (
                    <BaseText>
                      <Strong>Korityyppi: </Strong>
                      {`${courseInfo.basketType}`}
                    </BaseText>
                  )}
                  {courseInfo.infoSignType && (
                    <BaseText>
                      <Strong>Opastaulut: </Strong>
                      {`${courseInfo.infoSignType}`}
                    </BaseText>
                  )}
                  {courseInfo.teeType && (
                    <BaseText>
                      <Strong>Heittoalustat: </Strong>
                      {`${courseInfo.teeType}`}
                    </BaseText>
                  )}
                  {courseInfo.courseTypes && (
                    <BaseText>
                      <Strong>Ratatyypit: </Strong>
                      {`${courseInfo.courseTypes.join(', ')}`}
                    </BaseText>
                  )}
                  {courseInfo.surfaceShapeTypes && (
                    <BaseText>
                      <Strong>Pinnanmuodot: </Strong>
                      {`${courseInfo.surfaceShapeTypes.join('. ')}`}
                    </BaseText>
                  )}
                  {courseInfo.fee
                    && courseInfo.fee.value && (
                      <BaseText>
                        <Strong>Maksullinen / Ilmainen: </Strong>
                        {`${courseInfo.fee.value}`}
                      </BaseText>
                  )}
                </Box>
              </PanelWrapper>
            </Box>
            <Box width={[1, 1, 1, 1 / 2]} p={[2, 2, null, 4]}>
              <Card width="100%">
                {mapElement}
                <Subhead mt={2} p={2}>
                  {courseAddressDetails(locationInfo)}
                </Subhead>
              </Card>
            </Box>
          </Flex>
          <PanelFooter>
            <Flex flexWrap="wrap">
              <Box width={[1, 1, 1, 1 / 2]} p={2}>
                {layoutTabs}
                <Layouts id={course._id} layouts={layouts} />
              </Box>
              <Box width={[1, 1, 1, 1 / 2]} p={2}>
                {courseImage}
              </Box>
            </Flex>
          </PanelFooter>
        </PanelWrapper>
      </Box>
    );
  }
}

const mapStateToProps = (state: State, ownProps) => ({
  course: courseBySlugFromState(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  setCourses: courses => dispatch(setCoursesFunc(courses)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Course);
