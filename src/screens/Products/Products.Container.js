/* @flow */

import React from 'react';
import Products from './Products';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';

import get from '~/store/products/action';
import set from '~/store/cart/action';

type Props = {
  products: {
    payload: [],
  },
  cart: any,
  dispatch: () => void,
}

class ProductsContainer extends React.Component<Props, void> {
  componentWillMount() {
    this.props.dispatch(get());
  }

  onPressBuy = (product) => {
    const cart = this.props.cart.payload;
    const productIndex = _.findIndex(cart, { id: product.id });
    let productCart;
    console.log('INDEX', productIndex);
    if (productIndex !== -1) {
      productCart = cart[productIndex];
      cart[productIndex] =
        Object.assign({ ...productCart }, { quantity: productCart.quantity += 1 });
    } else {
      productCart = product;
      productCart.quantity = 1;
      cart.push(productCart);
    }
    this.props.dispatch(set(cart));
  };

  render() {
    return (
      <Products
        onPressBuy={this.onPressBuy}
        products={this.props.products.payload}
      />
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getProducts = createImmutableSelector([state => state], state =>
  state.getIn(['products']).toJS());

const getCart = createImmutableSelector([state => state], state =>
  state.getIn(['cart']).toJS());

function mapStateToProps(state) {
  return {
    products: getProducts(state),
    cart: getCart(state),
  };
}

export default connect(mapStateToProps)(ProductsContainer);
