// @flow
/**
 * Get current location
 * @return {Object} position object or error
 */

// eslint-disable-next-line import/prefer-default-export
export const getCurrentLocation = (getCurrentPositionSuccess, getCurrentPositionError) => {
  try {
    if (!navigator) return null;
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };
    return navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess, getCurrentPositionError, options);
  } catch (e) {
    console.error('getCurrentPosition error: ', e);
    throw e;
  }
};
