/* @flow */

import { Map, List } from 'immutable';

import { PRODUCTS_REQUEST, PRODUCTS_FAILURE, PRODUCTS_SUCCESS } from './action';

const initialState = Map({
  type: '',
  payload: List([]),
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === PRODUCTS_REQUEST) {
    const { loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], []);
  }

  if (type === PRODUCTS_FAILURE) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === PRODUCTS_SUCCESS) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  return state;
}

export default reducer;
