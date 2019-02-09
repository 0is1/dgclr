// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Flex, Text } from 'rebass';
import update from 'updeep';
import { omit, size } from 'lodash';
import { getCurrentAdvancedFilter, isAdvancedSearchMapVisible } from 'components/SearchContainer/selectors';
import { setCurrentAdvancedSearchFilter, toggleAdvancedSearchMap } from 'components/SearchContainer/actions';
import RatingSelect from 'components/Select/RatingSelect';
import BasketTypeSelect from 'components/Select/BasketTypeSelect';
import TeeTypeSelect from 'components/Select/TeeTypeSelect';
import SurfaceTypeSelect from 'components/Select/SurfaceTypeSelect';
import AdvancedSearchMap from 'components/Map/AdvancedSearchMap';
import Toggle from 'components/Toggle';
import colors from 'components/colors';
import type { CoordinatesObject, State } from 'lib/types';
import { convertMetersToKilometers } from 'helpers/utils';
import {
  ADVANCED_RATING,
  ADVANCED_NEARBY,
  ADVANCED_TEE_TYPE,
  ADVANCED_BASKET_TYPE,
  ADVANCED_COURSE_INFO,
  ADVANCED_SURFACE_SHAPE_TYPES,
} from 'lib/constants';
import RebassComponents from 'components/RebassComponents';

const { Divider } = RebassComponents;
type Props = { filter: string, mapChecked: boolean, setFilter: Function, toggleMapVisibility: Function };

class AdvancedSearchInputs extends Component<Props> {
  getParsedFilter = () => {
    const { filter } = this.props;
    return !filter.length ? {} : JSON.parse(filter);
  };

  setFilterData = (newFilter) => {
    const { setFilter } = this.props;
    // console.log('newFilter: ', this.cleanCourseInfo(newFilter));
    setFilter(JSON.stringify(this.cleanCourseInfo(newFilter)));
  };

  cleanCourseInfo = (newFilter) => {
    if (newFilter.courseInfo && size(newFilter.courseInfo) === 0) return omit(newFilter, [ADVANCED_COURSE_INFO]);
    return newFilter;
  };

  onRatingChange = (rating: []) => {
    // console.log('onRatingChange: ', rating);
    const filter = this.getParsedFilter();
    // console.log('onRatingChange filter: ', filterData);
    const newFilter = rating.length > 0 ? update({ rating }, filter) : omit(filter, [ADVANCED_RATING]);
    this.setFilterData(newFilter);
  };

  onBasketTypeChange = (basketType: string) => {
    const filter = this.getParsedFilter();
    // console.log('onBasketTypeChange filter: ', filter);
    const newFilter = basketType.length > 0
      ? update({ courseInfo: { basketType } }, filter)
      : { ...filter, courseInfo: omit(filter.courseInfo, [ADVANCED_BASKET_TYPE]) };
    this.setFilterData(newFilter);
  };

  onTeeTypeChange = (teeType: string) => {
    const filter = this.getParsedFilter();
    // console.log('onTeeTypeChange filter: ', filter);
    const newFilter = teeType.length > 0
      ? update({ courseInfo: { teeType } }, filter)
      : { ...filter, courseInfo: omit(filter.courseInfo, [ADVANCED_TEE_TYPE]) };
    this.setFilterData(newFilter);
  };

  onSurfaceTypeChange = (surfaceShapeTypes: string) => {
    const filter = this.getParsedFilter();
    // console.log('surfaceType filter: ', filter);
    const newFilter = surfaceShapeTypes.length > 0
      ? update({ courseInfo: { surfaceShapeTypes } }, filter)
      : { ...filter, courseInfo: omit(filter.courseInfo, [ADVANCED_SURFACE_SHAPE_TYPES]) };
    this.setFilterData(newFilter);
  };

  onMapSearchChange = (data: { coordinates: CoordinatesObject, radius: number }) => {
    const filter = this.getParsedFilter();
    const nearby = data.coordinates
      && data.radius && {
      maxDistance: convertMetersToKilometers(parseInt(data.radius, 10)),
      coordinates: [data.coordinates.lat, data.coordinates.lng],
    };
    const newFilter = nearby ? update({ nearby }, filter) : this.omitMapFilter();
    this.setFilterData(newFilter);
  };

  omitMapFilter = () => {
    const filter = this.getParsedFilter();
    this.setFilterData(omit(filter, [ADVANCED_NEARBY]));
  };

  handleMapToggle = (mapChecked: boolean) => {
    if (!mapChecked) this.omitMapFilter();
    const { toggleMapVisibility } = this.props;
    toggleMapVisibility(mapChecked);
  };

  render() {
    const { mapChecked } = this.props;
    return (
      <Box>
        <Text fontWeight="700" my={2} width="100%">
          Edistynyt haku (erittäin varhaisessa kehitysvaiheessa)
        </Text>
        <Flex flexWrap="wrap">
          <Box pr={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
            <RatingSelect onChange={this.onRatingChange} />
          </Box>
          <Box pl={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
            <BasketTypeSelect onChange={this.onBasketTypeChange} />
          </Box>
          <Box pr={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
            <TeeTypeSelect onChange={this.onTeeTypeChange} />
          </Box>
          <Box pl={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
            <SurfaceTypeSelect onChange={this.onSurfaceTypeChange} />
          </Box>
          <Box pl={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1]}>
            <Toggle label="Käytä karttahakua" checked={mapChecked} handleOnChange={this.handleMapToggle} />
            <AdvancedSearchMap mapVisible={mapChecked} handleChange={this.onMapSearchChange} />
          </Box>
        </Flex>
        <Divider w={1} borderColor={colors.info} />
      </Box>
    );
  }
}

const mapStateToProps = (state: State) => ({
  filter: getCurrentAdvancedFilter(state),
  mapChecked: isAdvancedSearchMapVisible(state),
});
const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setCurrentAdvancedSearchFilter(filter)),
  toggleMapVisibility: (visible: boolean) => dispatch(toggleAdvancedSearchMap(visible)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchInputs);
