// @flow
import React, { Component } from 'react';
import Styles from './Input.styles';

type Props = {
  onChange: Function,
  value: String,
};

type Event = {
  target: {
    value: String,
  },
};
const { Input } = Styles;

class InputComponent extends Component<Props> {
  onChange = (event: Event) => {
    const { value } = event.target;
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { value } = this.props;
    return <Input value={value} onChange={this.onChange} />;
  }
}

export default InputComponent;
