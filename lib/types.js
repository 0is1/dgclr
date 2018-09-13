// @flow
export type Layout = {
  name: string,
  holeCount: number,
  rating: string,
  totalPar: number,
  holes: [],
};

export type GraphQLData = {
  loading: Boolean,
  courseBySlug?: [],
  courseByName?: [],
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
