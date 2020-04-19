// @flow
import React from 'react';
import Select from 'components/Select';
import { SELECT_FILTER_NAMES } from './constants';

export const surfaceTypeOptions = [
  {
    value: 'Mäkinen, paljon korkeuseroja',
    label: 'Mäkinen, paljon korkeuseroja',
  },
  {
    value: 'Kumpuileva, jonkin verran korkeuseroja',
    label: 'Kumpuileva, jonkin verran korkeuseroja',
  },
  {
    value: 'Tasainen, vähän korkeuseroja',
    label: 'Tasainen, vähän korkeuseroja',
  },
  { value: 'Tasainen, ei korkeuseroja', label: 'Tasainen, ei korkeuseroja' },
];

type Props = { onChange: Function, placeholder: string, label: string };

const SurfaceTypeSelect = (props: Props) => {
  const { onChange, ...other } = props;
  return (
    <Select {...other} options={surfaceTypeOptions} onChange={onChange} filterName={SELECT_FILTER_NAMES.surfaceShapeTypes.filterName} />
  );
};

export default SurfaceTypeSelect;
