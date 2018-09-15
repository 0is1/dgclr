// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { Box, Lead } from 'rebass';
import {
  getCurrentAdvancedFilter,
  isAdvancedSearchOpen,
  latestQuery as latestQueryFunc,
} from 'components/SearchContainer/selectors';
import Input from 'components/Input';
import SearchQuery from 'components/SearchContainer/SearchQuery';
import AdvancedSearchQuery from 'components/SearchContainer/AdvancedSearchQuery';
import AdvancedSearchContainer from 'components/SearchContainer/AdvancedSearchContainer';
import Styles from 'components/SearchContainer/SearchContainer.styles';

const { Wrapper } = Styles;

type Props = {
  advancedSearchOpen: boolean,
  client: {},
  filter: string,
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
    const { advancedSearchOpen, latestQuery } = this.props;
    if (!advancedSearchOpen && latestQuery) {
      this.setState({ inputValue: latestQuery });
    }
  }

  onSearchQueryChange = (query: string) => {
    this.setState({ inputValue: query });
    this.changeQueryValue(query);
  };

  render() {
    const { query, inputValue } = this.state;
    const { advancedSearchOpen, filter } = this.props;
    const basicSearch = !advancedSearchOpen ? (
      <React.Fragment>
        <Lead my={2}>Etsi frisbeegolfratoja:</Lead>
        <Input
          placeholder="Kaupungin tai radan nimi"
          value={inputValue}
          onChange={this.onSearchQueryChange}
        />
        <SearchQuery query={query} />
      </React.Fragment>
    ) : null;
    const advancedSearchResults = advancedSearchOpen ? (
      <AdvancedSearchQuery filter={JSON.parse(filter)} />
    ) : null;
    return (
      <Wrapper>
        <Box m="1rem auto" px="2rem" width={[1, 1, 1, 1 / 2]}>
          <AdvancedSearchContainer />
          {advancedSearchResults}
          {basicSearch}
        </Box>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  filter: getCurrentAdvancedFilter(state),
  advancedSearchOpen: isAdvancedSearchOpen(state),
  latestQuery: latestQueryFunc(state),
});

export default connect(mapStateToProps)(SearchContainer);
