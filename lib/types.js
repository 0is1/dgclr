// @flow

export type CoordinatesObject = { lat: number, lng: number };
export type FilterData = [{ value: string, label: string }];
export type SliderFilterData = Array<?number>;
export type MapFilterData = [
  { coordinates: CoordinatesObject, radius: string }
];

type HoleAverageLength = { foot: number, meter: number };

export type Layout = {
  name: string,
  mapUrl: string,
  holeCount: number,
  holeAverageLength: HoleAverageLength,
  rating: string,
  totalPar: number,
  holes: [],
};

export type CourseInfo = {
  surfaceShapeTypes: [string],
  teeType: string,
  infoSignType: string,
  basketType: string,
  mapUrl: string,
  courseTypes: [string],
  founded: string,
  maintenanceCycle: string,
  rangeMaster: string,
  courseDesigner: string,
  fee: {
    amount: string,
    currency: string,
    value: string,
  },
};
export type LocationInfo = {
  location: { coordinates: Array<number> },
  address: ?string,
  city: ?string,
  zip: ?string,
};

export type Course = {
  _id: string,
  courseInfo: CourseInfo,
  name: string,
  slug: string,
  description: string,
  locationInfo: LocationInfo,
  layouts: Array<Layout>,
};

export type GraphQLData = {
  loading: Boolean,
  courseBySlug?: Array<Course>,
  courseByName?: Array<Course>,
  courses?: Array<Course>,
};

export type State = {
  search: {
    advancedSearchOpen: boolean,
    advancedQueries: {
      basketType: FilterData,
      courseTypes: FilterData,
      holeAverageLength: SliderFilterData,
      rating: FilterData,
      surfaceShapeTypes: FilterData,
      teeType: FilterData,
    },
    advancedQueryHistory: Array<string>,
    currentAdvancedFilter: string,
    courses: {
      [key: string]: Course,
    },
    queries: { [key: string]: Array<Course> },
    queryHistory: Array<string>,
    error: boolean,
  },
  tabs: {
    data: {
      [key: string]: {
        id: string,
        activeIndex: number,
      },
    },
  },
};

export type Event = {
  target: {
    value: string,
  },
};

export type CourseForMap = {
  id: string,
  name: string,
  slug: string,
  address: string,
  coordinates: ?CoordinatesObject,
};
