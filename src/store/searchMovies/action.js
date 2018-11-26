/* @flow */

import { Get } from '~/common';

export const SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST';
export const SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS';
export const SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE';

export function success(payload) {
  return (dispatch) => {
    dispatch({
      type: SEARCH_MOVIES_SUCCESS,
      loading: false,
      payload: {
        ...payload,
        results: payload.results,
      },
    });
  };
}

export function failure(response) {
  return dispatch => {
    dispatch({
      type: SEARCH_MOVIES_FAILURE,
      loading: false,
      payload: response,
    });
  };
}

export default function get(query) {
  return (dispatch, getState) => {
    const movies = getState().getIn(['searchMovies']).toJS();
    const payload = Get(movies, 'payload');
    dispatch({
      type: SEARCH_MOVIES_REQUEST,
      loading: true,
      payload,
      data: {
        query,
      },
    });
  };
}
