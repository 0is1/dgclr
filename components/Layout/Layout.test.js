/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { Badge } from 'rebass';
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { Layout } from './Layout';

const mockProps = (props = {}) => ({
  active: true,
  layout: mockCoursesData[1].layouts[0],
  t: jest.fn((value) => value),
  ...props,
});

describe('Layout component', () => {
  it('Match snapshot', () => {
    const props = mockProps();
    const subject = shallow(<Layout {...props} />);
    expect(subject).toMatchSnapshot();
  });
  it('Renders correctly with active false', () => {
    const props = mockProps({ active: false });
    const subject = shallow(<Layout {...props} />);
    expect(subject.find(Badge).length).toEqual(0);
    expect(subject).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const props = mockProps();
    const subject = shallow(<Layout {...props} />);
    expect(subject.find(Badge).length).toEqual(1);
    expect(subject.find(Badge).text()).toEqual('AA1');
  });
});
