// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { size } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { courseBySlugFromState } from 'components/Course/selectors';
import Styles from 'components/Course/Course.styles';
import ContainerStyles from 'components/Container/Container.styles';

type Props = {
  course: {},
  slug: string,
};

const { Description, Title, Wrapper } = Styles;
const { Container } = ContainerStyles;
const convertLinks = string => string.replace(/((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/gi, "<a href='$1'>$1</a>");

class Course extends Component<Props> {
  componentDidMount() {
    const { course, slug } = this.props;
    if (size(course) < 1) {
      console.log('Load course: ', slug);
    }
  }

  render() {
    const { course } = this.props;
    if (size(course) < 1) {
      return <h1>Loading...</h1>;
    }
    console.log(course);
    const { name, description } = course;
    const descriptionWithLinks = convertLinks(description);
    return (
      <Container>
        <Wrapper>
          <Title>{name}</Title>
          <Description>{ReactHtmlParser(descriptionWithLinks)}</Description>
        </Wrapper>
      </Container>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  course: courseBySlugFromState(state, ownProps),
});

export default connect(mapStateToProps)(Course);
