import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import throttle from "lodash/throttle";
import * as Sentry from "@sentry/browser";
import createSentryMiddleware from "redux-sentry-middleware";

import history from "../helpers/history";
import rootReducer from "../reducers";

import rootSaga from "../sagas";
import { saveState, loadState } from "./persist";

//Подключение Sentry
Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

const sagaMiddleware = createSagaMiddleware();
const initialState = loadState();
const enhancers = [];
const middleware = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const loggerMiddleware = createLogger();
  middleware.push(loggerMiddleware);
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

//Подключение Sentry
if (process.env.NODE_ENV === "production") {
  const sentryReduxMiddleware = createSentryMiddleware(Sentry, {
    onError(err) {
      Sentry.captureException(err);
    },
  });

  middleware.push(sentryReduxMiddleware);
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
);
sagaMiddleware.run(rootSaga);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);
export default store;
