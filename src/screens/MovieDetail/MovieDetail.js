/* eslint-disable react/prefer-stateless-function */
/* @flow */

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Image from '~/components/Image/Image';

import movieDetailStyle from './MovieDetail.less';
import movieStyle from '../../components/MovieItem/MovieItem.less';
import appStyle from '~/App.less';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import FavoriteIcon from '@material-ui/icons/Favorite';

const style = {
  ...movieStyle,
  ...movieDetailStyle,
};

type Props = {
  movie: {};
  onPressBuy: () => void,
  // onPressProduct: () => void,
}

function getBadgeClass(voteNumber) {
  return (() => {
    if (voteNumber > 7) return style.badgeHigh;
    if (voteNumber > 5) return style.badgeMedium;
    return style.badgeSmall;
  })();
}

class MovieDetail extends React.Component<Props, void> {
  onPressBuy = (e) => {
    this.props.onPressBuy(this.props.movie, e);
  };

  render() {
    const { movie } = this.props;
    const {
      title,
      poster_path: posterPath,
      backdrop_path: backdropPath,
      overview,
      vote_average: voteAverage,
      adult, release_date: releaseDate,
    } = movie;
    return (
      <div>
        <div className={appStyle.mainContainer}>
          <Paper
            className={style.movieCard}
            elevation={1}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'relative' }}>
              <Image
                src={backdropPath}
                size="w1280"
                className={style.banner}
              />
              <div className={style.bannerBottomLinear} />
            </div>
            <div className={`${movieStyle.infoContainer} ${movieDetailStyle.infoContainer}`}>
              <div style={{ position: 'relative' }}>
                <Image
                  src={posterPath}
                  alt={title}
                  className={`${movieStyle.moviePicture} ${movieDetailStyle.moviePicture}`}
                />
              </div>
              <div className={style.movieInfo}>
                <div className={style.movieNameContainer}>
                  <p className={`${movieDetailStyle.movieName} ${movieStyle.movieName}`}>
                    {title}
                  </p>
                  <div className={`${style.badgeVote} ${getBadgeClass(voteAverage)}`}>
                    <span>{voteAverage}</span>
                  </div>
                </div>
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
              <Button
                variant="fab"
                mini
                color="secondary"
                aria-label="Favorite"
                className={style.favoriteButton}
              >
                <FavoriteIcon />
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
