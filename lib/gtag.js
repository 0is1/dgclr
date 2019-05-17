const uuid4 = require('uuid4');

export const GA_TRACKING_ID = 'UA-124877413-1';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  const uuid = uuid4();
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
    dimension1: uuid,
    dimension2: new Date().getTime(),
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action, category, label, value,
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
