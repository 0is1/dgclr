// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { size } from 'lodash';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import { Card, Flex, Subhead } from 'rebass';
import {
  convertCoordinatesToObject,
  convertLinksToHtml,
  courseAddressDetails,
  getCourseMapUrlForLayout,
  uniqueLayoutRatings,
} from 'helpers/utils';
import { withTranslation } from 'lib/i18n';
import { courseBySlugFromState } from 'components/Course/selectors';
import Map from 'components/Map';
import Layouts from 'components/Layouts';
import Tabs from 'components/Tabs';
import LayoutRatingBadges from 'components/Layout/Badges';
import { ClipLoader } from 'components/Spinners';
import Image from 'components/Image';
import { getActiveIndex } from 'components/Tabs/selectors';
import Styles from 'components/Course/Course.styles';
import BaseStyles from 'components/Container/Container.styles';
import type { Course as CourseType, GraphQLData, State as ReduxState } from 'lib/types';
import { setCourses as setCoursesFunc } from './actions';

type Props = {
  data: GraphQLData,
  t: Function,
};
type OwnProps = Props & { slug: string };
type MapStateToProps = { activeIndex: ?number, course: CourseType };
type MapDispatchToProps = { setCourses: Function };
type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

const {
  Box, Description, PanelWrapper, PanelHeader, PanelFooter, Strong, Title,
} = Styles;

const { BaseText } = BaseStyles;

class Course extends Component<CombinedProps> {
  componentDidMount() {
    const { course, data = {} } = this.props;
    const { courseBySlug } = data;
    if (size(course) < 1 && courseBySlug && courseBySlug.length) {
      this.setCourses(courseBySlug);
    }
  }

  componentDidUpdate(prevProps: CombinedProps, prevState: any, snapshot: any) {
    if (snapshot !== null) {
      const { course, data } = this.props;
      const { courseBySlug } = data;
      if (size(course) < 1 && courseBySlug && courseBySlug.length) {
        this.setCourses(courseBySlug);
      }
    }
  }

  getSnapshotBeforeUpdate(prevProps: CombinedProps) {
    const { data = {} } = this.props;
    const { courseBySlug } = data;
    if (size(prevProps.course) < 1 && courseBySlug && courseBySlug.length) {
      return true;
    }
    return null;
  }

  setCourses = (courses: Array<CourseType>) => {
    const { setCourses } = this.props;
    setCourses(courses);
  };

  render() {
    const {
      activeIndex, course, data = {}, t,
    } = this.props;
    const { courseBySlug = [] } = data;
    if ((size(course) < 1 && size(courseBySlug) < 1) || (data && data.loading)) {
      return <ClipLoader />;
    }

    const courseData = size(course) > 0 ? course : courseBySlug[0];
    const {
      name, courseInfo, description, locationInfo, layouts,
    } = courseData;
    const mapUrl = getCourseMapUrlForLayout(course.layouts, activeIndex || 0);
    const descriptionWithLinks = convertLinksToHtml(description);
    const { location } = locationInfo;
    const coordinates = location && convertCoordinatesToObject(location.coordinates);
    const layoutNames = layouts.map(layout => layout.name);
    const layoutTabs = <Tabs tabs={layoutNames} id={courseData._id} />;
    const mapElement = coordinates ? <Map coordinates={coordinates} data={courseData} /> : null;
    const courseImage = mapUrl && mapUrl !== '' ? <Image alt={name} src={mapUrl} /> : null;
    const ratings = uniqueLayoutRatings(layouts);
    return (
      <Box width={[1, 1, 1, '90%']} p={[0, 0, '0 0.5rem', '0 1rem']} m={['.5rem 0', '.5rem 0', '.5rem 0', '1rem auto']}>
        <Helmet>
          <title>{`${t('title')} – ${name}`}</title>
        </Helmet>
        <PanelWrapper>
          <PanelHeader>{t('course:info-title')}</PanelHeader>
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1, 1 / 2]} p={[2, 2, null, 4]}>
              <Title>
                {name}
                <LayoutRatingBadges ratings={ratings} />
              </Title>
              <Description>{ReactHtmlParser(descriptionWithLinks)}</Description>
              <PanelWrapper mt={4}>
                <PanelHeader>{t('course:additional-info-title')}</PanelHeader>
                <Box width="100%" px={1} pt={2} pb="1rem">
                  {courseInfo.founded && (
                    <BaseText>
                      <Strong>
                        {t('course:founded')}
                        {' '}
                      </Strong>
                      {`${courseInfo.founded}`}
                    </BaseText>
                  )}
                  {courseInfo.courseDesigner && (
                    <BaseText>
                      <Strong>
                        {t('course:designer')}
                        {' '}
                      </Strong>
                      {`${courseInfo.courseDesigner}`}
                    </BaseText>
                  )}
                  {courseInfo.rangeMaster && (
                    <BaseText>
                      <Strong>
                        {t('course:course-master')}
                        {' '}
                      </Strong>
                      {`${courseInfo.rangeMaster}`}
                    </BaseText>
                  )}
                  {courseInfo.basketType && (
                    <BaseText>
                      <Strong>
                        {t('course:basket-type')}
                        {' '}
                      </Strong>
                      {`${courseInfo.basketType}`}
                    </BaseText>
                  )}
                  {courseInfo.infoSignType && (
                    <BaseText>
                      <Strong>
                        {t('course:info-board-type')}
                        {' '}
                      </Strong>
                      {`${courseInfo.infoSignType}`}
                    </BaseText>
                  )}
                  {courseInfo.teeType && (
                    <BaseText>
                      <Strong>
                        {t('course:tee-type')}
                        {' '}
                      </Strong>
                      {`${courseInfo.teeType}`}
                    </BaseText>
                  )}
                  {courseInfo.courseTypes && (
                    <BaseText>
                      <Strong>
                        {t('course:course-type')}
                        {' '}
                      </Strong>
                      {`${courseInfo.courseTypes.join(', ')}`}
                    </BaseText>
                  )}
                  {courseInfo.surfaceShapeTypes && (
                    <BaseText>
                      <Strong>
                        {t('course:surface-type')}
                        {' '}
                      </Strong>
                      {`${courseInfo.surfaceShapeTypes.join('. ')}`}
                    </BaseText>
                  )}
                  {courseInfo.fee && courseInfo.fee.value && (
                    <BaseText>
                      <Strong>
                        {t('course:price-info')}
                        {' '}
                      </Strong>
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

const mapStateToProps = (state: ReduxState, ownProps: OwnProps): MapStateToProps => {
  const course = courseBySlugFromState(state, ownProps);
  const id = (course && course._id) || false;
  return {
    activeIndex: getActiveIndex(state, { id }),
    course,
  };
};

const mapDispatchToProps = (dispatch: Function): MapDispatchToProps => ({
  setCourses: courses => dispatch(setCoursesFunc(courses)),
});

export default connect<CombinedProps, OwnProps, MapStateToProps, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation(['common', 'course'])(Course));
