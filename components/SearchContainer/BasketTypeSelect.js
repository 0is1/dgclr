// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
import Select from 'react-select';
import { setBasketTypeFilter } from 'components/SearchContainer/actions';
import { getBasketTypeFilter } from 'components/SearchContainer/selectors';
import type { OptionsType } from 'react-select/src/types';

const basketTypeOptions = [
  { value: 'Prodiscus', label: 'Prodiscus' },
  { value: 'DiscGolfPark-maalikori', label: 'DiscGolfPark-maalikori' },
  { value: 'Muu', label: 'Muu' },
  { value: 'Prodigy', label: 'Prodigy' },
  { value: 'Amexpo', label: 'Amexpo' },
  { value: 'Knickarp', label: 'Knickarp' },
  { value: 'Latitude64', label: 'Latitude64' },
  { value: 'Obsidian Discs', label: 'Obsidian Discs' },
  { value: 'M-Stone', label: 'M-Stone' },
];

type Props = { defaultValue: OptionsType, onChange: Function, setFilter: Function };

class BasketTypeSelect extends Component<Props> {
  onBasketTypeChange = (values: { value: string }) => {
    console.log(values);
    const { onChange, setFilter } = this.props;
    const valueData = [].concat(values);
    onChange(values.value);
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
