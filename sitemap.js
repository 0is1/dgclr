const fetch = require('isomorphic-unfetch');
// eslint-disable-next-line import/no-self-import
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

const coursesContainsData = (courses) => Array.isArray(courses) && courses.length > 0;

const getCourses = () => fetch('https://dgclr-server.herokuapp.com/graphql', {
  method: 'POST',
  body: JSON.stringify({ query: '{courses {slug}}', variables: {} }),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.statusText);
  }) // expecting a json response
  .then((json) => {
    const { data } = json;
    if (data && coursesContainsData(data.courses)) {
      return data.courses;
    }
    return [];
  })
  .catch((e) => {
    throw e;
  });

const CACHE_TIME_MS = 1000 * 60 * 60 * 24; // 24 h - cache purge period

let sitemap;

const setup = async () => {
  // If cache is valid, just return sitemap
  if (sitemap) {
    return sitemap;
  }

  const smStream = new SitemapStream({ hostname: 'https://dgclr.fi', cacheTime: CACHE_TIME_MS });
  const pipeline = smStream.pipe(createGzip());

  const courses = await getCourses();
  // If we get courses data, add it dynamically to sitemap
  if (coursesContainsData(courses)) {
    for (let i = 0; i < courses.length; i += 1) {
      const course = courses[i];
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
  return sitemap;
};

module.exports = setup;
