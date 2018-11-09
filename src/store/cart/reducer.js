/* @flow */

import { Map, List } from 'immutable';

import { SET_CART } from './action';

const initialState = Map({
  type: '',
  payload: List([]),
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === SET_CART) {
    const { payload } = action;
    return state.updateIn(['type'], () => type).setIn(['payload'], List(payload));
  }

  return state;
}

export default reducer;
