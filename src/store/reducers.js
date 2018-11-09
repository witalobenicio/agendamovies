/* @flow */

import { combineReducers } from 'redux-immutable';

import cart from './cart/reducer';
import products from './products/reducer';

export default function reducers() {
  return combineReducers({
    cart,
    products,
  });
}
