// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
import Select from 'react-select';
import { setFilter as setFilterFunc } from 'components/SearchContainer/actions';
import { getFilterTypeData } from 'components/SearchContainer/selectors';
import type { OptionsType } from 'react-select/src/types';
import type { State } from 'lib/types';
import { RATING_OPTIONS } from 'lib/constants';

type Props = { defaultValue: OptionsType, onChange: Function, setFilter: Function };

class RatingSelect extends Component<Props> {
  onRatingChange = (values: []) => {
    // console.log('onRatingChange values. ', values);
    const { onChange, setFilter } = this.props;
    const rating = values.map(item => item.value);
    onChange(rating);
    setFilter('rating', values);
  };

  render() {
    const { defaultValue } = this.props;
    return (
      <React.Fragment>
        <Label>Radan luokitus:</Label>
        <Select defaultValue={defaultValue} isMulti options={RATING_OPTIONS} onChange={this.onRatingChange} placeholder="Radan luokitus" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State) => ({
  defaultValue: getFilterTypeData(state, 'rating'),
});
const mapDispatchToProps = dispatch => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingSelect);
