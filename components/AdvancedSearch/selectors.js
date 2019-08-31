// @flow
import { get } from 'lodash/fp';
import type { State } from 'lib/types';
import { MAP_DEFAULT_ZOOM } from 'lib/constants';

export const queryResultsFromState = (state: State, latestQuery: string) => get(['advancedSearch', 'queries', latestQuery], state) || [];

export const latestAdvancedQuery = (state: State) => get(['advancedSearch', 'advancedQueryHistory'], state)[0] || '';

export const isAdvancedSearchOpen = (state: State) => get(['advancedSearch', 'advancedSearchOpen'], state);

export const getFilterTypeData = (state: State, filterName: string) => get(['advancedSearch', 'advancedQueries', filterName], state) || [];

export const getCurrentAdvancedFilter = (state: State) => get(['advancedSearch', 'currentAdvancedFilter'], state) || '{}';

export const isAdvancedSearchMapVisible = (state: State) => get(['advancedSearch', 'advancedSearchMapVisible'], state);

export const getAdvancedMapZoom = (state: State) => get(['advancedSearch', 'advancedSearchMapZoom'], state) || MAP_DEFAULT_ZOOM;
