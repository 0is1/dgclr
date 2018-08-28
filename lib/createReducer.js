/**
 * Avoid huge switch-case based reducers
 *
 * This
 *
 *     function reducer(state, action) {
 *         switch(action.type) {
 *         case OPEN:
 *             return {...state, open: true};
 *         case CLOSE:
 *             return {...state, open: false};
 *          default:
 *            return state;
 *         }
 *     }
 *
 * can be written as
 *
 *     const reducer = createReducer({
 *         [OPEN]: (state, action) => ({...state, open: true}),
 *         [CLOSE]: (state, action) => ({...state, open: false}),
 *     });
 *
 *
 * Signature is
 *
 * @param {Object} mapping - Mapping of actions to reducers
 *
 * or
 *
 * @param {String} action - Single action
 * @param {Function} reducer - Reducer for the single action
 *
 *
 * @return {Function} Reducer function
 */
export function createReducer(arg1, arg2, defaultState = null) {
  let mapping = null;

  if (typeof arg1 === 'string') {
    mapping = { [arg1]: arg2 };
  } else {
    mapping = arg1;
  }

  return (state = defaultState, action) => {
    const reducer = mapping[action.type];
    if (typeof reducer === 'function') {
      const res = reducer(state, action);
      if (typeof res === 'function') {
        return res(state);
      }
      return res;
    }

    return state;
  };
}

export default createReducer;
