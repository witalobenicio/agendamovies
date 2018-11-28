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
    console.log('ITEM LENGTH', items.length);
    return (
      <div>
        <RecyclerList
          onLoadMore={this.loadMoreRows}
          class="list"
          defaultRowHeight={170}
          overscan={20}
        >
          { items.map(item => (
            <MovieItem
              onPressMovie={this.props.onPressMovie}
              onPressFavorite={this.props.onPressFavorite}
              item={item}
            />
          )) }
        </RecyclerList>
        { loading || (items && items.length < totalItems) ?
          <div className={style.progressContainer}>
            <CircularProgress color="secondary" />
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default MovieList;
