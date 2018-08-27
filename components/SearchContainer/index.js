// @flow
import React, { PureComponent } from 'react';
import Container from 'components/Container';
import Input from 'components/Input';

// type Props = {
//   children: Node,
// };

class SearchContainer extends PureComponent {
  componentDidMount() {
    console.log('Hello');
  }

  render() {
    return (
      <Container>
        <h1>Search:</h1>
        <Input />
      </Container>
    );
  }
}

export default SearchContainer;
