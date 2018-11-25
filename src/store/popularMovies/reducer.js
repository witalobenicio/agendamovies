/* @flow */

import { Map } from 'immutable';

import { POPULAR_MOVIES_REQUEST, POPULAR_MOVIES_FAILURE, POPULAR_MOVIES_SUCCESS } from './action';

const initialState = Map({
  type: '',
  payload: {
    results: [],
  },
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === POPULAR_MOVIES_REQUEST) {
    const { loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], { results: [] });
  }

  if (type === POPULAR_MOVIES_FAILURE) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === POPULAR_MOVIES_SUCCESS) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  return state;
}

export default reducer;
