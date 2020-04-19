// @flow
import React from 'react';
import Select from 'components/Select';
import { SELECT_FILTER_NAMES } from './constants';
import Styles from './Select.styles';

const { ZIndexContainer } = Styles;

export const courseTypeOptions = [
  {
    value: 'Metsärata',
    label: 'Metsärata',
  },
  {
    value: 'Puistorata',
    label: 'Puistorata',
  },
  {
    value: 'Peltorata',
    label: 'Peltorata',
  },
  {
    value: 'Hiekkakuopparata',
    label: 'Hiekkakuopparata',
  },
  {
    value: 'Hiihtokeskus',
    label: 'Hiihtokeskus',
  },
];

type Props = { onChange: Function, placeholder: string, label: string };

const CourseTypeSelect = (props: Props) => {
  const { onChange, ...other } = props;
  return (
    <ZIndexContainer>
      <Select {...other} options={courseTypeOptions} onChange={onChange} filterName={SELECT_FILTER_NAMES.courseTypes.filterName} />
    </ZIndexContainer>
  );
};

export default CourseTypeSelect;
