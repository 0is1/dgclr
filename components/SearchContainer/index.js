// @flow
import React, { PureComponent } from 'react';
import { debounce } from 'lodash';
import Container from 'components/Container';
import Input from 'components/Input';
import SearchQuery from 'components/SearchContainer/SearchQuery';

type Props = {
  client: {},
};

class SearchContainer extends PureComponent<Props> {
  state = {
    inputValue: '',
    query: '',
  };

  changeQueryValue = debounce((query) => {
    this.setState({ query });
  }, 200);

  onChange = (query: String) => {
    console.log('value is: ', query);
    this.setState({ inputValue: query });
    this.changeQueryValue(query);
  };

  render() {
    const { query, inputValue } = this.state;
    return (
      <Container>
        <h1>Search:</h1>
        <Input value={inputValue} onChange={this.onChange} />
        <SearchQuery query={query} />
      </Container>
    );
  }
}

export default SearchContainer;
