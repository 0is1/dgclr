import { get } from 'lodash/fp';

export const queryResultsFromState = (state, latestQuery) => get(['search', 'queries', latestQuery], state) || [];

export const latestQuery = state => get(['search', 'queryHistory'], state)[0] || '';

export const latestAdvancedQuery = state => get(['search', 'advancedQueryHistory'], state)[0] || '';

export const latestQueryLike = (state, query) => get(['search', 'queryHistory', query], state) || '';

export const isAdvancedSearchOpen = state => get(['search', 'advancedSearchOpen'], state);

export const getFilterTypeData = (state, filterName) => get(['search', 'advancedQueries', filterName], state) || [];

export const getCurrentAdvancedFilter = state => get(['search', 'currentAdvancedFilter'], state) || '{}';
