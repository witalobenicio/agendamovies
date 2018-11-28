/* @flow */

import React from 'react';
import { MovieItem, RecyclerList } from '~/components';
import style from './MovieList.less';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  items: [],
  totalItems: number,
  loading: boolean,
  onPressFavorite: () => void,
  onPressMovie: () => void,
  onEndReached: () => void,
}

class MovieList extends React.Component<Props, void> {
  loadMoreRows = () => {
    this.props.onEndReached();
  };

  render() {
    const { items, totalItems = 20000, loading = false } = this.props;
    return (
      <div>
        <RecyclerList
          onLoadMore={this.loadMoreRows}
          class="list"
          overscan={20}
        >
          { items.map(item => (
            <MovieItem
              onPressMovie={this.props.onPressMovie}
              onPressFavorite={this.props.onPressFavorite}
              item={item}
            />
          )) }
          { loading || (items && items.length < totalItems) ?
            <div className={style.progressContainer}>
              <CircularProgress color="secondary" />
            </div>
            :
            null
          }
        </RecyclerList>
      </div>
    );
  }
}

export default MovieList;
