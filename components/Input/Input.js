// @flow
import React, { PureComponent } from 'react';
import colors from 'components/colors';
import type { Event } from 'lib/types';
import Styles from './Input.styles';

type Props = {
  onChange: Function,
  options?: {},
  placeholder?: string,
  value?: string,
};

const { Input } = Styles;

class InputComponent extends PureComponent<Props> {
  static defaultProps = {
    options: { type: 'text' },
    placeholder: '',
    value: '',
  };

  onChange = (event: Event) => {
    const { value } = event.target;
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { options, placeholder, value } = this.props;
    return (
      <Input {...options} px=".75rem" py=".75rem" bg={colors.white} placeholder={placeholder} value={value} onChange={this.onChange} />
    );
  }
}

export default InputComponent;
