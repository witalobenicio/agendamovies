/* @flow */

import { Map } from 'immutable';

import { SEARCH_MOVIES_REQUEST, SEARCH_MOVIES_FAILURE, SEARCH_MOVIES_SUCCESS } from './action';

const initialState = Map({
  type: '',
  payload: {
    results: [],
  },
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === SEARCH_MOVIES_REQUEST) {
    const { loading, payload } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === SEARCH_MOVIES_FAILURE) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === SEARCH_MOVIES_SUCCESS) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  return state;
}

export default reducer;
