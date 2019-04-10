// @flow
import React, { PureComponent } from 'react';
import colors from 'components/colors';
import type { Event } from 'lib/types';
import Styles from './Input.styles';

type Props = {
  focusOnMount?: boolean,
  onChange: Function,
  options?: {},
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

  render() {
    const { options, placeholder, value } = this.props;
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
