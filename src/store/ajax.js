/* @flow */
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { isEmpty } from 'underscore';

export const VERSION = 1;
export const ENDPOINT = 'http://127.0.0.1:3000';

const initialOptions = {
  headers: {},
  onCloseError: () => {},
  retries: 3,
  timeout: 30000,
};

const onError = (err, onClose = () => {}) => Observable.throw({ ...err.xhr.response, onClose });

const onSuccess = response => {
  console.log(response);
  return response;
};

export const endpoint = (URI: string = '') => `${ENDPOINT}${URI}`;

export const ajaxRequest = (method, uri, data = null, options = {}) => {
  const {
    headers, onCloseError, retries, timeout,
  } = Object.assign({}, initialOptions, options);

  return ajax({
    method,
    timeout,
    body: isEmpty(data) ? null : data,
    responseType: 'json',
    dataType: 'json',
    crossDomain: false,
    url: endpoint(uri),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
    .catch(err => Observable.throw(err))
    .retryWhen(err =>
      err
        .flatMap((error: any) => {
          console.log(error);
          if ([400, 401, 404, 500].indexOf(error.status) !== -1) {
            return Observable.throw(error);
          }
          return Observable.of(error.status).delay(1000);
        })
        .take(retries)
        .concat(Observable.throw({
          xhr: {
            response: { messages: [{ text: 'Sem conexão com o servidor.' }], resource: {} },
          },
        })))
    .catch(err => onError(err, onCloseError))
    .map(onSuccess);
};

export default (method, uri, data = null, options = {}) =>
  Observable.of({})
    .mergeMap(() => {
      if (process.env.NODE_ENV === 'test') return Observable.of('string');
      return Observable.fromPromise(localStorage.getItem('@Session:authenticationToken'));
    })
    .mergeMap((token: string) => {
      const headers = options.headers || {};

      if (typeof token === 'string') headers.Authorization = `Bearer ${token}`;

      console.log('Ajax request', token, uri, data);

      return ajaxRequest(method, uri, data, Object.assign(options, { headers }));
    });
