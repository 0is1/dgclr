const fetch = require('node-fetch');
const sm = require('sitemap');

const coursesContainsData = courses => Array.isArray(courses) && courses.length > 0;

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

const sitemap = sm.createSitemap({
  hostname: 'https://dgclr.fi',
  cacheTime: CACHE_TIME_MS,
});

// For now, lets use just in "memory cache" to check if courses data is fetched
const inMemoryCache = { timestamp: 0 };

const setup = async () => {
  const useCache = sitemap.isCacheValid() && inMemoryCache.timestamp > 0;
  // If cache is valid, just return sitemap
  if (useCache) {
    return sitemap;
  }
  const courses = await getCourses();
  if (!useCache) {
    inMemoryCache.timestamp = Date.now();
  }
  // If we get courses data, add it dynamically to sitemap
  if (coursesContainsData(courses)) {
    for (let i = 0; i < courses.length; i += 1) {
      const course = courses[i];
      sitemap.add({
        url: `/${course.slug}`,
        changefreq: 'monthly',
        priority: 1,
      });
    }
  }
  // Add also pages
  sitemap.add({
    url: '/',
    changefreq: 'monthly',
    priority: 0.6,
  });
  // Add also pages
  sitemap.add({
    url: '/advanced_search',
    changefreq: 'monthly',
    priority: 0.6,
  });
  // Add also pages
  sitemap.add({
    url: '/info',
    changefreq: 'monthly',
    priority: 0.9,
  });
  return sitemap;
};

module.exports = setup;
