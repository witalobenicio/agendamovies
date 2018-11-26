import { combineEpics } from 'redux-observable';

import cart from './cart/epic';
import trendingMovies from './trendingMovies/epic';
import movieDetail from './movieDetail/epic';
import popularMovies from './popularMovies/epic';
import searchMovies from './searchMovies/epic';

export default combineEpics(
  cart,
  movieDetail,
  popularMovies,
  trendingMovies,
  searchMovies,
);
