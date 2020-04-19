// @flow
import React from 'react';
import Select from 'components/Select';
import { SELECT_FILTER_NAMES } from './constants';

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

type Props = { onChange: Function, placeholder: string, label: string };

const TeeTypeSelect = (props: Props) => {
  const { onChange, ...other } = props;
  return <Select {...other} options={teeTypeOptions} onChange={onChange} filterName={SELECT_FILTER_NAMES.teeType.filterName} />;
};

export default TeeTypeSelect;
