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
  const [lng, lat] = coordinates;
  return parseFloat(lat) && parseFloat(lng) ? { lat, lng } : null;
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
// eslint-disable-next-line max-len
export const uniqueLayoutRatings = (layouts: Array<Layout> = []): Array<string> => uniq(layouts.filter(layout => layout && layout.rating).map(layout => layout.rating));

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

/**
 * Convert meters to kilometers
 * @param {Long} meters
 * @return {int}
 */
export const convertMetersToKilometers = (meters: number): number => parseInt(meters / 1000, 10) || 0;

/**
 * Convert kilometers to meters
 * @param {Long} kilometers
 * @return {int}
 */
export const convertKilometersToMeters = (kilometers: number): number => parseInt(kilometers * 1000, 10) || 0;

/**
 * Get course map url from layouts based on index
 * @param {Array} layouts
 * @return {string}
 */
export const getCourseMapUrlForLayout = (layouts: Array<Layout> = [], activeIndex: number): string => (layouts && layouts[activeIndex] && layouts[activeIndex].mapUrl) || '';
