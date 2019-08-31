// @flow
import React from 'react';
import Select from 'components/Select';
import { SELECT_FILTER_NAMES } from './constants';

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

type Props = { onChange: Function };

const CourseTypeSelect = (props: Props) => {
  const { onChange } = props;
  return (
    <Select
      options={courseTypeOptions}
      onChange={onChange}
      placeholder="Ratatyyppi"
      label="Ratatyyppi:"
      filterName={SELECT_FILTER_NAMES.courseTypes.filterName}
    />
  );
};

export default CourseTypeSelect;
