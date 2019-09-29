/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { Badge } from 'rebass';
import { mount } from 'enzyme';
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import Layout from './Layout';

const defaultProps = {
  active: true,
  layout: mockCoursesData[1].layouts[0],
  t: jest.fn(),
};

describe('Layout component', () => {
  it('Match snapshot', () => {
    const component = renderer.create(<Layout {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders correctly with active false', () => {
    const enzymeWrapper = mount(<Layout active={false} />);
    expect(enzymeWrapper).toBeDefined();
    expect(enzymeWrapper.find(Badge).length).toEqual(0);
  });
  it('Renders correctly', () => {
    const enzymeWrapper = mount(<Layout {...defaultProps} />);
    expect(enzymeWrapper).toBeDefined();
    expect(enzymeWrapper.find(Badge).length).toEqual(1);
    expect(enzymeWrapper.find(Badge).text()).toEqual('AA1');
  });
});
