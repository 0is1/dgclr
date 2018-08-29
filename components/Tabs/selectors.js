import { get } from 'lodash/fp';

export const getActiveIndex = (state, ownProps) => {
  const tabData = get(['tabs', 'data', ownProps.id], state);
  if (tabData) return tabData.activeIndex;
  return false;
};

export default getActiveIndex;
