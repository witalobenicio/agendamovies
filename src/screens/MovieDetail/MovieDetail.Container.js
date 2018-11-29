/* @flow */

import React from 'react';
import { Get } from '~/common';
import MovieDetail from './MovieDetail';
import { withRouter } from 'react-router-dom';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { compose } from 'recompose';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import get from '~/store/movieDetail/action';
import deleteFavorite from '../../store/deleteFavoriteMovie/action';
import favorite from '../../store/favoriteMovie/action';

type Props = {
  movie: {
    payload: {},
  },
  movies: any,
  match: any,
  dispatch: () => void,
}

class MovieDetailContainer extends React.Component<Props, void> {
  componentWillMount() {
    const id = Get(this.props, 'match.params.id');
    this.props.dispatch(get(id));
  }

  componentWillReceiveProps(nextProps) {
    (() => {
      if (nextProps.match.params.id === this.props.match.params.id) return;
      const id = Get(nextProps, 'match.params.id');
      this.props.dispatch(get(id));
    })();
  }

  onPressBuy = (product, e) => {
    e.stopPropagation();
  };

  onPressFavorite = (movie, isFavorited) => {
    const request = isFavorited ? deleteFavorite : favorite;
    this.props.dispatch(request(movie));
  };

  render() {
    const movies = (() => {
      if (this.props.movies.payload && this.props.movies.payload.results) {
        return this.props.movies.payload.results;
      }
      return [];
    })();

    return (
      <MovieDetail
        movies={movies}
        onPressFavorite={this.onPressFavorite}
        onPressBuy={this.onPressBuy}
        movie={this.props.movie.payload}
      />
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getMovie = createImmutableSelector([state => state], state =>
  state.getIn(['movieDetail']).toJS());

const getFavoriteMovies = createImmutableSelector([state => state], state =>
  state.getIn(['favoriteMovies']).toJS());

function mapStateToProps(state) {
  return {
    movies: getFavoriteMovies(state),
    movie: getMovie(state),
  };
}

export default compose(connect(mapStateToProps), withRouter)(MovieDetailContainer);
