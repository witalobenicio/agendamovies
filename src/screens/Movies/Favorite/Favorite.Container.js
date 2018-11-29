import get from '~/store/favoriteMovies/action';
import moviesHOC from '../moviesHOC/moviesHOC';

export default moviesHOC(get, 'favoriteMovies', false);
