// @flow
import React from 'react';
import Select from 'components/Select';
import { SELECT_FILTER_NAMES } from './constants';

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

type Props = { onChange: Function };

const BasketTypeSelect = (props: Props) => {
  const { onChange } = props;
  return (
    <Select
      options={basketTypeOptions}
      onChange={onChange}
      placeholder="Korityyppi"
      filterName={SELECT_FILTER_NAMES.basketType.filterName}
      label="Korityyppi:"
    />
  );
};

export default BasketTypeSelect;
