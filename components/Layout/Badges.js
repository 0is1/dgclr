// @flow
import React from 'react';
import { Badge } from 'rebass';
import { getRandomKey } from 'helpers/utils';

type Props = {
  ratings: [string],
  tiny?: boolean,
};

const LayoutRatingBadges = ({ ratings, tiny }: Props) => {
  const badges: any[] = ratings.map((rating) => {
    if (rating) {
      return tiny ? (
        <Badge mx="8px" py={0} key={getRandomKey()}>
          {rating}
        </Badge>
      ) : (
        <Badge key={getRandomKey()}>{rating}</Badge>
      );
    }
    return null;
  });
  return badges;
};

LayoutRatingBadges.defaultProps = {
  tiny: false,
};

export default LayoutRatingBadges;
