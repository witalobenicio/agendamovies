/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { DELETE_FAVORITE_MOVIE_REQUEST, failure, success } from './action';
import AjaxRequest from "../ajax";

const deleteFavoriteMovie = (action$: any) =>
  action$
    .ofType(DELETE_FAVORITE_MOVIE_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap(({ movie }) => AjaxRequest('delete', `/favorite/movies/${movie.id}.json`, null, undefined, 'firebase')
      .flatMap((response) => Observable.of(success(response)))
      .catch(err => Observable.of(failure(err))));

export default combineEpics(deleteFavoriteMovie);
