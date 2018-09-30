// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'rebass';
import Select from 'react-select';
import { setFilter as setFilterFunc } from 'components/SearchContainer/actions';
import { getFilterTypeData } from 'components/SearchContainer/selectors';
import type { OptionsType } from 'react-select/src/types';

const teeTypeOptions = [
  { value: 'Tekonurmi', label: 'Tekonurmi' },
  { value: 'TeePad', label: 'TeePad' },
  { value: 'Maapohja', label: 'Maapohja' },
  { value: 'Betonilaatat', label: 'Betonilaatat' },
  { value: 'Kumimatto', label: 'Kumimatto' },
  { value: 'Hiekka/Sora', label: 'Hiekka/Sora' },
  { value: 'Lautalaveri', label: 'Lautalaveri' },
  { value: 'Kivituhka', label: 'Kivituhka' },
  { value: 'Betoni', label: 'Betoni' },
];

type Props = { defaultValue: OptionsType, onChange: Function, setFilter: Function };

class TeeTypeSelect extends Component<Props> {
  onTeeTypeChange = (values: { value: string }) => {
    const { onChange, setFilter } = this.props;
    const valueData = values ? [].concat(values) : '';
    const value = values && values.value ? values.value : '';
    onChange(value);
    setFilter('teeType', valueData);
  };

  render() {
    const { defaultValue } = this.props;
    return (
      <React.Fragment>
        <Label>Heittopaikan tyyppi:</Label>
        <Select
          defaultValue={defaultValue}
          options={teeTypeOptions}
          onChange={this.onTeeTypeChange}
          placeholder="Heittopaikan tyyppi"
          isClearable
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  defaultValue: getFilterTypeData(state, 'teeType'),
});
const mapDispatchToProps = dispatch => ({
  setFilter: (filterName, data) => dispatch(setFilterFunc(filterName, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeeTypeSelect);
