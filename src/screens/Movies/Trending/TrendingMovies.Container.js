/* @flow */

import React from 'react';
import TredingMovies from './TredingMovies';
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

class TrendingMoviesContainer extends React.Component<Props, void> {
  state = {
    page: 1,
  };
  componentDidMount() {
    this.props.dispatch(get());
  }

  componentWillReceiveProps(nextProps) {
    (() => {
      if (!nextProps.movies.payload) return;
      if (!nextProps.movies.payload.page) return;
      if (nextProps.movies.payload.page !== this.state.page) return;
      this.setState({ page: nextProps.movies.payload.page + 1 });
    })();
  }

  onPressMovie = (movie) => {
    const { history } = this.props;
    history.push(`movies/${movie.id}`);
  };

  onPressFavorite = (movie) => {

  };

  loadMore = () => {
    const { page } = this.state;
    this.props.dispatch(get(page));
  };

  render() {
    const movies = (() => {
      if (this.props.movies.payload && this.props.movies.payload.results) {
        return this.props.movies.payload.results;
      }
      return [];
    })();
    return (
      <TredingMovies
        onPressFavorite={this.onPressBuy}
        onPressMovie={this.onPressMovie}
        loadMore={this.loadMore}
        movies={movies}
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

export default compose(connect(mapStateToProps), withRouter)(TrendingMoviesContainer);
