// @flow
import React, { Component } from 'react';
import { Box, Text } from 'rebass';
import { omit } from 'lodash';
import RatingSelect from 'components/SearchContainer/RatingSelect';
import BasketTypeSelect from 'components/SearchContainer/BasketTypeSelect';

type Props = { onChange: Function };
type State = { filter: {} };

class AdvancedSearchInputs extends Component<Props, State> {
  state = {
    filter: {},
  };

  onRatingChange = (rating: []) => {
    console.log('onRatingChange: ', rating);
    const { onChange } = this.props;
    const { filter } = this.state;
    console.log('onRatingChange filter: ', filter);
    const newFilter = rating.length > 0 ? { ...filter, rating } : omit(filter, ['rating']);
    console.log('newFilter: ', newFilter);
    onChange(newFilter);
    this.setState({ filter: newFilter });
  };

  onBasketTypeChange = (basketType: string) => {
    const { onChange } = this.props;
    const { filter } = this.state;
    console.log('onBasketTypeChange filter: ', filter);
    const newFilter = { ...filter, courseInfo: { basketType } };
    console.log('newFilter: ', newFilter);
    onChange(newFilter);
    this.setState({ filter: newFilter });
  };

  render() {
    return (
      <Box width={['100%', '100%', '100%', '50%']}>
        <Text fontWeight="700" mb={2}>
          Edistynyt haku
        </Text>
        <RatingSelect onChange={this.onRatingChange} />
        <BasketTypeSelect onChange={this.onBasketTypeChange} />
      </Box>
    );
  }
}

export default AdvancedSearchInputs;
