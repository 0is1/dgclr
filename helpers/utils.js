import { uniq } from 'lodash';

/**
 * Convert links in text to <a href="">url</a>
 * @param {String} text
 * @return {String} links converted to <a>:s
 */
export const convertLinksToHtml = string => string.replace(/((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/gi, "<a href='$1'>$1</a>");

/**
 * Convert coordinates array to {lat, lng} object
 * @param {Array} coordinates
 * @return {Object} {lat, lng}
 */
export const convertCoordinatesToObject = (coordinates = []) => {
  const [lat, lng] = coordinates;
  return lat && lng ? { lat, lng } : false;
};

/**
 * Get address details
 * @param {Object} locationInfo
 * @return {String} address details
 */
export const courseAddressDetails = (locationInfo = {}) => {
  const { address, city, zip } = locationInfo;
  if (address) return `${address}, ${zip} ${city}`;
  return `${zip} ${city}`;
};

/**
 * Get unique layout ratings
 * @param {Array} layouts
 * @return {Array} ratings as strings
 */
export const uniqueLayoutRatings = (layouts = []) => uniq(layouts.map(layout => layout.rating));

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

export const getTitle = (text = false) => (text ? `DGCLR - ${text}` : 'DGCLR - Disc Golf Course Lists and Results');
