// @flow
import { get } from 'lodash/fp';
import type { State } from 'lib/types';

export const queryResultsFromState = (state: State, latestQuery: string) => get(['search', 'queries', latestQuery], state) || [];

export const latestQuery = (state: State) => get(['search', 'queryHistory'], state)[0] || '';
