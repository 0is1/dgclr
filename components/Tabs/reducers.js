import { updateIn } from 'updeep';
import { createReducer } from 'lib/createReducer';
import { actionTypes } from './actions';

export const initialState = {
  data: {},
};

const reducer = createReducer({
  [actionTypes.SET_TABS]: (state, action) => {
    const { id, activeIndex } = action;
    return updateIn(['data', id], { id, activeIndex }, state);
  },
});

export default reducer;
