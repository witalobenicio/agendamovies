/* @flow */


export const PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL_REQUEST';
export const PRODUCT_DETAIL_SUCCESS = 'PRODUCT_DETAIL_SUCCESS';
export const PRODUCT_DETAIL_FAILURE = 'PRODUCT_DETAIL_FAILURE';

export function success(payload) {
  return dispatch => {
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      loading: false,
      payload,
    });
  };
}

export function failure(response) {
  return dispatch => {
    dispatch({
      type: PRODUCT_DETAIL_FAILURE,
      loading: false,
      payload: response,
    });
  };
}

export default function get(id) {
  return dispatch => {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST,
      loading: true,
      payload: {
        id,
      },
    });
  };
}
