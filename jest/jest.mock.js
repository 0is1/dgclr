jest.mock('next/router', () => ({
  query: '',
}));

const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementationOnce((success) => Promise.resolve(
    success({
      coords: {
        latitude: 60.190599999999996,
        longitude: 24.89741416931156,
      },
    }),
  )),
};

global.navigator.geolocation = mockGeolocation;
