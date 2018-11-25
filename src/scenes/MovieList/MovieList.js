/* @flow */

import React from 'react';
import { MovieItem, RecyclerList } from '~/components';
import style from './MovieList.less';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  items: [],
  totalItems: number,
  onPressFavorite: () => void,
  onPressMovie: () => void,
  onEndReached: () => void,
}

class MovieList extends React.Component<Props, void> {
  loadMoreRows = () => {
    this.props.onEndReached();
  };

  render() {
    const { items, totalItems = 20000 } = this.props;
    return (
      <div>
        <RecyclerList
          onLoadMore={this.loadMoreRows}
          class="list"
          overscan={6}
        >
          { items.map(item => (
            <MovieItem
              onPressMovie={this.props.onPressMovie}
              onPressFavorite={this.props.onPressFavorite}
              item={item}
            />
          )) }
        </RecyclerList>
        { items && items.length !== totalItems ?
          <div className={style.progressContainer}>
            <CircularProgress color="secondary" />
          </div>
          :
          null
        }
      </div>
    );
  }

  // render() {
  //   const { items, className } = this.props;
  //   return (
  //     <WindowScroller>
  //       {({
  //           height, width, isScrolling, onChildScroll,
  //         }) => (
  //           <InfiniteLoader
  //             isRowLoaded={this.isRowLoaded}
  //             loadMoreRows={this.loadMoreRows}
  //             rowCount={items.length}
  //           >
  //             {({ onRowsRendered, registerChild }) => (
  //               <List
  //                 deferredMeasurementCache={this.cache}
  //                 className={className}
  //                 ref={registerChild}
  //                 onScroll={onChildScroll}
  //                 isScrolling={isScrolling}
  //                 onRowsRendered={onRowsRendered}
  //                 height={height - 90}
  //                 rowHeight={280}
  //                 width={width}
  //                 rowCount={items.length}
  //                 overscanRowCount={10}
  //                 rowRenderer={this.renderItem}
  //               />
  //                   )}
  //           </InfiniteLoader>
  //       )}
  //     </WindowScroller>
  //   );
  // }
}

export default MovieList;
