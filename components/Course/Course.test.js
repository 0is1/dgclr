// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Card } from 'rebass';
import TestStoreProvider from 'jest/TestStoreProvider';
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import Tabs from 'components/Tabs/Tabs';
import { DEFAULT_STATE } from 'lib/rootReducer';
import Styles from './Course.styles';
import Course from './Course';

const { Description, PanelWrapper } = Styles;

const defaultProps = {
  setCourses: jest.fn(),
  slug: mockCoursesData[1].slug,
};

function setup() {
  const storeData = {
    ...DEFAULT_STATE,
    search: {
      ...DEFAULT_STATE.search,
      courses: {
        [mockCoursesData[0].slug]: mockCoursesData[0],
        [mockCoursesData[1].slug]: mockCoursesData[1],
      },
    },
  };
  const components = (
    <TestStoreProvider storeData={storeData}>
      <Course {...defaultProps} />
    </TestStoreProvider>
  );
  const enzymeWrapper = mount(components);
  return { enzymeWrapper };
}

describe('Course component', () => {
  it('Match snapshot', () => {
    const component = renderer.create(
      <TestStoreProvider storeData={DEFAULT_STATE}>
        <Course {...defaultProps} />
      </TestStoreProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).toBeDefined();
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
