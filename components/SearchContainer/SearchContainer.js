// @flow
import React, { PureComponent } from 'react';
import { debounce } from 'lodash';
import Container from 'components/Container';
import Input from 'components/Input';
import SearchQuery from 'components/SearchContainer/SearchQuery';
import Styles from 'components/SearchContainer/SearchContainer.styles';

const { Wrapper } = Styles;

type Props = {
  client: {},
};
type State = {
  inputValue: string,
  query: string,
};

class SearchContainer extends PureComponent<Props, State> {
  state = {
    inputValue: '',
    query: '',
  };

  changeQueryValue = debounce((query) => {
    this.setState({ query });
  }, 300);

  onChange = (query: string) => {
    console.log('value is: ', query);
    this.setState({ inputValue: query });
    this.changeQueryValue(query);
  };

  render() {
    const { query, inputValue } = this.state;
    return (
      <Container>
        <Wrapper>
          <h1>Etsi ratoja:</h1>
          <Input
            placeholder="Kaupungin tai radan nimi"
            value={inputValue}
            onChange={this.onChange}
          />
          <SearchQuery query={query} />
        </Wrapper>
      </Container>
    );
  }
}

export default SearchContainer;
