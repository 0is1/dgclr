// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
import Select from 'react-select';
import { setRatingFilter } from 'components/SearchContainer/actions';
import { getRatingFilter } from 'components/SearchContainer/selectors';
import type { OptionsType } from 'react-select/src/types';

const ratingOptions = [
  { value: 'AAA1', label: 'AAA1' },
  { value: 'AA1', label: 'AA1' },
  { value: 'A1', label: 'A1' },
  { value: 'AA2', label: 'AA2' },
  { value: 'AA3', label: 'AA3' },
  { value: 'A2', label: 'A2' },
  { value: 'A3', label: 'A3' },
  { value: 'BB1', label: 'BB1' },
  { value: 'BB2', label: 'BB2' },
  { value: 'B1', label: 'B1' },
  { value: 'B2', label: 'B2' },
  { value: 'B3', label: 'B3' },
  { value: 'C1', label: 'C1' },
  { value: 'C2', label: 'C2' },
  { value: 'C3', label: 'C3' },
  { value: 'D1', label: 'D1' },
  { value: 'D2', label: 'D2' },
  { value: 'D3', label: 'D3' },
];
type Props = { defaultValue: OptionsType, onChange: Function, setFilter: Function };

class RatingSelect extends Component<Props> {
  onRatingChange = (values: []) => {
    // console.log('onRatingChange values. ', values);
    const { onChange, setFilter } = this.props;
    const rating = values.map(item => item.value);
    onChange(rating);
    setFilter(values);
  };

  render() {
    const { defaultValue } = this.props;
    return (
      <React.Fragment>
        <Label>Radan luokitus:</Label>
        <Select
          defaultValue={defaultValue}
          isMulti
          options={ratingOptions}
          onChange={this.onRatingChange}
          placeholder="Radan luokitus"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  defaultValue: getRatingFilter(state),
});
const mapDispatchToProps = dispatch => ({
  setFilter: values => dispatch(setRatingFilter(values)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingSelect);
