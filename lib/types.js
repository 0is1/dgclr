// @flow
export type FilterData = [{ value: string, label: string }];

export type Layout = {
  name: string,
  holeCount: number,
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

export type Course = {
  _id: string,
  courseInfo: CourseInfo,
  name: string,
  description: string,
  locationInfo: {
    location: { coordinates: [] },
  },
  layouts: [Layout],
};

export type GraphQLData = {
  loading: Boolean,
  courseBySlug?: [Course],
  courseByName?: [Course],
  courses?: [Course],
};

export type State = {
  search: {
    advancedSearchOpen: boolean,
    advancedQueries: {
      basketType: FilterData,
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
