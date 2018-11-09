/* @flow */

import React from 'react';
import Products from './Products';
import { withRouter } from 'react-router-dom';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { compose } from 'recompose';
import Immutable from 'immutable';
import connect from 'react-redux/es/connect/connect';

import get from '~/store/products/action';
import set from '~/store/cart/action';

type Props = {
  products: {
    payload: [],
  },
  history: any,
  dispatch: () => void,
}

class ProductsContainer extends React.Component<Props, void> {
  componentWillMount() {
    this.props.dispatch(get());
  }

  onPressProduct = (product) => {
    const { history } = this.props;
    history.push(`products/${product.id}`);
  };

  onPressBuy = (product, e) => {
    e.stopPropagation();
    this.props.dispatch(set(product));
  };

  render() {
    return (
      <Products
        onPressBuy={this.onPressBuy}
        onPressProduct={this.onPressProduct}
        products={this.props.products.payload}
      />
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getProducts = createImmutableSelector([state => state], state =>
  state.getIn(['products']).toJS());

function mapStateToProps(state) {
  return {
    products: getProducts(state),
  };
}

export default compose(connect(mapStateToProps), withRouter)(ProductsContainer);
