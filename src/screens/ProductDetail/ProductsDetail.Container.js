/* @flow */

import React from 'react';
import { Get } from '~/common';
import ProductDetail from './ProductDetail';
import { withRouter } from 'react-router-dom';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { compose } from 'recompose';
import Immutable from 'immutable';
import connect from 'react-redux/es/connect/connect';

import get from '~/store/productDetail/action';
import set from '~/store/cart/action';

type Props = {
  product: {
    payload: {},
  },
  dispatch: () => void,
}

class ProductsDetailContainer extends React.Component<Props, void> {
  componentWillMount() {
    const id = Get(this.props, 'match.params.id');
    this.props.dispatch(get(id));
  }

  onPressBuy = (product, e) => {
    e.stopPropagation();
    this.props.dispatch(set(product));
  };

  render() {
    return (
      <ProductDetail
        onPressBuy={this.onPressBuy}
        product={this.props.product.payload}
      />
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getProduct = createImmutableSelector([state => state], state =>
  state.getIn(['productDetail']).toJS());

const getCart = createImmutableSelector([state => state], state =>
  state.getIn(['cart']).toJS());

function mapStateToProps(state) {
  return {
    product: getProduct(state),
    cart: getCart(state),
  };
}

export default compose(connect(mapStateToProps), withRouter)(ProductsDetailContainer);
