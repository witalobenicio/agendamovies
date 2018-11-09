/* @flow */

import { Map } from 'immutable';

import { DIALOG_VISIBILITY } from './action';

const initialState = Map({
  type: DIALOG_VISIBILITY,
  payload: Map({
    message: '',
    title: '',
    visibility: false,
  }),
});

function reducer(state = initialState, action): any {
  const { type } = action;

  if (type === DIALOG_VISIBILITY) {
    const { payload } = action;
    return state.updateIn(['type'], () => type).setIn(['payload'], Map(payload));
  }

  return state;
}

export default reducer;
