/* @flow */

import { Map } from 'immutable';

import { FAVORITE_MOVIE_REQUEST, FAVORITE_MOVIE_FAILURE, FAVORITE_MOVIE_SUCCESS } from './action';

const initialState = Map({
  type: '',
  payload: {},
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === FAVORITE_MOVIE_REQUEST) {
    const { loading, payload } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === FAVORITE_MOVIE_FAILURE) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  if (type === FAVORITE_MOVIE_SUCCESS) {
    const { payload, loading } = action;
    return state.updateIn(['type'], () => type).updateIn(['loading'], () => loading).setIn(['payload'], payload);
  }

  return state;
}

export default reducer;
