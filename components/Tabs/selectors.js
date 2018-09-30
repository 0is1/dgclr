// @flow
import { get } from 'lodash/fp';
import type { State } from 'lib/types';

export const getActiveIndex = (state: State, ownProps: { id: string }) => {
  const tabData = get(['tabs', 'data', ownProps.id], state);
  if (tabData) return tabData.activeIndex;
  return false;
};

export default getActiveIndex;
