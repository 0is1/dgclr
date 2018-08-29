// @flow
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { size } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import {
  BackgroundImage, Card, Flex, Subhead, Text,
} from 'rebass';
import {
  convertLinksToHtml,
  convertCoordinatesToObject,
  courseAddressDetails,
  uniqueLayoutRatings,
} from 'helpers/utils';
import { courseBySlugFromState } from 'components/Course/selectors';
import { setCourses as setCoursesFunc } from 'components/SearchContainer/actions';
import Map from 'components/Map';
import Layouts from 'components/Layouts';
import Tabs from 'components/Tabs';
import LayoutRatingBadges from 'components/Layout/Badges';
import Styles from 'components/Course/Course.styles';

type Props = {
  course: {},
  data?: {},
  setCourses: Function,
  // slug: string,
};

const {
  Box, Description, PanelWrapper, PanelHeader, PanelFooter, Strong, Title, Wrapper,
} = Styles;

class Course extends Component<Props> {
  componentDidMount() {
    const { course, data } = this.props;
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
    const { data } = this.props;
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
    const { course, data } = this.props;
    if (size(course) < 1 || (data && data.loading)) {
      return <h1>Loading...</h1>;
    }
    console.log('course: ', course);
    const {
      name, courseInfo, description, locationInfo, layouts,
    } = course;
    const descriptionWithLinks = convertLinksToHtml(description);
    const coordinates = convertCoordinatesToObject(
      locationInfo.location && locationInfo.location.coordinates,
    );
    const layoutNames = layouts.map(layout => layout.name);
    // eslint-disable-next-line no-underscore-dangle
    const layoutTabs = <Tabs tabs={layoutNames} id={course._id} />;
    const mapElement = coordinates ? (
      <Map coordinates={coordinates} />
    ) : (
      <BackgroundImage
        ratio={1}
        src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20"
      />
    );
    const ratings = uniqueLayoutRatings(layouts);
    return (
      <Wrapper>
        <PanelWrapper>
          <PanelHeader>Radan tiedot</PanelHeader>
          <Flex>
            <Box width="50%" p={4}>
              <Title>
                {name}
                <LayoutRatingBadges ratings={ratings} />
              </Title>
              <Description>{ReactHtmlParser(descriptionWithLinks)}</Description>
              <PanelWrapper mt={4}>
                <PanelHeader>Radan lisätiedot:</PanelHeader>
                <Box width="100%" px={1} py={2}>
                  <Text mt=".85rem" pl={3}>
                    <Strong>Korityyppi: </Strong>
                    {`${courseInfo.basketType}`}
                  </Text>
                  <Text mt=".85rem" pl={3}>
                    <Strong>Opastaulut: </Strong>
                    {`${courseInfo.infoSignType}`}
                  </Text>
                  <Text mt=".85rem" pl={3}>
                    <Strong>Heittoalustat: </Strong>
                    {`${courseInfo.teeType}`}
                  </Text>
                  <Text mt=".85rem" pl={3}>
                    <Strong>Ratatyypit: </Strong>
                    {`${courseInfo.courseTypes.join(', ')}`}
                  </Text>
                  <Text mt=".85rem" mb=".85rem" pl={3}>
                    <Strong>Pinnanmuodot: </Strong>
                    {`${courseInfo.surfaceShapeTypes.join('. ')}`}
                  </Text>
                </Box>
              </PanelWrapper>
            </Box>
            <Box width="50%" p={4}>
              <Card width="100%">
                {mapElement}
                <Subhead mt={2} p={2}>
                  {courseAddressDetails(locationInfo)}
                </Subhead>
              </Card>
            </Box>
          </Flex>
          <PanelFooter>
            {layoutTabs}
            {/* eslint-disable-next-line no-underscore-dangle */}
            <Layouts id={course._id} layouts={layouts} />
          </PanelFooter>
        </PanelWrapper>
      </Wrapper>
    );
  }
}

Course.defaultProps = {
  data: {},
};
const mapStateToProps = (state, ownProps) => ({
  course: courseBySlugFromState(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  setCourses: courses => dispatch(setCoursesFunc(courses)),
});

const SEARCH_COURSE = gql`
  query CourseBySlugQuery($slug: String!) {
    courseBySlug(slug: $slug) {
      _id
      name
      description
      slug
      courseInfo {
        basketType
        teeType
        infoSignType
        surfaceShapeTypes
        courseTypes
      }
      locationInfo {
        address
        city
        zip
        location {
          coordinates
        }
      }
      layouts {
        name
        rating
        holes {
          par
          length {
            foot
            meter
          }
        }
        holeCount
        totalPar
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
const ComponentWithMutation = graphql(SEARCH_COURSE, {
  options: ({ router: { query } }) => ({
    variables: {
      slug: query.slug,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
  skip: ({ course }) => size(course) > 0,
})(Course);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ComponentWithMutation));
