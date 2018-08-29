// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
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
    console.log('value is: ', query);
    this.setState({ inputValue: query });
    this.changeQueryValue(query);
  };

  render() {
    const { query, inputValue } = this.state;
    return (
      <Wrapper>
        <h1>Etsi ratoja:</h1>
        <Input placeholder="Kaupungin tai radan nimi" value={inputValue} onChange={this.onChange} />
        <SearchQuery query={query} />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  latestQuery: latestQueryFunc(state),
});

export default connect(mapStateToProps)(SearchContainer);
