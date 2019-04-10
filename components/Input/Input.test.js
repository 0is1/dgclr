/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import InputComponent from './Input';
import Styles from './Input.styles';

const { Input } = Styles;

const defaultProps = (props = {}) => ({
  focusOnMount: false,
  options: { type: 'text' },
  placeholder: '',
  value: '',
  onChange: jest.fn(),
  ...props,
});

describe('Input component', () => {
  it('Match snapshot with default props', () => {
    const props = defaultProps();
    const component = renderer.create(<InputComponent {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders correctly', () => {
    const props = defaultProps({ value: 'espoo', placeholder: 'Kaupungin tai radan nimi' });
    const enzymeWrapper = mount(<InputComponent {...props} />);
    expect(enzymeWrapper.find(Input).length).toEqual(1);
    expect(enzymeWrapper.find(Input).getDOMNode().placeholder).toEqual('Kaupungin tai radan nimi');
    expect(enzymeWrapper.find(Input).getDOMNode().value).toEqual('espoo');
  });
  it('Does not autofocus by default', () => {
    const props = defaultProps();
    const enzymeWrapper = mount(<InputComponent {...props} />);
    const { ref } = enzymeWrapper.instance();
    jest.spyOn(ref.current, 'focus');
    enzymeWrapper.instance().componentDidMount();
    expect(ref.current.focus).toHaveBeenCalledTimes(0);
  });
  it('Autofocus correctly if prop is set', () => {
    const props = defaultProps({ focusOnMount: true });
    const enzymeWrapper = mount(<InputComponent {...props} />);
    const { ref } = enzymeWrapper.instance();
    jest.spyOn(ref.current, 'focus');
    enzymeWrapper.instance().componentDidMount();
    expect(ref.current.focus).toHaveBeenCalledTimes(1);
  });
});
