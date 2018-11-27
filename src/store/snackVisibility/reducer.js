/* @flow */

import { Map } from 'immutable';

import { SNACK_VISIBILITY } from './action';

const initialState = Map({
  type: SNACK_VISIBILITY,
  payload: Map({
    message: '',
    visibility: false,
  }),
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === SNACK_VISIBILITY) {
    const { payload } = action;
    return state.updateIn(['type'], () => type).setIn(['payload'], Map(payload));
  }

  return state;
}

export default reducer;
