/* eslint-disable no-param-reassign */
/* @flow */
import { show } from '~/store/dialogVisibility/action';

export const CART_REQUEST = 'CART_REQUEST';
export const CART_SUCCESS = 'CART_SUCCESS';
export const CART_FAILURE = 'CART_FAILURE';

function getErrorMessage(error) {
  if (error.typeError === 'empty_stock') {
    return `O produto ${error.product.title} não tem mais estoque disponível para a quantidade solicitada.`;
  }
  return '';
}

function getErrorTitle(error) {
  if (error.typeError === 'empty_stock') {
    return 'Quantidade indisponível';
  }
  return '';
}

export function success(payload) {
  return dispatch => {
    dispatch({
      type: CART_SUCCESS,
      loading: false,
      payload,
    });
  };
}

export function failure({ error, payload }) {
  return dispatch => {
    dispatch({
      type: CART_FAILURE,
      loading: false,
      payload,
      error,
    });
    dispatch(show(getErrorTitle(error), getErrorMessage(error)));
  };
}

export default function setParams(product) {
  return (dispatch, getState) => {
    const cart = getState().getIn(['cart']).toJS().payload;
    dispatch({
      type: CART_REQUEST,
      payload: {
        product,
        cart,
      },
    });
  };
}
