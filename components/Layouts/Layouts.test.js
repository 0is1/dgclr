/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
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
    const subject = shallow(
      <TestStoreProvider storeData={DEFAULT_STATE}>
        <Layouts {...defaultProps} />
      </TestStoreProvider>,
    );
    expect(subject).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find(Layout).length).toEqual(2);
  });
});
