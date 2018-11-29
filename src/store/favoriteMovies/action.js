/* @flow */

import Get from '../../common/Get';

export const FAVORITE_MOVIES_REQUEST = 'FAVORITE_MOVIES_REQUEST';
export const FAVORITE_MOVIES_SUCCESS = 'FAVORITE_MOVIES_SUCCESS';
export const FAVORITE_MOVIES_FAILURE = 'FAVORITE_MOVIES_FAILURE';

export function success(payload) {
  return (dispatch) => {
    dispatch({
      type: FAVORITE_MOVIES_SUCCESS,
      loading: false,
      payload,
    });
  };
}

export function failure(response) {
  return dispatch => {
    dispatch({
      type: FAVORITE_MOVIES_FAILURE,
      loading: false,
      payload: response,
    });
  };
}

export default function set() {
  return (dispatch, getState) => {
    const movies = getState().getIn(['favoriteMovies']).toJS();
    const payload = Get(movies, 'payload');
    dispatch({
      type: FAVORITE_MOVIES_REQUEST,
      loading: true,
      payload,
    });
  };
}
