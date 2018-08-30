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
