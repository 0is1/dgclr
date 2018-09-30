// @flow
import { get } from 'lodash/fp';
import type { State } from 'lib/types';

export const courseBySlugFromState = (state: State, ownProps: { slug: string }) => get(['search', 'courses', ownProps.slug], state) || {};

export default courseBySlugFromState;
