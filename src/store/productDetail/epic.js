/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { PRODUCT_DETAIL_REQUEST, failure, success } from './action';
import AjaxRequest from '../ajax';

const resume = (action$: any) =>
  action$
    .ofType(PRODUCT_DETAIL_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap(({ id }) =>
      AjaxRequest('get', `/products/${id}/`)
        .flatMap((response) => Observable.of(success(response)))
        .catch(err => Observable.of(failure(err))));

export default combineEpics(resume);
