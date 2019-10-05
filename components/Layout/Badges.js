// @flow
import React from 'react';
import { Badge } from 'rebass';
import type { Node } from 'react';

type Props = {
  ratings: Array<string>,
  tiny?: boolean,
};

const LayoutRatingBadges = ({ ratings, tiny }: Props) => {
  const badges: Array<?Node> = ratings.map((rating, index) => {
    if (rating) {
      const key = `${rating}-${index}`;
      return tiny ? (
        <Badge mx="8px" py={0} key={key}>
          {rating}
        </Badge>
      ) : (
        <Badge key={key}>{rating}</Badge>
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
