import { get } from 'lodash/fp';

export const courseBySlugFromState = (state, ownProps) => get(['search', 'courses', ownProps.slug], state) || {};

export default courseBySlugFromState;
