/* @flow */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import MovieItem from '../../../components/MovieItem/MovieItem';
import style from './PopularMovies.less';

type Props = {
  movies: [];
  onPressMovie: () => void,
  onPressFavorite: () => void,
}

class PopularMovies extends React.PureComponent<Props, void> {
  render() {
    const { movies } = this.props;
    return (
      <div className={style.main}>
        <Grid container alignItems="center">
          {movies && movies.map((product) => (
            <MovieItem
              onPressBuy={this.props.onPressFavorite}
              onPressMovie={this.props.onPressMovie}
              key={product.id}
              item={product}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default PopularMovies;
