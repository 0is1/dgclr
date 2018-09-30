/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import TestStoreProvider from 'jest/TestStoreProvider';
import mockCoursesData from 'components/SearchContainer/mock/courses.mock';
import { DEFAULT_STATE } from 'lib/rootReducer';
import Layout from 'components/Layout';
import Layouts from './Layouts';

const defaultProps = {
  layouts: mockCoursesData[1].layouts,
};

function setup() {
  const storeData = {
    ...DEFAULT_STATE,
    tabs: {
      data: {
        [mockCoursesData[0]._id]: {
          id: mockCoursesData[0]._id,
          activeIndex: 0,
        },
      },
    },
  };
  const components = (
    <TestStoreProvider storeData={storeData}>
      <Layouts {...defaultProps} />
    </TestStoreProvider>
  );
  const enzymeWrapper = mount(components);
  return { enzymeWrapper };
}

describe('Layouts component', () => {
  it('Match snapshot', () => {
    const component = renderer.create(
      <TestStoreProvider storeData={DEFAULT_STATE}>
        <Layouts {...defaultProps} />
      </TestStoreProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).toBeDefined();
    expect(enzymeWrapper.find(Layout).length).toEqual(2);
  });
});
