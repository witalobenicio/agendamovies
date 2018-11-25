/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { POPULAR_MOVIES_REQUEST, failure, success } from './action';
import AjaxRequest from '../ajax';

const trendingMovies = (action$: any) =>
  action$
    .ofType(POPULAR_MOVIES_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap(() =>
      AjaxRequest('get', '/popular')
        .flatMap((response) => Observable.of(success(response)))
        .catch(err => Observable.of(failure(err))));

export default combineEpics(trendingMovies);
