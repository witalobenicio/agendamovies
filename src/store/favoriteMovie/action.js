/* @flow */

export const FAVORITE_MOVIE_REQUEST = 'FAVORITE_MOVIE_REQUEST';
export const FAVORITE_MOVIE_SUCCESS = 'FAVORITE_MOVIE_SUCCESS';
export const FAVORITE_MOVIE_FAILURE = 'FAVORITE_MOVIE_FAILURE';

import getFavoriteMovies from '~/store/favoriteMovies/action';

export function success(payload) {
  return (dispatch) => {
    dispatch({
      type: FAVORITE_MOVIE_SUCCESS,
      loading: false,
      payload,
    });
    dispatch(getFavoriteMovies());
  };
}

export function failure(response) {
  return dispatch => {
    dispatch({
      type: FAVORITE_MOVIE_FAILURE,
      loading: false,
      payload: response,
    });
  };
}

export default function set(movie) {
  return (dispatch) => {
    dispatch({
      type: FAVORITE_MOVIE_REQUEST,
      loading: true,
      payload: {
        movie,
      },
    });
  };
}
