/* @flow */
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

import { Observable } from 'rxjs';
import { each } from 'underscore';
import param from 'jquery-param';
// import { ajax } from 'rxjs/observable/dom/ajax';
// import { isEmpty } from 'underscore';

export const VERSION = 1;
export const ENDPOINT = 'http://127.0.0.1:3000';

const initialOptions = {
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
  onCloseError: () => {},
  retries: 3,
  timeout: 30000,
};
//
// const onError = (err, onClose = () => {}) => Observable.throw({ ...err.xhr.response, onClose });
//
// const onSuccess = response => {
//   console.log(response);
//   return response;
// };

export const endpoint = (URI: string = '') => `${ENDPOINT}${URI}`;

// function prepare(ajax) {
//   console.log('AJAX', ajax);
//   if (ajax.responseText === '') return {};
//   switch (ajax.getResponseHeader('content-type')) {
//     case 'application/json;charset=UTF-8':
//       return JSON.parse(ajax.response);
//     default:
//       return {};
//   }
// }

function ajaxRequest(method, uri, data, options) {
  return new Observable(observer => {
    const ajax = new XMLHttpRequest();

    if (method === 'get') {
      let params = '';

      if (data !== null) {
        /**
         * Verifica se o objeto data possui o método getAll indicando
         * ser um tipo URLSearchParams.
         */
        params = typeof data.getAll === 'function' ? `?${data.toString()}` : `?${param(data)}`;
      }

      ajax.open(method, `${uri}${params}`, true);
    } else {
      ajax.open(method, uri, true);
    }

    if (options.headers) {
      each(options.headers, (value, header) => {
        ajax.setRequestHeader(header, value);
      });
    }

    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        switch (ajax.status) {
          case 0:
          case 404:
          case 500:
            observer.error(ajax.response);
            return;
          case 401:
          case 403:
            return;
          case 200:
          case 304:
          default:
            observer.next(JSON.parse(ajax.response));
        }
        const token = ajax.getResponseHeader('authentication');
        if (token) {
          sessionStorage.setItem('authenticationToken', token);
        }
      }
    };

    if (method === 'get') return ajax.send();

    return ajax.send(JSON.stringify(data));
  });
}

export default (method, uri, data = null, options = initialOptions) => Observable.of({})
  .mergeMap(() => ajaxRequest(
    method,
    endpoint(uri),
    data,
    Object.assign(options, { retry: false }),
  ).map(response => response));
