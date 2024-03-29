/**
 * Convert links in text to <a href="">url</a>

 */
export const LINK_REGEX = /((https?):\/\/[^\s/$.?#].[^\s)]*)/gim;
export const convertLinksToHtml = (string?: string): string =>
  string
    ? removeLastCommaAndReturnLinkFromFirstCaptureGroup(string, LINK_REGEX)
    : '';

/**
 * Is array with length
 */
export const isArrayWithLength = (array?: any, minLength = 1): boolean => {
  if (minLength > 1) {
    return Array.isArray(array) && array.length >= minLength;
  }
  return Array.isArray(array) && array.length > 0;
};

/**
 * Convert links in text to <a href="">url</a> from first capture group
 * add "http://"-prefix if includeHttp is used
 */
// eslint-disable-next-line max-len
export const removeLastCommaAndReturnLinkFromFirstCaptureGroup = (
  string: string,
  regex: RegExp,
  includeHttp = false
): string =>
  string.replace(regex, (wholeMatch, group1) => {
    if (group1) {
      const includesLastDot = group1.endsWith('.');
      const returnString = includesLastDot ? group1.slice(0, -1) : group1;
      const hrefString = includeHttp ? `http://${returnString}` : returnString;
      return `<a href='${hrefString}'>${returnString}</a>${
        includesLastDot ? '.' : ''
      }`;
    }
    return '';
  });

export const WWW_REGEX = /(www\.[a-öA-Ö]*\.([a-öA-Ö]*)[/a-öA-Ö?&0-9=.]*)/gi;
const HTTP_REGEX = /(https?):\/\/([^\s/$.?#].[^\s<>'")]*)/gi;
/**
 * Convert text with only "www" to links in text to <a href="">url</a>
 */
export const convertWWWToHttpAndAddLinks = (string: string): string => {
  if (!isArrayWithLength(string.match(WWW_REGEX))) {
    return string;
  }
  const httpMatches = Array.from(string.matchAll(HTTP_REGEX));
  // console.log('httpMatches: ', httpMatches);
  const wwwMatches = Array.from(new Set(string.match(WWW_REGEX))).map((item) =>
    item.endsWith('.') ? item.slice(0, -1) : item
  );
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
    const wwwTextsWithoutLink = wwwMatches.filter(
      (www) => !ignoredWWWTexts.includes(www)
    );
    // console.log('wwwTextsWithoutLink: ', wwwTextsWithoutLink);
    wwwTextsWithoutLink.forEach((wwwString) => {
      const regex = new RegExp(`(${wwwString})`, 'g');
      stringWithWWWLinks = stringWithWWWLinks.replace(
        regex,
        "<a href='http://$1'>$1</a>"
      );
    });
    return stringWithWWWLinks;
  }
  return removeLastCommaAndReturnLinkFromFirstCaptureGroup(
    string,
    WWW_REGEX,
    true
  );
};

export const getBrowserPrefersDarkMode = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

export const toggleDarkClassToBody = (useDarkTheme: boolean): void => {
  // toggle "dark" class on body
  const body = document.querySelector('body');
  if (body) {
    if (useDarkTheme) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }
};

export const allObjectKeysAreEmpty = (
  obj: Record<string, unknown>
): boolean => {
  return Object.keys(obj).every((key) => {
    if (typeof obj[key] === 'object') {
      return allObjectKeysAreEmpty(obj[key] as Record<string, unknown>);
    }
    return obj[key] === '';
  });
};

export const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  // round to 2 decimals
  return Math.round(d * 100) / 100;
};
