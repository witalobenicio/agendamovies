/* @flow */

import { combineReducers } from 'redux-immutable';

import dialogVisibility from './dialogVisibility/reducer';
import favoriteMovie from './favoriteMovie/reducer';
import favoriteMovies from './favoriteMovies/reducer';
import trendingMovies from './trendingMovies/reducer';
import movieDetail from './movieDetail/reducer';
import popularMovies from './popularMovies/reducer';
import searchMovies from './searchMovies/reducer';
import snackVisibility from './snackVisibility/reducer';

export default function reducers() {
  return combineReducers({
    dialogVisibility,
    favoriteMovie,
    favoriteMovies,
    movieDetail,
    popularMovies,
    trendingMovies,
    searchMovies,
    snackVisibility,
  });
}
