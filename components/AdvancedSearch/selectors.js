// @flow
import { get } from 'lodash/fp';
import type { State } from 'lib/types';
import { MAP_DEFAULT_ZOOM } from 'lib/constants';

export const queryResultsFromState = (state: State, latestQuery: string) => get(['advancedSearch', 'queries', latestQuery], state) || [];

export const latestAdvancedQuery = (state: State) => get(['advancedSearch', 'advancedQueryHistory'], state)[0] || '';

export const isAllAdvancedSearchInputsOpen = (state: State) => get(['advancedSearch', 'allAdvancedSearchInputsOpen'], state) || false;

export const getFilterTypeData = (state: State, filterName: string) => get(['advancedSearch', 'advancedQueries', filterName], state) || [];

export const getCurrentAdvancedFilter = (state: State) => get(['advancedSearch', 'currentAdvancedFilter'], state) || '{}';

export const isAdvancedSearchMapVisible = (state: State) => get(['advancedSearch', 'advancedSearchMapVisible'], state);

export const getAdvancedMapZoom = (state: State) => get(['advancedSearch', 'advancedSearchMapZoom'], state) || MAP_DEFAULT_ZOOM;
