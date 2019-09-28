import { validateCoordsFromMap } from './geolocation';

describe('geolocation tests', () => {
  describe('validateCoordsFromMap', () => {
    it('Return true', () => {
      expect(validateCoordsFromMap({ lat: jest.fn(), lng: jest.fn() })).toEqual(true);
    });
    it('Return false', () => {
      expect(validateCoordsFromMap()).toEqual(false);
      expect(validateCoordsFromMap({})).toEqual(false);
      expect(validateCoordsFromMap({ lat: jest.fn() })).toEqual(false);
      expect(validateCoordsFromMap({ lat: null, lng: null })).toEqual(false);
    });
  });
});
