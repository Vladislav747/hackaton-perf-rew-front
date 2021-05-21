import { moduleName } from "./module";
import { createSelector } from "reselect";

/**
 * селекторы
 */
export const userState = state => state[moduleName];

export const authInProgressSelector = createSelector(
  [userState],
  state => !!state.authInProgress
);

export const authorizedSelector = createSelector(
  [userState],
  state => !!state.authorized
);

export const userNameSelector = createSelector(
  [userState],
  state => state.username
);

export const authErrorsSelector = createSelector(
  [userState],
  state => state.authErrors
);

export const authTokenSelector = createSelector(
  [userState],
  state => state.token
);

export const frontendIsReadySelector = createSelector(
  [userState],
  state => state.frontendIsReadyStatus
);
