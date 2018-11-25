/* @flow */


export const MOVIE_DETAIL_REQUEST = 'MOVIE_DETAIL_REQUEST';
export const MOVIE_DETAIL_SUCCESS = 'MOVIE_DETAIL_SUCCESS';
export const MOVIE_DETAIL_FAILURE = 'MOVIE_DETAIL_FAILURE';

export function success(payload) {
  return dispatch => {
    dispatch({
      type: MOVIE_DETAIL_SUCCESS,
      loading: false,
      payload,
    });
  };
}

export function failure(response) {
  return dispatch => {
    dispatch({
      type: MOVIE_DETAIL_FAILURE,
      loading: false,
      payload: response,
    });
  };
}

export default function get(movieId) {
  return dispatch => {
    dispatch({
      type: MOVIE_DETAIL_REQUEST,
      loading: true,
      payload: {
        movieId,
      },
    });
  };
}
