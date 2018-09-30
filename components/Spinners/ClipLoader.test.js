/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Box } from 'rebass';
import { ClipLoader as ClipLoaderSpinner } from 'react-spinners';
import ClipLoader from './ClipLoader';

describe('Layout component', () => {
  it('Match snapshot', () => {
    const component = renderer.create(<ClipLoader />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const enzymeWrapper = shallow(<ClipLoader />);
    expect(enzymeWrapper).toBeDefined();
    expect(enzymeWrapper.find(Box).length).toEqual(1);
    expect(enzymeWrapper.find(ClipLoaderSpinner).length).toEqual(1);
  });
});
