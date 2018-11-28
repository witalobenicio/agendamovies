// /* @flow */
//
// import React from 'react';
// import { compose } from "recompose";
// import { connect}  from "react-redux";
// import { withRouter } from "react-router-dom";
// import { createSelectorCreator, defaultMemoize} from "reselect";
// import Immutable from "immutable";
// import MovieList from "../../../scenes/MovieList/MovieList";
//
// type Props = {
//
// }
//
// class FavoriteContainer extends React.Component<Props, void> {
//   componentDidMount() {
//     this.props.dispatch()
//   }
//
//   render() {
//     return (
//       <MovieList
//         items={}
//         totalItems={} onPressFavorite={} onPressMovie={} onEndReached={}/>
//     );
//   }
// }
//
// const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);
//
// const getMovies = createImmutableSelector([state => state], state =>
//   state.getIn(['favoriteMovies']).toJS());
//
// function mapStateToProps(state) {
//   return {
//     movies: getMovies(state),
//   };
// }
//
// export default compose(connect(mapStateToProps), withRouter)(FavoriteContainer);

/* @flow */

import get from '~/store/favoriteMovies/action';
import moviesHOC from '../moviesHOC/moviesHOC';

export default moviesHOC(get, 'favoriteMovies');
