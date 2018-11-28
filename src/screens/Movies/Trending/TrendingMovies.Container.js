/* @flow */

import get from '~/store/trendingMovies/action';
import moviesHOC from '../moviesHOC/moviesHOC';

export default moviesHOC(get, 'trendingMovies');
