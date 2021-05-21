import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/ie11"; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store from "./store/store";
import history from "./helpers/history";
import "normalize.css/normalize.css";
import "./assets/css/all.css";
//Для bootstrap modal
import "./assets/css/bootstrap/bootstrap.css";
import "react-flexbox-grid/dist/react-flexbox-grid.css";
import App from "./componentsUI/containers/App";
import * as Sentry from "@sentry/browser";

const sentryDsn = process.env.REACT_APP_SENTRY_DSN;
Sentry.init({ dsn: sentryDsn });

const target = document.querySelector("#root");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
