// @flow
import React, { PureComponent } from 'react';
import Container from 'components/Container';
import Input from 'components/Input';

type Props = {};

class SearchContainer extends PureComponent<Props> {
  onChange = (value: String) => {
    console.log('value is: ', value);
  };

  render() {
    return (
      <Container>
        <h1>Search:</h1>
        <Input onChange={this.onChange} />
      </Container>
    );
  }
}

export default SearchContainer;
