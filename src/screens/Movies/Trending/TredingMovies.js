/* @flow */

import React from 'react';
import appStyle from '~/App.less';
import style from './TrendingMovies.less';
import MovieList from '~/scenes/MovieList';

type Props = {
  movies: [];
  onPressMovie: () => void,
  onPressFavorite: () => void,
  loadMore: () => void,
}

class TredingMovies extends React.PureComponent<Props, void> {
  render() {
    const { movies } = this.props;
    return (
      <div>
        <MovieList
          className={`${appStyle.mainContainer} ${style.container}`}
          items={movies}
          renderItem={this.renderItem}
          onPressFavorite={this.props.onPressFavorite}
          onPressMovie={this.props.onPressMovie}
          onEndReached={this.props.loadMore}
        />
      </div>
    );
  }
}

export default TredingMovies;
