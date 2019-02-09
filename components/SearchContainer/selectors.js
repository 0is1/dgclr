// @flow
import { get } from 'lodash/fp';
import type { State } from 'lib/types';

export const queryResultsFromState = (state: State, latestQuery: string) => get(['search', 'queries', latestQuery], state) || [];

export const latestQuery = (state: State) => get(['search', 'queryHistory'], state)[0] || '';

export const latestAdvancedQuery = (state: State) => get(['search', 'advancedQueryHistory'], state)[0] || '';

export const isAdvancedSearchOpen = (state: State) => get(['search', 'advancedSearchOpen'], state);

export const getFilterTypeData = (state: State, filterName: string) => get(['search', 'advancedQueries', filterName], state) || [];

export const getCurrentAdvancedFilter = (state: State) => get(['search', 'currentAdvancedFilter'], state) || '{}';

export const isAdvancedSearchMapVisible = (state: State) => get(['search', 'advancedSearchMapVisible'], state);
