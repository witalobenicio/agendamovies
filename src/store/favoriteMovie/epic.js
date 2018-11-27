/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { FAVORITE_MOVIE_REQUEST, failure, success } from './action';
import { set } from '~/store/database';

const favoriteMovie = (action$: any) =>
  action$
    .ofType(FAVORITE_MOVIE_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap(({ movie }) => {
      console.log('MOVIEID', movie);
      return Observable.from(set(`/favorite/movies/${movie.id}`, movie))
        .flatMap((response) => Observable.of(success(response)))
        .catch(err => Observable.of(failure(err)));
    });

export default combineEpics(favoriteMovie);
