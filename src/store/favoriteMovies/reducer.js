/* @flow */

import { Map } from 'immutable';

import { FAVORITE_MOVIES_REQUEST, FAVORITE_MOVIES_FAILURE, FAVORITE_MOVIES_SUCCESS } from './action';

const initialState = Map({
  type: '',
  payload: {},
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === FAVORITE_MOVIES_REQUEST) {
    const { loading, payload } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === FAVORITE_MOVIES_FAILURE) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === FAVORITE_MOVIES_SUCCESS) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  return state;
}

export default reducer;
