// @flow
export const actionTypes = {
  SET_TABS: 'DGCLR_SET_TABS',
};

/**
 * Set tabbar data
 * @param {String} id of tabs
 * @param {Int} activeIndex of tabs
 * @return {Object} action of SET_TABS
 */
export const setTabs = (id: string, activeIndex: number) => ({
  type: actionTypes.SET_TABS,
  id,
  activeIndex,
});
