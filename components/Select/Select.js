// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
// $FlowFixMe
import SelectInput from 'react-select';
import { setFilter as setFilterFunc } from 'components/AdvancedSearch/actions';
import { getFilterTypeData } from 'components/AdvancedSearch/selectors';
// $FlowFixMe
import type { OptionsType, ValueType } from 'react-select/src/types';

type Props = {
  defaultValue: OptionsType,
  filterName: string,
  label: string,
  onChange: Function,
  options: OptionsType,
  placeholder: string,
  setFilter: Function,
};

class Select extends Component<Props> {
  onValueChange = (values: ValueType) => {
    // console.log('values: ', values);
    const { filterName, onChange, setFilter } = this.props;
    const valueData = values ? [].concat(values) : '';
    const value = values && values.value ? values.value : '';
    onChange(value);
    setFilter(filterName, valueData);
  };

  render() {
    const {
      defaultValue, label, options, placeholder,
    } = this.props;
    return (
      <>
        <Label>{label}</Label>
        <SelectInput
          defaultValue={defaultValue}
          options={options}
          onChange={this.onValueChange}
          placeholder={placeholder}
          isClearable
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  defaultValue: getFilterTypeData(state, ownProps.filterName),
});
const mapDispatchToProps = dispatch => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
});
export default connect<any, Props, any, any, any, Function>(
  mapStateToProps,
  mapDispatchToProps,
)(Select);
