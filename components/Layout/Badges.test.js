/* eslint-env jest */
import React from 'react';
import { Badge } from 'rebass';
import { shallow } from 'enzyme';
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { uniqueLayoutRatings } from 'helpers/utils';
import Badges from './Badges';

const mockProps = (props = {}) => ({
  tiny: false,
  ratings: uniqueLayoutRatings(mockCoursesData[1].layouts),
  ...props,
});

describe('Layout component', () => {
  it('Match snapshot', () => {
    const props = mockProps();
    const subject = shallow(<Badges {...props} />);
    expect(subject).toMatchSnapshot();
  });
  it('Renders correctly without ratings', () => {
    const props = mockProps({ ratings: [] });
    const subject = shallow(<Badges {...props} />);
    expect(subject.find(Badge).length).toEqual(0);
    expect(subject).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const props = mockProps();
    const subject = shallow(<Badges {...props} />);
    expect(subject.find(Badge).length).toEqual(1);
    expect(subject.find(Badge).text()).toEqual('AA1');
  });
});
