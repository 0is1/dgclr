// @flow
import type { LatLngFunctions } from 'components/Map/types';

/**
 * Get current location
 * @param {Function} getCurrentPositionSuccess
 * @param {Function} getCurrentPositionError
 * @return {Object} position object or error
 */

export const getCurrentLocation = (getCurrentPositionSuccess: Function, getCurrentPositionError: Function) => {
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

/**
 * Valdiate coordinates from Google Map
 * @param {Object} coordinates object
 * @return {boolean}
 */
export const validateCoordsFromMap = (coords: LatLngFunctions) => {
  if (coords && typeof coords.lat === 'function' && typeof coords.lng === 'function') {
    return true;
  }
  return false;
};
