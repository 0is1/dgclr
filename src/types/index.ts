export type CourseBySlug = {
  courseBySlug: Course[];
};

export type CoordinatesObject = { lat: number; lng: number };
export type FilterData = [{ value: string; label: string }];
export type SliderFilterData = number[];
export type MapFilterData = [
  { coordinates: CoordinatesObject; radius: string }
];

type HoleAverageLength = { foot: number; meter: number };

export type Hole = {
  par: number;
  length: HoleAverageLength;
};
export type Layout = {
  name: string;
  mapUrl: string;
  holeCount: number;
  holeAverageLength: HoleAverageLength;
  rating: string;
  totalPar: number;
  holes: Hole[];
};

export type CourseInfo = {
  surfaceShapeTypes: string[];
  teeType: string;
  infoSignType: string;
  basketType: string;
  mapUrl: string;
  courseTypes: string[];
  founded: string;
  maintenanceCycle: string;
  rangeMaster: string;
  courseDesigner: string;
  fee: {
    amount: string;
    currency: string;
    value: string;
  };
};
export type LocationInfo = {
  location: { coordinates: number[] };
  address: string | null;
  city: string | null;
  zip: string | null;
};

export type Course = {
  _id: string;
  courseInfo: CourseInfo;
  name: string;
  slug: string;
  description: string;
  locationInfo: LocationInfo;
  layouts: Layout[];
};

export type GraphQLData = {
  loading: Boolean;
  courseBySlug?: Course[];
  courseByName?: Course[];
  courses?: Course[];
};
export type QueryResults = { [key: string]: Course[] };
export type Courses = {
  [key: string]: Course;
};

export type State = {
  advancedSearch: {
    allAdvancedSearchInputsOpen: boolean;
    queries: QueryResults;
    advancedQueries: {
      basketType: FilterData;
      courseTypes: FilterData;
      holeAverageLength: SliderFilterData;
      rating: FilterData;
      surfaceShapeTypes: FilterData;
      teeType: FilterData;
    };
    advancedQueryHistory: string[];
    currentAdvancedFilter: string;
    advancedSearchMapVisible: boolean;
    advancedSearchMapZoom: number;
  };
  courses: Courses;
  search: {
    queries: QueryResults;
    queryHistory: string[];
    error: boolean;
  };
  tabs: {
    data: {
      [key: string]: {
        id: string;
        activeIndex: number;
      };
    };
  };
};

export type Event = {
  target: {
    value: string;
  };
};

export type CourseForMap = {
  id: string;
  name: string;
  slug: string;
  address: string;
  coordinates: CoordinatesObject | null;
};
