// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box, Flex, Label, Text,
} from 'rebass';
import update from 'updeep';
import { omit, size } from 'lodash';
import { withTranslation } from 'lib/i18n';
import RatingSelect from 'components/Select/RatingSelect';
import BasketTypeSelect from 'components/Select/BasketTypeSelect';
import TeeTypeSelect from 'components/Select/TeeTypeSelect';
import SurfaceTypeSelect from 'components/Select/SurfaceTypeSelect';
import CourseTypeSelect from 'components/Select/CourseTypeSelect';
import AdvancedSearchMapComponent from 'components/Map/AdvancedSearchMap';
import Toggle from 'components/Toggle';
import colors from 'components/colors';
import Input from 'components/Input';
import type { CoordinatesObject, State } from 'lib/types';
import { convertMetersToKilometers } from 'helpers/utils';
import { ADVANCED_NEARBY, ADVANCED_COURSE_INFO } from 'lib/constants';
import { INPUT_FILTER_NAMES } from 'components/Input/constants';
import { SELECT_FILTER_NAMES } from 'components/Select/constants';
import RebassComponents from 'components/RebassComponents';
import { getCurrentAdvancedFilter, isAdvancedSearchMapVisible, isAllAdvancedSearchInputsOpen } from './selectors';
import {
  setCurrentAdvancedSearchFilter,
  toggleAdvancedSearchMap,
  toggleAdvancedSearchInputs as toggleAdvancedSearchInputsFunc,
} from './actions';
import Styles from './AdvancedSearchInputs.styles';

const { Divider } = RebassComponents;
const { FadeInBox } = Styles;

type Props = { t: Function };
type MapStateToProps = {
  filter: string,
  mapChecked: boolean,
  allInputsOpen: boolean,
};

type MapDispatchToProps = {
  setAdvancedSearchFilter: Function,
  toggleMapVisibility: Function,
  toggleAdvancedSearchInputs: Function,
};

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;
type FilterType = { courseInfo: {} };

export class AdvancedSearchInputs extends Component<CombinedProps> {
  getParsedFilter = () => {
    const { filter } = this.props;
    return !filter.length ? {} : JSON.parse(filter);
  };

  setAdvancedSearchFilterData = (newFilter: FilterType) => {
    const { setAdvancedSearchFilter } = this.props;
    // console.log('newFilter: ', this.cleanCourseInfo(newFilter));
    setAdvancedSearchFilter(JSON.stringify(this.cleanCourseInfo(newFilter)));
  };

  cleanCourseInfo = (newFilter: FilterType) => {
    if (newFilter.courseInfo && size(newFilter.courseInfo) === 0) return omit(newFilter, [ADVANCED_COURSE_INFO]);
    return newFilter;
  };

  onRatingChange = (rating: []) => {
    // console.log('onRatingChange: ', rating);
    const filter = this.getParsedFilter();
    // console.log('onRatingChange filter: ', filterData);
    const newFilter = rating.length > 0 ? update({ rating }, filter) : omit(filter, [SELECT_FILTER_NAMES.rating.filterName]);
    this.setAdvancedSearchFilterData(newFilter);
  };

  onBasketTypeChange = (basketType: string) => {
    const filter = this.getParsedFilter();
    // console.log('onBasketTypeChange filter: ', filter);
    const newFilter = basketType.length > 0
      ? update({ courseInfo: { basketType } }, filter)
      : {
        ...filter,
        courseInfo: omit(filter.courseInfo, [SELECT_FILTER_NAMES.basketType.filterName]),
      };
    this.setAdvancedSearchFilterData(newFilter);
  };

  onTeeTypeChange = (teeType: string) => {
    const filter = this.getParsedFilter();
    // console.log('onTeeTypeChange filter: ', filter);
    const newFilter = teeType.length > 0
      ? update({ courseInfo: { teeType } }, filter)
      : {
        ...filter,
        courseInfo: omit(filter.courseInfo, [SELECT_FILTER_NAMES.teeType.filterName]),
      };
    this.setAdvancedSearchFilterData(newFilter);
  };

  onSurfaceTypeChange = (surfaceShapeTypes: string) => {
    const filter = this.getParsedFilter();
    // console.log('surfaceType filter: ', filter);
    const newFilter = surfaceShapeTypes.length > 0
      ? update({ courseInfo: { surfaceShapeTypes } }, filter)
      : {
        ...filter,
        courseInfo: omit(filter.courseInfo, [SELECT_FILTER_NAMES.surfaceShapeTypes.filterName]),
      };
    this.setAdvancedSearchFilterData(newFilter);
  };

  onCourseTypeChange = (courseTypes: string) => {
    const filter = this.getParsedFilter();
    // console.log('courseTypes filter: ', filter);
    const newFilter = courseTypes.length > 0
      ? update({ courseInfo: { courseTypes } }, filter)
      : {
        ...filter,
        courseInfo: omit(filter.courseInfo, [SELECT_FILTER_NAMES.courseTypes.filterName]),
      };
    this.setAdvancedSearchFilterData(newFilter);
  };

