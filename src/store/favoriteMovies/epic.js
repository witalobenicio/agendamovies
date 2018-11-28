/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { FAVORITE_MOVIES_REQUEST, failure, success } from './action';
import AjaxRequest from '../ajax';

function prepareData(data) {
  return { page: 1, results: Object.keys(data).map((key) => data[key]) };
}

const favoriteMovies = (action$: any) =>
  action$
    .ofType(FAVORITE_MOVIES_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap(() => AjaxRequest('get', '/favorite/movies.json', null, undefined, 'firebase')
      .flatMap((response) => Observable.of(success(prepareData(response))))
      .catch(err => Observable.of(failure(err))));

export default combineEpics(favoriteMovies);
