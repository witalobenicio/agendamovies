/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { SEARCH_MOVIES_REQUEST, failure, success } from './action';
import AjaxRequest from '../ajax';

const trendingMovies = (action$: any) =>
  action$
    .ofType(SEARCH_MOVIES_REQUEST)
    .map(({ data }) => data)
    .mergeMap(({ query }) =>
      AjaxRequest('get', `/search/movie?query=${query}`)
        .flatMap((response) => Observable.of(success(response)))
        .catch(err => Observable.of(failure(err))));

export default combineEpics(trendingMovies);
