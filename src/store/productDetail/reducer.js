/* @flow */

import { Map } from 'immutable';

import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAILURE, PRODUCT_DETAIL_SUCCESS } from './action';

const initialState = Map({
  type: '',
  payload: Map({}),
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === PRODUCT_DETAIL_REQUEST) {
    const { loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], Map({}));
  }

  if (type === PRODUCT_DETAIL_FAILURE) {
    const { loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], Map({}));
  }

  if (type === PRODUCT_DETAIL_SUCCESS) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], Map(payload));
  }

  return state;
}

export default reducer;
