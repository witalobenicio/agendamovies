/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { POPULAR_MOVIES_REQUEST, failure, success } from './action';
import AjaxRequest from '../ajax';

const trendingMovies = (action$: any) =>
  action$
    .ofType(POPULAR_MOVIES_REQUEST)
    .map(({ data }) => data)
    .mergeMap(({ page }) =>
      AjaxRequest('get', `/movie/popular?page=${page}`)
        .flatMap((response) => Observable.of(success(response)))
        .catch(err => Observable.of(failure(err))));

export default combineEpics(trendingMovies);
