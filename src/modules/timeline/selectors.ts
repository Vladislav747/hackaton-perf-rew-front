import { moduleName } from "./module";
import { createSelector } from "reselect";

/**
 * селекторы
 */
export const timelimeState = (state: any) => state[moduleName];

export const timelineCursorLockedStatusSelector = createSelector(
  [timelimeState],
  state => state.timelineCursorLockedStatus
);
