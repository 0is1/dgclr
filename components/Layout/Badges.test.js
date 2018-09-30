/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Badge } from 'rebass';
import { mount, shallow } from 'enzyme';
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { uniqueLayoutRatings } from 'helpers/utils';
import Badges from './Badges';

const defaultProps = {
  tiny: false,
  ratings: uniqueLayoutRatings(mockCoursesData[1].layouts),
};

describe('Layout component', () => {
  it('Match snapshot', () => {
    const component = renderer.create(<Badges {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders correctly without ratings', () => {
    const enzymeWrapper = shallow(<Badges ratings={[]} />);
    expect(enzymeWrapper).toBeDefined();
    expect(enzymeWrapper.find(Badge).length).toEqual(0);
  });
  it('Renders correctly', () => {
    const enzymeWrapper = mount(<Badges {...defaultProps} />);
    expect(enzymeWrapper).toBeDefined();
    expect(enzymeWrapper.find(Badge).length).toEqual(1);
    expect(enzymeWrapper.find(Badge).text()).toEqual('AA1');
  });
});
