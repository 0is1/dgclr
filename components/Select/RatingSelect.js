// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
// $FlowFixMe
import Select from 'react-select';
import { setFilter as setFilterFunc } from 'components/AdvancedSearch/actions';
import { getFilterTypeData } from 'components/AdvancedSearch/selectors';
// $FlowFixMe
import type { ValueType } from 'react-select/src/types';
import type { State } from 'lib/types';
import { RATING_OPTIONS } from 'lib/constants';
import { SELECT_FILTER_NAMES } from './constants';
import Styles from './Select.styles';

const { ZIndexContainer } = Styles;

type Props = { onChange: Function };
type MapStateToProps = { defaultValue: any };

type MapDispatchToProps = { setFilter: Function };

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

class RatingSelect extends Component<CombinedProps> {
  onRatingChange = (values: ValueType = []) => {
    const { onChange, setFilter } = this.props;
    if (values) {
      // console.log('onRatingChange values. ', values);
      const rating = values.map(item => item.value);
      onChange(rating);
      setFilter(SELECT_FILTER_NAMES.rating.filterName, values);
    } else {
      onChange('');
      setFilter(SELECT_FILTER_NAMES.rating.filterName, []);
    }
  };

  render() {
    const { defaultValue } = this.props;
    return (
      <ZIndexContainer zIndex={5}>
        <Label>Radan luokitus:</Label>
        <Select
          defaultValue={defaultValue}
          isMulti
          options={RATING_OPTIONS}
          onChange={this.onRatingChange}
          placeholder="Radan luokitus"
        />
      </ZIndexContainer>
    );
  }
}

const mapStateToProps = (state: State): MapStateToProps => ({
  defaultValue: getFilterTypeData(state, 'rating'),
});
const mapDispatchToProps = (dispatch: Function): MapDispatchToProps => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
});
export default connect<CombinedProps, Props, any, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(RatingSelect);
