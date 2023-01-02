import type { NextApiRequest, NextApiResponse } from 'next';
import request from 'graphql-request';
import { SEARCH_COURSES } from '../../graphql/queries';
import { SearchCourses } from '../../types';
import { getRequestHeaders } from '../../helpers/server-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchCourses>
) {
  const requestHeaders = getRequestHeaders();
  const { filter: filterString, limit } = req.query;
  const limitNumber = parseInt(limit as string, 10);
  const filter = JSON.parse(filterString as string);
  const result = await request(
    `${process.env.SERVER_URL}`,
    SEARCH_COURSES,
    { filter, limit: limitNumber, skip: 0 },
    requestHeaders
  );
  return res.status(200).json(result as SearchCourses);
}
