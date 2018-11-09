/* @flow */

import { combineReducers } from 'redux-immutable';

import cart from './cart/reducer';
import dialogVisibility from './dialogVisibility/reducer';
import products from './products/reducer';
import productDetail from './productDetail/reducer';

export default function reducers() {
  return combineReducers({
    cart,
    dialogVisibility,
    products,
    productDetail,
  });
}
