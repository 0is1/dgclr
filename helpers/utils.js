// @flow
import { uniq } from 'lodash';
import type { Layout, LocationInfo } from 'lib/types';
import matchAll from 'string.prototype.matchall';

/**
 * Convert links in text to <a href="">url</a> from first capture group
 * add "http://"-prefix if includeHttp is used
 * @param {String} text
 * @param {String} regex
 * @param {boolean} includeHttp
 * @return {String} links converted to <a>:s
 */
// eslint-disable-next-line max-len
export const removeLastCommaAndReturnLinkFromFirstCaptureGroup = (string: string, regex: any, includeHttp: boolean = false): string => string.replace(regex, (wholeMatch, group1) => {
  if (group1) {
    const includesLastDot = group1.endsWith('.');
    const returnString = includesLastDot ? group1.slice(0, -1) : group1;
    const hrefString = includeHttp ? `http://${returnString}` : returnString;
    return `<a href='${hrefString}'>${returnString}</a>${includesLastDot ? '.' : ''}`;
  }
  return '';
});

/**
 * Convert links in text to <a href="">url</a>
 * @param {String} text
 * @return {String} links converted to <a>:s
 */
export const LINK_REGEX = /((https?):\/\/[^\s/$.?#].[^\s)]*)/gim;
export const convertLinksToHtml = (string: string): string => removeLastCommaAndReturnLinkFromFirstCaptureGroup(string, LINK_REGEX);

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
export const uniqueLayoutRatings = (layouts: Array<Layout> = []): Array<string> => uniq(layouts.filter((layout) => layout && layout.rating).map((layout) => layout.rating));

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
export const isArrayWithLength = (array: ?Array<any>): boolean => Array.isArray(array) && array.length > 0;

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

export const WWW_REGEX = /(www\.[a-öA-Ö]*\.([a-öA-Ö]*)[/a-öA-Ö?&0-9=.]*)/gi;
const HTTP_REGEX = /(https?):\/\/([^\s/$.?#].[^\s<>'")]*)/gi;
/**
 * Convert text with only "www" to links in text to <a href="">url</a>
 * @param {String} text
 * @return {String} links converted to <a>:s
 */
export const convertWWWToHttpAndAddLinks = (string: string): string => {
  if (!isArrayWithLength(string.match(WWW_REGEX))) {
    return string;
  }
  const httpMatches = Array.from(matchAll(string, HTTP_REGEX));
  // console.log('httpMatches: ', httpMatches);
  const wwwMatches = Array.from(new Set(string.match(WWW_REGEX))).map((item) => (item.endsWith('.') ? item.slice(0, -1) : item));
  // console.log('wwwMatches: ', wwwMatches);
  if (isArrayWithLength(httpMatches) && isArrayWithLength(wwwMatches)) {
    let stringWithWWWLinks = string;
    const ignoredWWWTexts = httpMatches.map((matchArray) => {
      // www-match is second group => third item in the array
      const [, , wwwMatch] = matchArray;
      // Remove last dot if there is one
      return wwwMatch.endsWith('.') ? wwwMatch.slice(0, -1) : wwwMatch;
    });
    // console.log('ignoredWWWTexts: ', ignoredWWWTexts);
    // If this www.something.com is already wrapped with <a>, filter it out from wwwTextsWithoutLink
    const wwwTextsWithoutLink = wwwMatches.filter((www) => !ignoredWWWTexts.includes(www));
    // console.log('wwwTextsWithoutLink: ', wwwTextsWithoutLink);
    wwwTextsWithoutLink.forEach((wwwString) => {
      const regex = new RegExp(`(${wwwString})`, 'g');
      stringWithWWWLinks = stringWithWWWLinks.replace(regex, "<a href='http://$1'>$1</a>");
    });
    return stringWithWWWLinks;
  }
  return removeLastCommaAndReturnLinkFromFirstCaptureGroup(string, WWW_REGEX, true);
};
