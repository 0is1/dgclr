// @flow
import React from 'react';
import Select from 'components/Select';

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

type Props = { onChange: Function };

const SurfaceTypeSelect = (props: Props) => {
  const { onChange } = props;
  return (
    <Select
      options={surfaceTypeOptions}
      onChange={onChange}
      placeholder="Pinnanmuodot"
      label="Pinnanmuodot:"
      filterName="surfaceShapeTypes"
    />
  );
};

export default SurfaceTypeSelect;
