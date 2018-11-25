/* @flow */

import { Map } from 'immutable';

import { TRENDING_MOVIES_REQUEST, TRENDING_MOVIES_FAILURE, TRENDING_MOVIES_SUCCESS } from './action';

const initialState = Map({
  type: '',
  payload: {
    results: [],
  },
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === TRENDING_MOVIES_REQUEST) {
    const { loading, payload } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === TRENDING_MOVIES_FAILURE) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === TRENDING_MOVIES_SUCCESS) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  return state;
}

export default reducer;
