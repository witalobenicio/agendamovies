/* @flow */

import { Get } from '~/common';
import { show } from '~/store/snackVisibility/action';
import _ from 'lodash';

export const TRENDING_MOVIES_REQUEST = 'TRENDING_MOVIES_REQUEST';
export const TRENDING_MOVIES_SUCCESS = 'TRENDING_MOVIES_SUCCESS';
export const TRENDING_MOVIES_FAILURE = 'TRENDING_MOVIES_FAILURE';

export function success(payload) {
  return (dispatch, getState) => {
    const movies = getState().getIn(['trendingMovies']).toJS();
    const results = Get(movies, 'payload.results');
    dispatch({
      type: TRENDING_MOVIES_SUCCESS,
      loading: false,
      payload: {
        ...payload,
        results: results ? _.unionBy(results, payload.results, 'id') : payload.results,
      },
    });
  };
}

export function failure(response) {
  return (dispatch, getState) => {
    const movies = getState().getIn(['popularMovies']).toJS();
    const payload = Get(movies, 'payload');
    const results = Get(payload, 'results');
    dispatch({
      type: TRENDING_MOVIES_FAILURE,
      loading: false,
      error: response,
      payload: {
        ...payload,
        results: results ? _.unionBy(results, payload.results, 'id') : payload.results,
      },
    });
    dispatch(show(response.status_code));
  };
}

export default function get(page, mediaType: string = 'movie', period: string = 'week') {
  return (dispatch, getState) => {
    const movies = getState().getIn(['trendingMovies']).toJS();
    const payload = Get(movies, 'payload');
    dispatch({
      type: TRENDING_MOVIES_REQUEST,
      loading: true,
      payload,
      data: {
        page,
        mediaType,
        period,
      },
    });
  };
}
