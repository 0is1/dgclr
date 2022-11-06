export const SERVER_URL = "https://dgclr-server.herokuapp.com/graphql";

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
  query CourseBySlugQuery($slug: String!) {
    courseBySlug(slug: $slug) {
      ${COURSE_QUERY}
    }
  }
`;
