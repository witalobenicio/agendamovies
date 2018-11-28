/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { FAVORITE_MOVIE_REQUEST, failure, success } from './action';
import { set } from '~/store/database';
import AjaxRequest from "../ajax";

const favoriteMovie = (action$: any) =>
  action$
    .ofType(FAVORITE_MOVIE_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap(({ movie }) => AjaxRequest('put', `/favorite/movies/${movie.id}.json`, movie, undefined, 'firebase')
      .flatMap((response) => Observable.of(success(response)))
      .catch(err => Observable.of(failure(err))));

export default combineEpics(favoriteMovie);
