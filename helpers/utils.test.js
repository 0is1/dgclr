/* eslint-env jest */
import { mockCourses } from 'jest/mockData';
import {
  convertCoordinatesToObject,
  convertKilometersToMeters,
  convertLinksToHtml,
  convertMetersToKilometers,
  courseAddressDetails,
  getCourseMapUrlForLayout,
  getRandomKey,
  getTitle,
  isArrayWithLength,
  uniqueLayoutRatings,
} from './utils';

describe('Utils', () => {
  describe('convertLinksToHtml', () => {
    it('convert urls to html links', () => {
      const result = convertLinksToHtml(mockCourses[0].description);
      expect(result).toBeDefined();
      expect(result).toEqual(expect.stringMatching('<a href='));
    });
    it("doesn't convert string without urls to html links", () => {
      const result = convertLinksToHtml(mockCourses[1].description);
      expect(result).toBeDefined();
      expect(result).toEqual(expect.not.stringMatching('<a href='));
      expect(result).toEqual(mockCourses[1].description);
    });
  });
  describe('convertCoordinatesToObject', () => {
    it('convert coordinates to object', () => {
      const result = convertCoordinatesToObject(mockCourses[0].locationInfo.location.coordinates);
      expect(result).toBeDefined();
      const expected = {
        lat: mockCourses[0].locationInfo.location.coordinates[1],
        lng: mockCourses[0].locationInfo.location.coordinates[0],
      };
      expect(result).toEqual(expected);
    });
    it('return null without param', () => {
      const result = convertCoordinatesToObject();
      expect(result).toEqual(null);
    });
    it('return null with invalid param', () => {
      const result = convertCoordinatesToObject([{}, 'invalid']);
      expect(result).toEqual(null);
    });
  });
  describe('courseAddressDetails', () => {
    it('return course address details string', () => {
      const result = courseAddressDetails(mockCourses[0].locationInfo);
      const expected = 'Puolarmaari 12, 02210 Espoo';
      expect(result).toBeDefined();
      expect(result).toEqual(expected);
    });
    it('return course address details string without address', () => {
      const result = courseAddressDetails({ city: 'Mäyry', zip: '63130' });
      const expected = '63130 Mäyry';
      expect(result).toBeDefined();
      expect(result).toEqual(expected);
    });
    it('return empty string', () => {
      const result = courseAddressDetails({ zip: '02200' });
      expect(result).toBeDefined();
      expect(result).toEqual('');
    });
  });
  describe('uniqueLayoutRatings', () => {
    it('return layout rating', () => {
      const result = uniqueLayoutRatings(mockCourses[0].layouts);
      expect(result).toBeDefined();
      expect(result).toEqual(['A1']);
    });
    it('return layout ratings', () => {
      const result = uniqueLayoutRatings(mockCourses[1].layouts);
      expect(result).toBeDefined();
      expect(result).toEqual(['AA1', 'AAA1', 'B1']);
    });
    it('return empty array without param', () => {
      const result = uniqueLayoutRatings();
      expect(result).toBeDefined();
      expect(result).toEqual([]);
    });
    it('return empty array with invalid param', () => {
      const result = uniqueLayoutRatings([null, null]);
      expect(result).toBeDefined();
      expect(result).toEqual([]);
    });
  });
  describe('getRandomKey', () => {
    it('return random key', () => {
      const result = getRandomKey();
      expect(result).toBeDefined();
    });
  });
  describe('getTitle', () => {
    it('get default title', () => {
      const result = getTitle();
      expect(result).toEqual('DGCLR - Disc Golf Course Lists and Results');
    });
    it('get title with value', () => {
      const value = 'Hello from tests!';
      const result = getTitle(value);
      expect(result).toEqual(`DGCLR - ${value}`);
    });
  });
  describe('isArrayWithLength', () => {
    it('return true', () => {
      const result = isArrayWithLength([1]);
      expect(result).toEqual(true);
    });
    it('return false', () => {
      const result = isArrayWithLength([]);
      expect(result).toEqual(false);
    });
    it('return false', () => {
      const result = isArrayWithLength();
      expect(result).toEqual(false);
    });
  });
  describe('convertMetersToKilometers', () => {
    it('return positive integer', () => {
      expect(convertMetersToKilometers(2000)).toEqual(2);
      expect(convertMetersToKilometers(1200.5)).toEqual(1);
    });
    it('return zero', () => {
      const result = convertMetersToKilometers([]);
      expect(result).toEqual(0);
    });
  });
  describe('getCourseMapUrlForLayout ', () => {
    it('return mapUrl from index 0', () => {
      const result = getCourseMapUrlForLayout(mockCourses[0].layouts, 0);
      expect(result).toEqual('https://frisbeegolfradat.fi/files/2017/10/puolarmaarin_espoo_ratakartta_2017.jpg');
    });
    it('return mapUrl from index 2', () => {
      const result = getCourseMapUrlForLayout(mockCourses[1].layouts, 2);
      expect(result).toEqual('https://frisbeegolfradat.fi/files/2017/10/kartanogolf_ratakartta_2017.jpg');
    });
    it('return empty string from undefined index', () => {
      const result = getCourseMapUrlForLayout(mockCourses[0].layouts, 1);
      expect(result).toEqual('');
    });
  });
  describe('convertKilometersToMeters', () => {
    it('return positive integer', () => {
      expect(convertKilometersToMeters(1)).toEqual(1000);
      expect(convertKilometersToMeters(0.5)).toEqual(500);
      expect(convertKilometersToMeters(2.5)).toEqual(2500);
    });
    it('return zero', () => {
      expect(convertKilometersToMeters([])).toEqual(0);
      expect(convertKilometersToMeters({})).toEqual(0);
      expect(convertKilometersToMeters(null)).toEqual(0);
      expect(convertKilometersToMeters(0)).toEqual(0);
      expect(convertKilometersToMeters(undefined)).toEqual(0);
    });
  });
});
