/* @flow */


import Get from '../../common/Get';

export const POPULAR_MOVIES_REQUEST = 'POPULAR_MOVIES_REQUEST';
export const POPULAR_MOVIES_SUCCESS = 'POPULAR_MOVIES_SUCCESS';
export const POPULAR_MOVIES_FAILURE = 'POPULAR_MOVIES_FAILURE';

export function success(payload) {
  return (dispatch, getState) => {
    const movies = getState().getIn(['popularMovies']).toJS();
    const results = Get(movies, 'payload.results');
    dispatch({
      type: POPULAR_MOVIES_SUCCESS,
      loading: false,
      payload: {
        ...payload,
        results: results ? results.concat(payload.results) : payload.results,
      },
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

export default function get(page) {
  return (dispatch, getState) => {
    const movies = getState().getIn(['popularMovies']).toJS();
    const payload = Get(movies, 'payload');
    dispatch({
      type: POPULAR_MOVIES_REQUEST,
      loading: true,
      payload,
      data: {
        page,
      },
    });
  };
}
