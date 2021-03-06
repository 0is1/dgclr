// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { Box } from 'rebass';
import Input from 'components/Input';
import RebassComponents from 'components/RebassComponents';
import { withTranslation } from 'lib/i18n';
import type { State as ReduxState } from 'lib/types';
import SearchQuery from './SearchQuery';
import { latestQuery as latestQueryFunc } from './selectors';
import Styles from './SearchContainer.styles';

const { Lead } = RebassComponents;
const { Wrapper } = Styles;

type Props = { t: Function };
type MapStateToProps = { latestQuery: string };

type MapDispatchToProps = {};

type CombinedProps = Props & MapStateToProps & MapDispatchToProps;

type State = {
  inputValue?: string,
  query?: string,
};

export class SearchContainer extends Component<CombinedProps, State> {
  state = {
    inputValue: '',
    query: '',
  };

  changeQueryValue = debounce((query: string) => {
    this.setState({ query });
  }, 300);

  componentDidMount() {
    const { latestQuery } = this.props;
    if (latestQuery) {
      this.setState({ inputValue: latestQuery });
    }
  }

  onSearchQueryChange = (query: string) => {
    this.setState({ inputValue: query });
    this.changeQueryValue(query);
  };

  render() {
    const { t } = this.props;
    const { query, inputValue } = this.state;
    return (
      <Wrapper>
        <Box style={{ position: 'relative' }} m="1rem auto" px="2rem" width={[1, 1, 1, 0.7]}>
          <Lead my={2}>{t('search:title')}</Lead>
          <Input focusOnMount placeholder={t('search:input-placeholder')} value={inputValue} onChange={this.onSearchQueryChange} />
          <SearchQuery query={query} />
        </Box>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: ReduxState): MapStateToProps => ({
  latestQuery: latestQueryFunc(state),
});

export default connect<CombinedProps, Props, any, any, any, Function>(mapStateToProps)(withTranslation('search')(SearchContainer));
