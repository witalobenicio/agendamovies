/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { CART_REQUEST, failure, success } from './action';
import _ from 'lodash';

function getStock(cart, productIndex, product, quantity) {
  const productStock = productIndex === -1 ? product.quantity : cart[productIndex].quantity;
  return productStock - quantity;
}

const cartEpic = (action$: any) =>
  action$
    .ofType(CART_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap((payload) =>
      Observable.create((observable) => {
        const {
          product, cart, quantity,
        } = payload;
        const productIndex = _.findIndex(cart, { id: product.id });
        let productCart;
        const stock = getStock(cart, productIndex, product, quantity);
        if (stock >= 0) {
          if (productIndex !== -1) {
            productCart = cart[productIndex];
            const boughtQuantity = (productCart.boughtQuantity || 0) + quantity;
            if (boughtQuantity <= 0) {
              cart.splice(productIndex, 1);
              localStorage.setItem('cart', JSON.stringify(cart));
              observable.next(cart);
              return;
            }
            cart[productIndex] =
              Object.assign(
                { ...productCart },
                {
                  boughtQuantity,
                  quantity: stock,
                },
              );
          } else {
            productCart = product;
            productCart.quantity = stock;
            productCart.boughtQuantity = quantity;
            cart.push(productCart);
          }
          localStorage.setItem('cart', JSON.stringify(cart));
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

export default combineEpics(cartEpic);
