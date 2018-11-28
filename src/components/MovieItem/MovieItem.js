/* eslint-disable jsx-a11y/anchor-is-valid */
/* @flow */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import style from './MovieItem.less';
import { Image } from '~/components';
import moment from 'moment';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';
import { connect } from 'react-redux';

type Props = {
  item: {
    id: number,
    title: string,
    price: number,
    picture: string,
  },
  movies: any,
  onPressFavorite: () => void,
  onPressMovie: () => void,
  // description: string,
  // memory: string,
  // brand: string,
  // chipType: string,
  // quantity: number,
};

function getFavorited(movies, id) {
  return movies.find(movie => movie.id === id);
}

function getBadgeClass(voteNumber) {
  return (() => {
    if (voteNumber > 7) return style.badgeHigh;
    if (voteNumber > 5) return style.badgeMedium;
    return style.badgeSmall;
  })();
}

const MovieItem = (props: Props) => {
  const {
    id, title,
    poster_path: posterPath,
    overview,
    vote_average: voteAverage,
    adult, release_date: releaseDate,
  } = props.item;

  const movies = (() => {
    if (props.movies.payload && props.movies.payload.results) {
      return props.movies.payload.results;
    }
    return [];
  })();

  const isFavorited = getFavorited(movies, id);
  return (
    <Grid item key={id} lg={6} sm={12} style={{ margin: '0 auto' }}>
      <Paper
        className={style.movieCard}
        elevation={1}
        style={{ position: 'relative' }}
        onClick={() => props.onPressMovie(props.item)}
      >
        <div className={style.infoContainer}>
          <div style={{ position: 'relative' }}>
            <Image
              src={posterPath}
              alt={title}
              className={style.moviePicture}
            />
            <div className={`${style.badgeVote} ${getBadgeClass(voteAverage)}`}>
              <span>{voteAverage}</span>
            </div>
          </div>
          <div className={style.movieInfo}>
            <p className={style.movieName}>
              {title}
            </p>
            <div className={style.subInfo}>
              <span className={style.releaseDate}>
                {moment(releaseDate).format('DD/MM/YYYY')}
              </span>
              { adult ?
                <span className={style.adult}>
                  +18
                </span>
                :
                null
              }
            </div>
            <span className={style.movieDescription}>{overview}</span>
          </div>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            props.onPressFavorite(props.item, isFavorited);
          }}
          variant="fab"
          mini
          color={isFavorited ? 'secondary' : ''}
          aria-label="Favorite"
          className={style.favoriteButton}
        >
          <FavoriteIcon />
        </Button>
      </Paper>
    </Grid>
  );
};

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getFavoriteMovies = createImmutableSelector([state => state], state =>
  state.getIn(['favoriteMovies']).toJS());

function mapStateToProps(state) {
  return {
    movies: getFavoriteMovies(state),
  };
}

export default connect(mapStateToProps)(MovieItem);
