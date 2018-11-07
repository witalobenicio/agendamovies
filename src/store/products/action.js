/* @flow */


export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE';

export function success(payload) {
  return dispatch => {
    dispatch({
      type: PRODUCTS_SUCCESS,
      loading: false,
      payload,
    });
  };
}

export function failure(response) {
  return dispatch => {
    dispatch({
      type: PRODUCTS_FAILURE,
      loading: false,
      payload: response,
    });
  };
}

export function get(payload) {
  return dispatch => {
    dispatch({
      type: PRODUCTS_REQUEST,
      loading: true,
      payload: {
        ...payload,
      },
    });
  };
}

export default {
  get,
  failure,
  success,
};
