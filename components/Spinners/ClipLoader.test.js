import React from 'react';
import { shallow } from 'enzyme';
import { Box } from 'rebass';
import ClipLoaderSpinner from 'react-spinners/ClipLoader';
import ClipLoader from './ClipLoader';

describe('Layout component', () => {
  it('Match snapshot', () => {
    const subject = shallow(<ClipLoader />);
    expect(subject).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const enzymeWrapper = shallow(<ClipLoader />);
    expect(enzymeWrapper.find(Box).length).toEqual(1);
    expect(enzymeWrapper.find(ClipLoaderSpinner).length).toEqual(1);
  });
});
