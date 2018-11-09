import { combineEpics } from 'redux-observable';

import cart from './cart/epic';
import products from './products/epic';
import productDetail from './productDetail/epic';

export default combineEpics(
  cart,
  products,
  productDetail,
);
