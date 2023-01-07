import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import type { NextApiRequest, NextApiResponse } from 'next';
import request from 'graphql-request';
import { getRequestHeaders } from '../../helpers/server-utils';
import { GET_ALL_COURSE_SLUGS } from '../../graphql/queries';

let sitemap: Buffer | undefined;

type CourseSlug = {
  slug: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  // set response header
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Content-Encoding', 'gzip');
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap);
    return;
  }
  const requestHeaders = getRequestHeaders();
  const result = await request(
    `${process.env.SERVER_URL}`,
    GET_ALL_COURSE_SLUGS,
    {},
    requestHeaders
  );
  const smStream = new SitemapStream({
    hostname: 'https://frisbeegolfrata.info',
  });
  const pipeline = smStream.pipe(createGzip());
  if (result?.courses?.length > 0) {
    const { courses } = result;
    for (let i = 0; i < courses.length; i += 1) {
      const course: CourseSlug = courses[i];
      smStream.write({
        url: `/${course.slug}`,
        changefreq: 'monthly',
        priority: 1,
      });
    }
  }

  // Add also pages
  smStream.write({
    url: '/',
    changefreq: 'monthly',
    priority: 0.6,
  });
  // Add also pages
  smStream.write({
    url: '/advanced_search',
    changefreq: 'monthly',
    priority: 0.6,
  });
  // Add also pages
  smStream.write({
    url: '/info',
    changefreq: 'monthly',
    priority: 0.9,
  });
  smStream.end();
  // cache the response
  const newSitemap = await streamToPromise(pipeline).then((sm) => sm);
  sitemap = newSitemap;
  res.send(sitemap);
}
