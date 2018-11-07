import { combineEpics } from 'redux-observable';

import products from './products/epic';

export default combineEpics(products);
