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
    defaultValues?: Array<number>,
    domain?: Array<number>,
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
      const { defaultValues = null, domain = null, ...restProps } = options || {};
      if (defaultValues && domain) {
        return (
          <Slider
            defaultValues={defaultValues}
            domain={domain}
            {...restProps}
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
