import { get } from 'lodash/fp';

export const queryResultsFromState = (state, latestQuery) => get(['search', 'queries', latestQuery], state) || [];

export const latestQuery = state => get(['search', 'queryHistory'], state)[0] || '';
