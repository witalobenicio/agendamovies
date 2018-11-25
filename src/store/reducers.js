/* @flow */

import { combineReducers } from 'redux-immutable';

import cart from './cart/reducer';
import dialogVisibility from './dialogVisibility/reducer';
import trendingMovies from './trendingMovies/reducer';
import movieDetail from './movieDetail/reducer';
import popularMovies from './popularMovies/reducer';

export default function reducers() {
  return combineReducers({
    cart,
    dialogVisibility,
    movieDetail,
    popularMovies,
    trendingMovies,
  });
}
