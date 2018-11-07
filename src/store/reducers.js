/* @flow */

import { combineReducers } from 'redux-immutable';

import products from './products/reducer';

export default function reducers() {
  return combineReducers({
    products,
  });
}
