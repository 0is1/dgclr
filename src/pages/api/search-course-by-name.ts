import type { NextApiRequest, NextApiResponse } from "next";
import request from "graphql-request";
import { SEARCH_COURSES } from "../../graphql/queries";
import { SearchCourseByName } from "../../types";
import { getRequestHeaders } from "../../helpers/server-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchCourseByName>
) {
  const requestHeaders = getRequestHeaders();
  const { query } = req.query;
  const result = await request(
    `${process.env.SERVER_URL}`,
    SEARCH_COURSES,
    { query },
    requestHeaders
  );
  return res.status(200).json(result as SearchCourseByName);
}
