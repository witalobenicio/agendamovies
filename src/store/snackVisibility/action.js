/* @flow */

export const SNACK_VISIBILITY = 'SNACK_VISIBILITY';
import error from '~/store/errors';

export function show(code) {
  return dispatch => {
    dispatch({
      type: SNACK_VISIBILITY,
      payload: {
        visibility: true,
        message: error(code),
      },
    });
  };
}

export function hide() {
  return dispatch => {
    dispatch({
      type: SNACK_VISIBILITY,
      payload: {
        visibility: false,
        message: '',
      },
    });
  };
}

export default {
  show,
  hide,
};
