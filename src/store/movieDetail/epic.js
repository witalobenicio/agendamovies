/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { MOVIE_DETAIL_REQUEST, failure, success } from './action';
import AjaxRequest from '../ajax';

const resume = (action$: any) =>
  action$
    .ofType(MOVIE_DETAIL_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap(({ movieId }) =>
      AjaxRequest('get', `/movie/${movieId}`)
        .flatMap((response) => Observable.of(success(response)))
        .catch(err => Observable.of(failure(err))));

export default combineEpics(resume);
