import { moduleName } from "./module";
import { createSelector } from "reselect";

/**
 * селекторы
 */
//@ts-ignore
export const initState = (state: InitSchema) => state[moduleName];

export const inProgressSelector = createSelector(
  [initState],
  state => !!state.inProgress
);

export const completeSelector = createSelector(
  [initState],
  state => !!state.complete
);

export const tokenUpdateIntervalValSelector = createSelector(
  [initState],
  state => !!state.tokenUpdateIntervalVal
);

export const hasSeenCopyrightBannerSelector = createSelector(
  [initState],
  state => state.hasSeenCopyrightBanner
);

export const hasSeenRedirectBannerSelector = createSelector(
  [initState],
  state => state.hasSeenRedirectBanner
);
