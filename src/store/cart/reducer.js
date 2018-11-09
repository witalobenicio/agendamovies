/* @flow */

import { Map, List } from 'immutable';

import { CART_REQUEST, CART_SUCCESS, CART_FAILURE } from './action';

const initialState = Map({
  type: '',
  payload: List([]),
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === CART_REQUEST) {
    return state.updateIn(['type'], () => type).setIn(['payload'], List([]));
  }

  if (type === CART_SUCCESS) {
    const { payload } = action;
    return state.updateIn(['type'], () => type).setIn(['payload'], List(payload));
  }

  if (type === CART_FAILURE) {
    const { payload, error } = action;
    return state.updateIn(['type'], () => type).updateIn(['error'], () => error).setIn(['payload'], List(payload));
  }

  return state;
}

export default reducer;
