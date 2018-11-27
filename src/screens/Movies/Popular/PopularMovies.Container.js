/* @flow */

import React from 'react';
import PopularMovies from './PopularMovies';
import { withRouter } from 'react-router-dom';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { compose } from 'recompose';
import Immutable from 'immutable';
import connect from 'react-redux/es/connect/connect';

import get from '~/store/trendingMovies/action';

type Props = {
  movies: {
    payload: [],
  },
  history: any,
  dispatch: () => void,
}

class PopularMoviesContainer extends React.Component<Props, void> {
  componentWillMount() {
    this.props.dispatch(get());
  }

  onPressMovie = (movie) => {
    const { history } = this.props;
    history.push(`products/${movie.id}`);
  };

  onPressFavorite = (movie) => {

  };

  render() {
    return (
      <PopularMovies
        onPressFavorite={this.onPressBuy}
        onPressMovie={this.onPressMovie}
        movies={this.props.movies.payload.results}
      />
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getTrendingMovies = createImmutableSelector([state => state], state =>
  state.getIn(['trendingMovies']).toJS());

function mapStateToProps(state) {
  return {
    movies: getTrendingMovies(state),
  };
}

export default compose(connect(mapStateToProps), withRouter)(PopularMoviesContainer);
