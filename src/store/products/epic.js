/* @flow */

import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import { PRODUCTS_REQUEST, failure, success } from './action';
import AjaxRequest from '../ajax';

const resume = (action$: any) =>
  action$
    .ofType(PRODUCTS_REQUEST)
    .map(({ payload }) => payload)
    .mergeMap(() =>
      AjaxRequest('get', '/products')
        .flatMap(({ response }: { response: any }) => Observable.of(success(response.resource)))
        .catch(err => Observable.of(failure(err))));

export default combineEpics(resume);
