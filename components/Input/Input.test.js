/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { Slider } from 'react-compound-slider';
import TestStoreProvider from 'jest/TestStoreProvider';
import { DEFAULT_STATE } from 'lib/rootReducer';
import InputComponent from './Input';
import Handle from './Slider/Handle';
import Styles from './Input.styles';

const { Input } = Styles;

const mockProps = (props = {}) => ({
  focusOnMount: false,
  options: { type: 'text' },
  placeholder: '',
  value: '',
  onChange: jest.fn(),
  ...props,
});

const setup = (props = {}) => {
  const storeData = {
    ...DEFAULT_STATE,
  };
  const components = (
    <TestStoreProvider storeData={storeData}>
      <InputComponent {...props} />
    </TestStoreProvider>
  );
  const enzymeWrapper = mount(components);
  const component = renderer.create(components);
  return { component, enzymeWrapper };
};

describe('Input and Slider component', () => {
  describe('Input', () => {
    it('Match snapshot with default props', () => {
      const props = mockProps();
      const subject = shallow(<InputComponent {...props} />);
      expect(subject).toMatchSnapshot();
    });
    it('Renders correctly', () => {
      const props = mockProps({
        value: 'espoo',
        placeholder: 'Kaupungin tai radan nimi',
      });
      const subject = shallow(<InputComponent {...props} />);
      expect(subject.find(Input).length).toEqual(1);
      expect(subject.find(Input).prop('placeholder')).toEqual('Kaupungin tai radan nimi');
      expect(subject.find(Input).prop('value')).toEqual('espoo');
    });
    it('Does not autofocus by default', () => {
      const props = mockProps();
      const subject = mount(<InputComponent {...props} />);
      const { ref } = subject.instance();
      jest.spyOn(ref.current, 'focus');
      subject.instance().componentDidMount();
      expect(ref.current.focus).toHaveBeenCalledTimes(0);
    });
    it('Autofocus correctly if prop is set', () => {
      const props = mockProps({ focusOnMount: true });
      const subject = mount(<InputComponent {...props} />);
      const { ref } = subject.instance();
      jest.spyOn(ref.current, 'focus');
      subject.instance().componentDidMount();
      expect(ref.current.focus).toHaveBeenCalledTimes(1);
    });
  });
  describe('Slider', () => {
    it('Renders correctly with 1 Handle', () => {
      const options = {
        step: 5,
        type: 'slider',
        initialValues: [0],
        filterName: 'slider-filter',
        domain: [0, 100],
      };
      const props = mockProps({
        options,
      });
      const { component, enzymeWrapper } = setup(props);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      const SliderComponent = enzymeWrapper.find(Slider);
      const { step, domain, values } = SliderComponent.props();
      expect(step).toEqual(5);
      expect(domain).toEqual([0, 100]);
      expect(values).toEqual([0]);
      expect(SliderComponent.length).toEqual(1);
      expect(enzymeWrapper.find(Handle).length).toEqual(1);
    });
    it('Renders correctly with 2 Handles', () => {
      const options = {
        step: 10,
        type: 'slider',
        initialValues: [10, 100],
        filterName: 'slider-filter',
        domain: [0, 200],
      };
      const props = mockProps({
        options,
      });
      const { component, enzymeWrapper } = setup(props);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      const SliderComponent = enzymeWrapper.find(Slider);
      const { step, domain, values } = SliderComponent.props();
      expect(step).toEqual(10);
      expect(domain).toEqual([0, 200]);
      expect(values).toEqual([10, 100]);
      expect(SliderComponent.length).toEqual(1);
      expect(enzymeWrapper.find(Handle).length).toEqual(2);
    });
  });
});
