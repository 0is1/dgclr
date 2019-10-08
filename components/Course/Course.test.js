/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Card } from 'rebass';
import TestStoreProvider from 'jest/TestStoreProvider';
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import Tabs from 'components/Tabs/Tabs';
import { DEFAULT_STATE } from 'lib/rootReducer';
import Styles from './Course.styles';
import Course from './Course';

const { Description, PanelWrapper } = Styles;

const mockProps = (props = {}) => ({
  setCourses: jest.fn(),
  slug: mockCoursesData[1].slug,
  t: jest.fn(value => value),
  ...props,
});

function setup() {
  const storeData = {
    ...DEFAULT_STATE,
    ...DEFAULT_STATE.search,
    courses: {
      [mockCoursesData[0].slug]: mockCoursesData[0],
      [mockCoursesData[1].slug]: mockCoursesData[1],
    },
  };
  const props = mockProps();
  const components = (
    <TestStoreProvider storeData={storeData}>
      <Course {...props} />
    </TestStoreProvider>
  );
  const enzymeWrapper = mount(components);
  return { enzymeWrapper };
}

describe('Course component', () => {
  it('Match snapshot', () => {
    const props = mockProps();
    const subject = shallow(
      <TestStoreProvider storeData={DEFAULT_STATE}>
        <Course {...props} />
      </TestStoreProvider>,
    );
    expect(subject).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find(PanelWrapper).length).toEqual(2);
    expect(enzymeWrapper.find(Card).length).toEqual(1);
    expect(enzymeWrapper.props().children.props.slug).toEqual(mockCoursesData[1].slug);
    expect(enzymeWrapper.find('h2').length).toEqual(1);
    expect(enzymeWrapper.find('h2').text()).toEqual('Ford DiscGolfParkAA1');
    expect(enzymeWrapper.find(Description).length).toEqual(1);
    expect(enzymeWrapper.find(Description).text()).toEqual(mockCoursesData[1].description);
    expect(enzymeWrapper.find(Tabs).length).toEqual(1);
  });
});
