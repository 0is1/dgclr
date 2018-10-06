// @flow
import { uniq } from 'lodash';
import type { Layout, LocationInfo } from 'lib/types';
/**
 * Convert links in text to <a href="">url</a>
 * @param {String} text
 * @return {String} links converted to <a>:s
 */
export const convertLinksToHtml = (string: string): string => string.replace(/((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/gi, "<a href='$1'>$1</a>");

/**
 * Convert coordinates array to {lat, lng} object
 * @param {Array} coordinates
 * @return {Object} {lat, lng}
 */
export const convertCoordinatesToObject = (coordinates: Array<number> = []): ?{ lat: number, lng: number } => {
  const [lat, lng] = coordinates;
  return lat && lng ? { lat, lng } : null;
};

/**
 * Get address details
 * @param {Object} locationInfo
 * @return {String} address details
 */
export const courseAddressDetails = (locationInfo: LocationInfo) => {
  const { address, city, zip } = locationInfo || {};
  if (address && zip && city) return `${address}, ${zip} ${city}`;
  if (zip && city) return `${zip} ${city}`;
  return '';
};

/**
 * Get unique layout ratings
 * @param {Array} layouts
 * @return {Array} ratings as strings
 */
export const uniqueLayoutRatings = (layouts: Array<Layout> = []): Array<string> => uniq(layouts.map(layout => layout.rating));

/**
 * Get unique key id
 * @return {String} unique id
 */

export const getRandomKey = () => Math.random()
  .toString(36)
  .substring(2, 15)
  + Math.random()
    .toString(36)
    .substring(2, 15);

/**
 * Get page title
 * @param {String} text
 * @return {String} title
 */

export const getTitle = (text: ?string = null) => (text ? `DGCLR - ${text}` : 'DGCLR - Disc Golf Course Lists and Results');

/**
 * Are we in browser
 * @return {boolean}
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Is array with length
 * @param {Array} array
 * @return {boolean}
 */
export const isArrayWithLength = (array?: Array<any>): boolean => Array.isArray(array) && array.length > 0;
