// @flow
import React, { PureComponent } from 'react';
import colors from 'components/colors';
import type { Event } from 'lib/types';
import Slider from './Slider';
import Styles from './Input.styles';

type Props = {
  focusOnMount?: boolean,
  onChange: Function,
  options?: {
    max?: number,
    min?: number,
    name?: string,
    step?: string | number,
    type: string,
    // $FlowFixMe how to check that this is array in the way that flow likes it?
    initialValues?: Array<?number>,
    filterName?: string,
    domain?: Array<number>,
    format?: Function,
  },
  placeholder?: string,
  value?: string,
};

const { Input } = Styles;

class InputComponent extends PureComponent<Props> {
  static defaultProps = {
    focusOnMount: false,
    options: { type: 'text' },
    placeholder: '',
    value: '',
  };

  ref: { current: null | HTMLInputElement } = React.createRef();

  componentDidMount() {
    const { focusOnMount } = this.props;
    if (this.ref && this.ref.current && focusOnMount) {
      this.ref.current.focus();
    }
  }

  onChange = (event: Event) => {
    const { value } = event.target;
    const { onChange } = this.props;
    onChange(value);
  };

  onSliderChange = (values: Array<number>) => {
    const { onChange } = this.props;
    onChange(values);
  };

  render() {
    const { options, placeholder, value } = this.props;
    const { type = null } = options || {};
    if (type === 'slider') {
      const {
        initialValues = [], domain = null, filterName = null, ...restProps
      } = options || {};
      if (initialValues && domain && filterName) {
        return (
          <Slider
            {...restProps}
            initialValues={initialValues}
            domain={domain}
            filterName={filterName}
            handleOnChange={this.onSliderChange}
          />
        );
      }
    }
    return (
      <Input
        {...options}
        ref={this.ref}
        px=".75rem"
        py=".75rem"
        bg={colors.white}
        placeholder={placeholder}
        value={value}
        onChange={this.onChange}
      />
    );
  }
}

export default InputComponent;
