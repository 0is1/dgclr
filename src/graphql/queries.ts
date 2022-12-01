export const SERVER_URL =
  "https://0duxpicyxf.execute-api.eu-central-1.amazonaws.com/graphql";

export const COURSE_QUERY = `
_id
name
description
slug
courseInfo {
  basketType
  teeType
  infoSignType
  surfaceShapeTypes
  courseTypes
  mapUrl
  founded
  maintenanceCycle
  rangeMaster
  courseDesigner
  fee {
    amount
    currency
    value
  }
}
locationInfo {
  address
  city
  zip
  location {
    coordinates
  }
}
layouts {
  name
  mapUrl
  rating
  holes {
    par
    length {
      foot
      meter
    }
  }
  holeAverageLength {
    foot
    meter
  }
  holeCount
  totalPar
}
`;

export const SEARCH_COURSE = `
  query SearchCourseBySlugQuery($slug: String!) {
    courseBySlug(slug: $slug) {
      ${COURSE_QUERY}
    }
  }
`;

export const SEARCH_COURSES = `
query CoursesQuery($query: String!) {
  courseByName(query: $query) {
    ${COURSE_QUERY}
  }
}
`;
