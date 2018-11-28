/* @flow */

import get from '~/store/popularMovies/action';
import moviesHOC from '../moviesHOC/moviesHOC';

export default moviesHOC(get, 'popularMovies');
