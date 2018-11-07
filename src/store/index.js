/* @flow */
/* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement"] */
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */

import { Map } from 'immutable';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import ajax from './ajax';
import reducers from './reducers';
import rootEpics from './epics';

export function configureStore() {
  let store = {};

  const epicMiddleware = createEpicMiddleware(rootEpics, {
    dependencies: { ajax },
  });

  const logger = createLogger({
    stateTransformer: state => {
      const newState = state.toJS();

      for (const i of Object.keys(newState)) {
        if (!!newState[i].present && typeof newState[i].present.toJS === 'function') {
          newState[i].present = newState[i].present.toJS();
        }
      }

      return newState;
    },
    actionTransformer: action => action,
  });

  store = createStore(reducers, Map({}), applyMiddleware(thunk, epicMiddleware, logger));
  return store;
}

export default configureStore();
