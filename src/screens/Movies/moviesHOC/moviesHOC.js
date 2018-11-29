import React from 'react';
import favorite from '../../../store/favoriteMovie/action';
import deleteFavorite from '../../../store/deleteFavoriteMovie/action';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import appStyle from '../../../App.less';
import style from './movies.less';
import MovieList from '../../../scenes/MovieList';

export default function moviesHOC(get, moviesStore, paginate = true) {
  type Props = {
    movies: {
      payload: [],
      loading: boolean,
    },
    history: any,
    dispatch: () => void,
  };

  class Movies extends React.Component<Props, void> {
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

    onPressFavorite = (movie, isFavorited) => {
      const request = isFavorited ? deleteFavorite : favorite;
      this.props.dispatch(request(movie));
    };

    loadMore = () => {
      if (paginate) {
        const { page } = this.state;
        this.props.dispatch(get(page));
      }
    };

    render() {
      const movies = (() => {
        if (this.props.movies.payload && this.props.movies.payload.results) {
          return this.props.movies.payload.results;
        }
        return [];
      })();
      return (
        <MovieList
          loading={this.props.movies.loading}
          totalItems={this.props.movies.payload.total_results || 0}
          className={`${appStyle.mainContainer} ${style.container}`}
          items={movies}
          renderItem={this.renderItem}
          onPressFavorite={this.onPressFavorite}
          onPressMovie={this.onPressMovie}
          onEndReached={this.loadMore}
        />
      );
    }
  }

  const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

  const getMovies = createImmutableSelector([state => state], state =>
    state.getIn([moviesStore]).toJS());

  function mapStateToProps(state) {
    return {
      movies: getMovies(state),
    };
  }

  return compose(connect(mapStateToProps), withRouter)(Movies);
}
