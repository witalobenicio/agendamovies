/* @flow */

import React from 'react';
import { MovieItem, RecyclerList } from '~/components';
import { InfiniteLoader, List, AutoSizer, WindowScroller, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  items: [],
  onPressFavorite: () => void,
  onPressMovie: () => void,
  onEndReached: () => void,
}

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

class MovieList extends React.Component<Props, void> {
  state = {
    page: 0,
  };

  loadMoreRows = () => {
    this.props.onEndReached();
  };

  render() {
    const { items } = this.props;
    return (
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
