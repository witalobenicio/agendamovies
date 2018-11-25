/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { TRENDING_MOVIES_REQUEST, failure, success } from './action';
import AjaxRequest from '../ajax';

const trendingMovies = (action$: any) =>
  action$
    .ofType(TRENDING_MOVIES_REQUEST)
    .map(({ data }) => data)
    .mergeMap(({ mediaType, period, page = 1 }) =>
      AjaxRequest('get', `/trending/${mediaType}/${period}?page=${page}`)
        .flatMap((response) => Observable.of(success(response)))
        .catch(err => Observable.of(failure(err))));

export default combineEpics(trendingMovies);
