/* @flow */

import { Map } from 'immutable';

import { MOVIE_DETAIL_REQUEST, MOVIE_DETAIL_FAILURE, MOVIE_DETAIL_SUCCESS } from './action';

const initialState = Map({
  type: '',
  payload: Map({}),
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === MOVIE_DETAIL_REQUEST) {
    const { loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], Map({}));
  }

  if (type === MOVIE_DETAIL_FAILURE) {
    const { loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], Map({}));
  }

  if (type === MOVIE_DETAIL_SUCCESS) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], Map(payload));
  }

  return state;
}

export default reducer;
