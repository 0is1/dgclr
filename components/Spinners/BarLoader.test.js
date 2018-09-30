/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { BarLoader as BarLoaderSpinner } from 'react-spinners';
import { Box } from 'rebass';
import BarLoader from './BarLoader';

describe('Layout component', () => {
  it('Match snapshot', () => {
    const component = renderer.create(<BarLoader />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const enzymeWrapper = shallow(<BarLoader />);
    expect(enzymeWrapper).toBeDefined();
    expect(enzymeWrapper.find(Box).length).toEqual(1);
    expect(enzymeWrapper.find(BarLoaderSpinner).length).toEqual(1);
  });
});
