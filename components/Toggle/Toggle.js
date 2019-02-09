// @flow
import React, { PureComponent } from 'react';
import Switch from 'react-switch';
import Styles from './Toggle.styles';

const { Label, LabelText } = Styles;

type Props = {
  checked: boolean,
  label: string,
  handleOnChange: Function,
};

class Toggle extends PureComponent<Props> {
  onChange = (checked: boolean) => {
    const { handleOnChange } = this.props;
    handleOnChange(checked);
  };

  render() {
    const { checked, label } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/label-has-for
      <Label htmlFor="normal-switch">
        <LabelText>{label}</LabelText>
        <Switch onChange={this.onChange} checked={checked} id="normal-switch" />
      </Label>
    );
  }
}

export default Toggle;
