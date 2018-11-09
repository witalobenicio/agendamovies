/* @flow */

export const DIALOG_VISIBILITY = 'DIALOG_VISIBILITY';

export function show(title, description) {
  return dispatch => {
    dispatch({
      type: DIALOG_VISIBILITY,
      payload: {
        visibility: true,
        title,
        description,
      },
    });
  };
}

export function hide() {
  return {
    type: DIALOG_VISIBILITY,
    payload: {
      visibility: false,
      title: '',
      description: '',
    },
  };
}

export default {
  show,
  hide,
};
