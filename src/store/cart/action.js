/* @flow */

export const SET_CART = 'SET_CART';

export default function setParams(payload) {
  return dispatch => {
    dispatch({
      type: SET_CART,
      payload,
    });
  };
}