  onMapSearchChange = (data: { coordinates: CoordinatesObject, radius: number }) => {
    const { mapChecked } = this.props;
    if (!mapChecked) return;
    const filter = this.getParsedFilter();
    //  list the longitude first and then latitude https://docs.mongodb.com/manual/reference/geojson/#geojson-point
    const nearby = data.coordinates
      && data.radius && {
      maxDistance: convertMetersToKilometers(parseInt(data.radius, 10)),
      coordinates: [data.coordinates.lng, data.coordinates.lat],
    };
    if (nearby) {
      this.setAdvancedSearchFilterData(update({ nearby }, filter));
      return;
    }
    this.omitMapFilter();
  };

  omitMapFilter = () => {
    const filter = this.getParsedFilter();
    this.setAdvancedSearchFilterData(omit(filter, [ADVANCED_NEARBY]));
  };

  handleMapToggle = (mapChecked: boolean) => {
    if (!mapChecked) this.omitMapFilter();
    const { toggleMapVisibility } = this.props;
    toggleMapVisibility(mapChecked);
  };

  toggleAdvancedSearchInputs = () => {
    const { allInputsOpen, toggleAdvancedSearchInputs } = this.props;
    toggleAdvancedSearchInputs(!allInputsOpen);
  };

  onHoleAverageLengthChange = (values: Array<number>) => {
    const filter = this.getParsedFilter();
    const [min, max] = values;
    const newFilter = update({ [INPUT_FILTER_NAMES.holeAverageLength.filterName]: { min, max } }, filter);
    this.setAdvancedSearchFilterData(newFilter);
  };

  render() {
    const { allInputsOpen, mapChecked, t } = this.props;
    return (
      <Box>
        <Text fontWeight="700" my={2} width="100%">
          {t('advanced-search:title')}
        </Text>
        <Flex flexWrap="wrap">
          <Box pr={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
            <RatingSelect
              onChange={this.onRatingChange}
              placeholder={t('advanced-search:input-placeholder-course-rating')}
              label={t('advanced-search:input-label-course-rating')}
            />
          </Box>
          <Box pr={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
            <CourseTypeSelect
              onChange={this.onCourseTypeChange}
              placeholder={t('advanced-search:input-placeholder-course-type')}
              label={t('advanced-search:input-label-course-type')}
            />
          </Box>
          <Box pr={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
            <Label>{t('advanced-search:slider-label-hole-average-length')}</Label>
            <Input
              onChange={this.onHoleAverageLengthChange}
              options={{
                type: 'slider',
                initialValues: [40, 180],
                domain: [10, 180],
                step: 10,
                filterName: INPUT_FILTER_NAMES.holeAverageLength.filterName,
              }}
            />
          </Box>
          <FadeInBox show={allInputsOpen}>
            {allInputsOpen && (
              <>
                <Box pr={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
                  <BasketTypeSelect
                    onChange={this.onBasketTypeChange}
                    placeholder={t('advanced-search:input-placeholder-basket-type')}
                    label={t('advanced-search:input-label-basket-type')}
                  />
                </Box>
                <Box pr={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
                  <TeeTypeSelect
                    onChange={this.onTeeTypeChange}
                    placeholder={t('advanced-search:input-placeholder-tee-type')}
                    label={t('advanced-search:input-label-tee-type')}
                  />
                </Box>
                <Box pr={[0, 0, '.5rem', '.5rem']} mb=".75rem" width={[1, 1, 1 / 2, 1 / 2]}>
                  <SurfaceTypeSelect
                    onChange={this.onSurfaceTypeChange}
                    placeholder={t('advanced-search:input-placeholder-surface-contour-type')}
                    label={t('advanced-search:input-label-surface-contour-type')}
                  />
                </Box>
              </>
            )}
          </FadeInBox>
          <Toggle
            label={t('advanced-search:toggle-label-show-all-inputs')}
            checked={allInputsOpen}
            handleOnChange={this.toggleAdvancedSearchInputs}
          />
          <Box mb=".75rem" width={[1]}>
            <Toggle label={t('advanced-search:toggle-label-use-map')} checked={mapChecked} handleOnChange={this.handleMapToggle} />
            <AdvancedSearchMapComponent mapVisible={mapChecked} handleChange={this.onMapSearchChange} />
          </Box>
        </Flex>
        <Divider w={1} borderColor={colors.info} />
      </Box>
    );
  }
}

const mapStateToProps = (state: State): MapStateToProps => ({
  allInputsOpen: isAllAdvancedSearchInputsOpen(state),
  filter: getCurrentAdvancedFilter(state),
  mapChecked: isAdvancedSearchMapVisible(state),
});
const mapDispatchToProps = (dispatch: Function): MapDispatchToProps => ({
  setAdvancedSearchFilter: filter => dispatch(setCurrentAdvancedSearchFilter(filter)),
  toggleMapVisibility: (visible: boolean) => dispatch(toggleAdvancedSearchMap(visible)),
  toggleAdvancedSearchInputs: (visible: boolean) => dispatch(toggleAdvancedSearchInputsFunc(visible)),
});

export default connect<CombinedProps, Props, any, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('advanced-search')(AdvancedSearchInputs));
