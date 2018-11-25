import React from 'react';
import { compose } from 'recompose';
import MovieItem from 'src/components/MovieItem/index';

const List = ({ items, onPressFavorite, onPressMovie }) =>
  (
    <div className="list">
      {items.map(item => (
        <MovieItem
          key={item.id}
          item={item}
          onPressFavorite={() => onPressFavorite}
          onPressMovie={() => onPressMovie}
        />
      ))}
    </div>
  );

const withLoading = (conditionFn) => (Component) => (props) =>
  (
    <div>
      <Component {...props} />

      <div className="interactions">
        {conditionFn(props) && <span>Loading...</span>}
      </div>
    </div>
  );

const withPaginated = (conditionFn) => (Component) => (props) =>
  (
    <div>
      <Component {...props} />

      <div className="interactions">
        {
        conditionFn(props) &&
        <div>
          <div>
            Something went wrong...
          </div>
          <button
            type="button"
            onClick={props.onEndReached}
          >
            Try Again
          </button>
        </div>
      }
      </div>
    </div>
  );

const withInfiniteScroll = (conditionFn) => (Component) =>
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () =>
      conditionFn(this.props) && this.props.onEndReached();

    render() {
      return <Component {...this.props} />;
    }
  };

const paginatedCondition = props =>
  props.page !== null && !props.isLoading && props.isError;

const infiniteScrollCondition = props =>
  (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
  && props.items.length
  && !props.isLoading
  && !props.isError;

const loadingCondition = props =>
  props.isLoading;

const AdvancedList = compose(
  withPaginated(paginatedCondition),
  withInfiniteScroll(infiniteScrollCondition),
  withLoading(loadingCondition),
)(List);

export default AdvancedList;
