import type { NextApiRequest, NextApiResponse } from "next";
import request from "graphql-request";
import { getRequestHeaders } from "../../helpers/server-utils";
import { SEARCH_COURSE } from "../../graphql/queries";
import { SearchCourseBySlug } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchCourseBySlug>
) {
  const { slug } = req.query;
  const requestHeaders = getRequestHeaders();
  const result = await request(
    `${process.env.SERVER_URL}`,
    SEARCH_COURSE,
    { slug },
    requestHeaders
  );
  return res.status(200).json(result);
}
