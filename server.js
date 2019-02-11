require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const next = require('next');
// const Raven = require("raven");
const faviconShortCircuit = require('express-favicon-short-circuit');
const LRUCache = require('lru-cache');
const favicon = require('serve-favicon');
const path = require('path');
const forceDomain = require('forcedomain');

// Must configure Raven before doing anything else with it
// Raven.config(process.env.RAVEN_URL).install();

if (!process.env.PORT) {
  process.env.PORT = process.env.NODE_ENV !== 'production' ? 3000 : 8081;
}

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 5, // 5 min
});
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const staticOptions = {
  root: `${__dirname}/static/`,
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8',
  },
};

/* Make sure to modify this to take into account anything that should
trigger an immediate page change (e.g a locale stored in req.session) */
function getCacheKey(req) {
  return `${req.url}`;
}

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}

app
  .prepare()
  .then(() => {
    const server = express();
    // The request handler must be the first middleware on the app
    // server.use(Raven.requestHandler());
    if (process.env.NODE_ENV !== 'production') {
      server.use(faviconShortCircuit);
    }
    // Use force https in production
    if (process.env.NODE_ENV === 'production') {
      server.use(
        forceDomain({
          hostname: 'www.dgclr.fi',
          protocol: 'https',
        }),
      );
    }
    // disable 'X-Powered-By' header in response
    server.disable('x-powered-by');
    server.use(bodyParser.json({ limit: '50mb' }));
    server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    server.use(
      session({
        secret: process.env.SESSION_SECRET || 'super-secret-key',
        resave: false, // do not automatically write to the session store
        saveUninitialized: false, // saved new sessions
        cookie: {
          httpOnly: true,
          maxAge: 86400000,
        }, // configure when sessions expires (24h)
      }),
    );
    server.use(express.static('static'));
    server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
    server.get('/health-check', (req, res) => {
      res.status(200);
      res.json({ result: true });
    });

    server.get('/*.txt', (req, res) => res.status(200).sendFile(req.path, staticOptions));

    // Use the `renderAndCache` utility defined below to serve pages
    server.get('/info', (req, res) => {
      renderAndCache(req, res, '/info');
    });
    server.get('/course', (req, res) => {
      res.redirect('/');
    });
    server.get('/:slug', (req, res) => {
      const actualPage = '/course';
      const queryParams = {
        slug: req.params.slug,
      };
      renderAndCache(req, res, actualPage, queryParams);
    });
    server.get('/', (req, res) => {
      renderAndCache(req, res, '/');
    });
    server.get('*', (req, res) => handle(req, res));
    // The error handler must be before any other error middleware
    // server.use(Raven.errorHandler());
    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
