// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Flex, Text } from 'rebass';
import update from 'updeep';
import { omit, size } from 'lodash';
import { getCurrentAdvancedFilter } from 'components/SearchContainer/selectors';
import { setCurrentAdvancedSearchFilter } from 'components/SearchContainer/actions';
import RatingSelect from 'components/SearchContainer/RatingSelect';
import BasketTypeSelect from 'components/SearchContainer/BasketTypeSelect';
import TeeTypeSelect from 'components/SearchContainer/TeeTypeSelect';
import SurfaceTypeSelect from 'components/SearchContainer/SurfaceTypeSelect';

type Props = { filter: string, setFilter: Function };

class AdvancedSearchInputs extends Component<Props> {
  getParsedFilter = () => {
    const { filter } = this.props;
    return !filter.length ? {} : JSON.parse(filter);
  };

  setFilterData = (newFilter) => {
    const { setFilter } = this.props;
    console.log('newFilter: ', this.cleanCourseInfo(newFilter));
    setFilter(JSON.stringify(this.cleanCourseInfo(newFilter)));
  };

  cleanCourseInfo = (newFilter) => {
    if (newFilter.courseInfo && size(newFilter.courseInfo) === 0) return omit(newFilter, ['courseInfo']);
    return newFilter;
  };

  onRatingChange = (rating: []) => {
    // console.log('onRatingChange: ', rating);
    const filter = this.getParsedFilter();
    // console.log('onRatingChange filter: ', filterData);
    const newFilter = rating.length > 0 ? update({ rating }, filter) : omit(filter, ['rating']);
    this.setFilterData(newFilter);
  };

  onBasketTypeChange = (basketType: string) => {
    const filter = this.getParsedFilter();
    console.log('onBasketTypeChange filter: ', filter);
    const newFilter = basketType.length > 0
      ? update({ courseInfo: { basketType } }, filter)
      : { ...filter, courseInfo: omit(filter.courseInfo, ['basketType']) };
    this.setFilterData(newFilter);
  };

  onTeeTypeChange = (teeType: string) => {
    const filter = this.getParsedFilter();
    // console.log('onTeeTypeChange filter: ', filter);
    const newFilter = teeType.length > 0
      ? update({ courseInfo: { teeType } }, filter)
      : { ...filter, courseInfo: omit(filter.courseInfo, ['teeType']) };
    this.setFilterData(newFilter);
  };

  onSurfaceTypeChange = (surfaceShapeTypes: string) => {
    const filter = this.getParsedFilter();
    // console.log('surfaceType filter: ', filter);
    const newFilter = surfaceShapeTypes.length > 0
      ? update({ courseInfo: { surfaceShapeTypes } }, filter)
      : { ...filter, courseInfo: omit(filter.courseInfo, ['surfaceShapeTypes']) };
    this.setFilterData(newFilter);
  };

  render() {
    return (
      <Box>
        <Text fontWeight="700" my={2} width="100%">
          Edistynyt haku (erittäin varhaisessa kehitysvaiheessa)
        </Text>
        <Flex flexWrap="wrap">
          <Box
            pr={[0, 0, '.5rem', '.5rem']}
            mb={['.75rem', '.75rem', 0, 0]}
            width={[1, 1, 1 / 2, 1 / 2]}
          >
            <RatingSelect onChange={this.onRatingChange} />
          </Box>
          <Box
            pl={[0, 0, '.5rem', '.5rem']}
            mb={['.75rem', '.75rem', 0, 0]}
            width={[1, 1, 1 / 2, 1 / 2]}
          >
            <BasketTypeSelect onChange={this.onBasketTypeChange} />
          </Box>
          <Box
            pr={[0, 0, '.5rem', '.5rem']}
            mb={['.75rem', '.75rem', 0, 0]}
            width={[1, 1, 1 / 2, 1 / 2]}
          >
            <TeeTypeSelect onChange={this.onTeeTypeChange} />
          </Box>
          <Box
            pl={[0, 0, '.5rem', '.5rem']}
            mb={['.75rem', '.75rem', 0, 0]}
            width={[1, 1, 1 / 2, 1 / 2]}
          >
            <SurfaceTypeSelect onChange={this.onSurfaceTypeChange} />
          </Box>
        </Flex>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  filter: getCurrentAdvancedFilter(state),
});
const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setCurrentAdvancedSearchFilter(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchInputs);
