/* @flow */

import getFavoriteMovies from '../favoriteMovies/action';

export const DELETE_FAVORITE_MOVIE_REQUEST = 'DELETE_FAVORITE_MOVIE_REQUEST';
export const DELETE_FAVORITE_MOVIE_SUCCESS = 'DELETE_FAVORITE_MOVIE_SUCCESS';
export const DELETE_FAVORITE_MOVIE_FAILURE = 'DELETE_FAVORITE_MOVIE_FAILURE';

export function success(payload) {
  return (dispatch) => {
    dispatch({
      type: DELETE_FAVORITE_MOVIE_SUCCESS,
      loading: false,
      payload,
    });
    dispatch(getFavoriteMovies());
  };
}

export function failure(response) {
  return dispatch => {
    dispatch({
      type: DELETE_FAVORITE_MOVIE_FAILURE,
      loading: false,
      payload: response,
    });
  };
}

export default function set(movie) {
  return (dispatch) => {
    dispatch({
      type: DELETE_FAVORITE_MOVIE_REQUEST,
      loading: true,
      payload: {
        movie,
      },
    });
  };
}
