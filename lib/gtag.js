const uuid4 = require('uuid4');

const { NODE_ENV } = process.env;

export const GA_TRACKING_ID = 'UA-124877413-1';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  // Track only in production
  if (NODE_ENV && NODE_ENV === 'production') {
    const uuid = uuid4();
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      custom_map: {
        dimension1: 'browser_id',
        dimension2: 'utc_millisecs',
      },
    });
    window.gtag('event', 'browser_id_dimension', { browser_id: uuid });
    window.gtag('event', 'utc_millisecs_dimension', { utc_millisecs: new Date().getTime() });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action, category, label, value,
}) => {
  // Track only in production
  if (NODE_ENV && NODE_ENV === 'production') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
