// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { Box } from 'rebass';
import { latestQuery as latestQueryFunc } from 'components/SearchContainer/selectors';
import Input from 'components/Input';
import SearchQuery from 'components/SearchContainer/SearchQuery';
import Styles from 'components/SearchContainer/SearchContainer.styles';

const { Wrapper } = Styles;

type Props = {
  client: {},
  latestQuery: string,
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

  componentDidMount() {
    const { latestQuery } = this.props;
    if (latestQuery) {
      this.setState({ inputValue: latestQuery });
    }
  }

  onChange = (query: string) => {
    this.setState({ inputValue: query });
    this.changeQueryValue(query);
  };

  render() {
    const { query, inputValue } = this.state;
    return (
      <Wrapper>
        <Box
          m="1rem auto"
          p="1rem 2rem"
          width={[
            1, // 100% width at the smallest breakpoint
            1, // 100% width at the smallest breakpoint
            1, // 100% width at the smallest breakpoint
            1 / 2, // 50% width at the next
          ]}
        >
          <h1>Etsi ratoja:</h1>
          <Input
            placeholder="Kaupungin tai radan nimi"
            value={inputValue}
            onChange={this.onChange}
          />
          <SearchQuery query={query} />
        </Box>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  latestQuery: latestQueryFunc(state),
});

export default connect(mapStateToProps)(SearchContainer);
