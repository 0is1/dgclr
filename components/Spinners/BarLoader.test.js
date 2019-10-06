import React from 'react';
import { shallow } from 'enzyme';
import BarLoaderSpinner from 'react-spinners/BarLoader';
import { Box } from 'rebass';
import BarLoader from './BarLoader';

describe('Layout component', () => {
  it('Match snapshot', () => {
    const subject = shallow(<BarLoader />);
    expect(subject).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const enzymeWrapper = shallow(<BarLoader />);
    expect(enzymeWrapper.find(Box).length).toEqual(1);
    expect(enzymeWrapper.find(BarLoaderSpinner).length).toEqual(1);
  });
});
