/* @flow */


export const POPULAR_MOVIES_REQUEST = 'POPULAR_MOVIES_REQUEST';
export const POPULAR_MOVIES_SUCCESS = 'POPULAR_MOVIES_SUCCESS';
export const POPULAR_MOVIES_FAILURE = 'POPULAR_MOVIES_FAILURE';

export function success(payload) {
  return dispatch => {
    dispatch({
      type: POPULAR_MOVIES_SUCCESS,
      loading: false,
      payload,
    });
  };
}

export function failure(response) {
  return dispatch => {
    dispatch({
      type: POPULAR_MOVIES_FAILURE,
      loading: false,
      payload: response,
    });
  };
}

export default function get(mediaType: string = 'movie', period: string = 'week') {
  return dispatch => {
    dispatch({
      type: POPULAR_MOVIES_REQUEST,
      loading: true,
      payload: {
        mediaType,
        period,
      },
    });
  };
}
