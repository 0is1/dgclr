// @flow
import React, { PureComponent } from 'react';
import colors from 'components/colors';
import Styles from './Input.styles';

type Props = {
  onChange: Function,
  placeholder?: string,
  value?: string,
};

type Event = {
  target: {
    value: string,
  },
};
const { Input } = Styles;

class InputComponent extends PureComponent<Props> {
  static defaultProps = {
    placeholder: '',
    value: '',
  };

  onChange = (event: Event) => {
    const { value } = event.target;
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { placeholder, value } = this.props;
    return (
      <Input
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
