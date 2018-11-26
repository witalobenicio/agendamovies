/* @flow */

import React from 'react';
import { Get } from '~/common';
import MovieDetail from './MovieDetail';
import { withRouter } from 'react-router-dom';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { compose } from 'recompose';
import Immutable from 'immutable';
import connect from 'react-redux/es/connect/connect';

import get from '~/store/movieDetail/action';

type Props = {
  movie: {
    payload: {},
  },
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

  render() {
    return (
      <MovieDetail
        onPressBuy={this.onPressBuy}
        movie={this.props.movie.payload}
      />
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getMovie = createImmutableSelector([state => state], state =>
  state.getIn(['movieDetail']).toJS());

function mapStateToProps(state) {
  return {
    movie: getMovie(state),
  };
}

export default compose(connect(mapStateToProps), withRouter)(MovieDetailContainer);
