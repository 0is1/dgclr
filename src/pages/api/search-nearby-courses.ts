import type { NextApiRequest, NextApiResponse } from 'next';
import request from 'graphql-request';
import { SEARCH_NEARBY_COURSES } from '../../graphql/queries';
import { SearchNearbyCourses } from '../../types';
import { getRequestHeaders } from '../../helpers/server-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchNearbyCourses>
) {
  const requestHeaders = getRequestHeaders();
  const { coordinates, maxDistance } = req.query;
  const parsedCoordinates: number[] = JSON.parse(coordinates as string);
  const result = await request(
    `${process.env.SERVER_URL}`,
    SEARCH_NEARBY_COURSES,
    {
      coordinates: parsedCoordinates,
      maxDistance: parseInt(maxDistance as string),
    },
    requestHeaders
  );
  return res.status(200).json(result as SearchNearbyCourses);
}
