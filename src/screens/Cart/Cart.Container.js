/* @flow */

import React from 'react';
import { Get } from '~/common';
import Cart from './Cart';
import { withRouter } from 'react-router-dom';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { compose } from 'recompose';
import Immutable from 'immutable';
import connect from 'react-redux/es/connect/connect';

import get from '~/store/productDetail/action';
import set from '~/store/cart/action';

type Props = {
  cart: {
    payload: {},
  },
  dispatch: () => void,
  history: () => void,
}

class CartContainer extends React.Component<Props, void> {
  componentWillMount() {
    const id = Get(this.props, 'match.params.id');
    this.props.dispatch(get(id));
  }

  onPressAddRemove = (quantity, product, increment) => {
    this.props.dispatch(set(product, increment, quantity));
  };

  onPressBuyMore = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <Cart
        onPressAddRemove={this.onPressAddRemove}
        onPressBuyMore={this.onPressBuyMore}
        cart={this.props.cart.payload}
      />
    );
  }
}

const createImmutableSelector = createSelectorCreator(defaultMemoize, Immutable.is);

const getCart = createImmutableSelector([state => state], state =>
  state.getIn(['cart']).toJS());

function mapStateToProps(state) {
  return {
    cart: getCart(state),
  };
}

export default compose(connect(mapStateToProps), withRouter)(CartContainer);
