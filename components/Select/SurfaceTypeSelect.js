// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
import Select from 'react-select';
import { setFilter as setFilterFunc } from 'components/SearchContainer/actions';
import { getFilterTypeData } from 'components/SearchContainer/selectors';
import type { OptionsType } from 'react-select/src/types';

const surfaceTypeOptions = [
  { value: 'Mäkinen, paljon korkeuseroja', label: 'Mäkinen, paljon korkeuseroja' },
  {
    value: 'Kumpuileva, jonkin verran korkeuseroja',
    label: 'Kumpuileva, jonkin verran korkeuseroja',
  },
  { value: 'Tasainen, vähän korkeuseroja', label: 'Tasainen, vähän korkeuseroja' },
  { value: 'Tasainen, ei korkeuseroja', label: 'Tasainen, ei korkeuseroja' },
];

type Props = { defaultValue: OptionsType, onChange: Function, setFilter: Function };

class TeeTypeSelect extends Component<Props> {
  onTeeTypeChange = (values: { value: string }) => {
    const { onChange, setFilter } = this.props;
    const valueData = values ? [].concat(values) : '';
    const value = values && values.value ? values.value : '';
    onChange(value);
    setFilter('surfaceShapeTypes', valueData);
  };

  render() {
    const { defaultValue } = this.props;
    return (
      <React.Fragment>
        <Label>Pinnanmuodot:</Label>
        <Select
          defaultValue={defaultValue}
          options={surfaceTypeOptions}
          onChange={this.onTeeTypeChange}
          placeholder="Pinnanmuodot"
          isClearable
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  defaultValue: getFilterTypeData(state, 'surfaceShapeTypes'),
});
const mapDispatchToProps = dispatch => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeeTypeSelect);
