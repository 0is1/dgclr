/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SelectInput from 'react-select';
import { Label } from 'rebass';
import TestStoreProvider from 'jest/TestStoreProvider';
import { DEFAULT_STATE } from 'lib/rootReducer';
import { surfaceTypeOptions } from './SurfaceTypeSelect';
import Select from './Select';

const defaultProps = {
  setFilter: jest.fn(),
  options: surfaceTypeOptions,
  filterName: 'filterName',
  label: 'label',
  onChange: jest.fn(),
  placeholder: 'placeholder',
};

function setup(advancedQueries = {}) {
  const storeData = {
    ...DEFAULT_STATE,
    search: {
      ...DEFAULT_STATE.search,
      advancedQueries,
    },
  };
  const components = (
    <TestStoreProvider storeData={storeData}>
      <Select {...defaultProps} />
    </TestStoreProvider>
  );
  const enzymeWrapper = mount(components);
  return { enzymeWrapper };
}

describe('Select component', () => {
  it('Match snapshot', () => {
    const component = renderer.create(
      <TestStoreProvider storeData={DEFAULT_STATE}>
        <Select {...defaultProps} />
      </TestStoreProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).toBeDefined();
    expect(enzymeWrapper.find(SelectInput).length).toEqual(1);
    expect(enzymeWrapper.find(SelectInput).prop('defaultValue')).toEqual([]);
    expect(enzymeWrapper.find(SelectInput).prop('options')).toEqual(
      surfaceTypeOptions
    );
    expect(enzymeWrapper.props().children.props.filterName).toEqual(
      'filterName'
    );
    expect(enzymeWrapper.props().children.props.label).toEqual('label');
    expect(enzymeWrapper.find(Label).length).toEqual(1);
    expect(enzymeWrapper.find(Label).text()).toEqual('label');
  });
  it('Renders correctly with defaultValue', () => {
    const advancedQueries = {
      filterName: [surfaceTypeOptions[0]],
    };
    const { enzymeWrapper } = setup(advancedQueries);
    expect(enzymeWrapper).toBeDefined();
    expect(enzymeWrapper.find(SelectInput).length).toEqual(1);
    expect(enzymeWrapper.find(SelectInput).prop('defaultValue')).toEqual([
      surfaceTypeOptions[0],
    ]);
    expect(enzymeWrapper.find(SelectInput).prop('options')).toEqual(
      surfaceTypeOptions
    );
    expect(enzymeWrapper.props().children.props.filterName).toEqual(
      'filterName'
    );
    expect(enzymeWrapper.props().children.props.label).toEqual('label');
    expect(enzymeWrapper.find(Label).length).toEqual(1);
    expect(enzymeWrapper.find(Label).text()).toEqual('label');
  });
});
