// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
import Select from 'react-select';
import { setBasketTypeFilter } from 'components/SearchContainer/actions';
import { getBasketTypeFilter } from 'components/SearchContainer/selectors';
import type { OptionsType } from 'react-select/src/types';

const basketTypeOptions = [
  { value: 'Amexpo', label: 'Amexpo' },
  { value: 'DiscGolfPark-maalikori', label: 'DiscGolfPark-maalikori' },
  { value: 'Knickarp', label: 'Knickarp' },
  { value: 'Latitude64', label: 'Latitude64' },
  { value: 'M-Stone', label: 'M-Stone' },
  { value: 'Muu', label: 'Muu' },
  { value: 'Obsidian Discs', label: 'Obsidian Discs' },
  { value: 'Prodigy', label: 'Prodigy' },
  { value: 'Prodiscus', label: 'Prodiscus' },
];

type Props = { defaultValue: OptionsType, onChange: Function, setFilter: Function };

class BasketTypeSelect extends Component<Props> {
  onBasketTypeChange = (values: { value: string }) => {
    const { onChange, setFilter } = this.props;
    const valueData = values ? [].concat(values) : '';
    const value = values && values.value ? values.value : '';
    onChange(value);
    setFilter(valueData);
  };

  render() {
    const { defaultValue } = this.props;
    return (
      <React.Fragment>
        <Label>Korityyppi:</Label>
        <Select
          defaultValue={defaultValue}
          options={basketTypeOptions}
          onChange={this.onBasketTypeChange}
          placeholder="Korityyppi"
          isClearable
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  defaultValue: getBasketTypeFilter(state),
});
const mapDispatchToProps = dispatch => ({
  setFilter: values => dispatch(setBasketTypeFilter(values)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasketTypeSelect);
