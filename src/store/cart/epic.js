/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { CART_REQUEST, failure, success } from './action';
import _ from 'lodash';

const resume = (action$: any) =>
  action$
    .ofType(CART_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap((payload) =>
      Observable.create((observable) => {
        const { product, cart } = payload;
        const productIndex = _.findIndex(cart, { id: product.id });
        let productCart;
        const stock = productIndex === -1 ? product.quantity : cart[productIndex].quantity;
        if (stock > 0) {
          if (productIndex !== -1) {
            productCart = cart[productIndex];
            const boughtQuantity = (productCart.boughtQuantity || 0) + 1;
            cart[productIndex] =
              Object.assign(
                { ...productCart },
                {
                  boughtQuantity,
                  quantity: stock - 1,
                },
              );
          } else {
            productCart = product;
            productCart.quantity -= 1;
            productCart.boughtQuantity = 1;
            cart.push(productCart);
          }
          observable.next(cart);
        } else {
          observable.error({
            payload: cart,
            error: {
              product,
              typeError: 'empty_stock',
            },
          });
        }
      }).flatMap((response) => Observable.of(success(response)))
        .catch(err => Observable.of(failure(err))));

export default combineEpics(resume);
