import { moduleName } from "./module";
import { createSelector } from "reselect";

export const warningModalState = (state: any) => state[moduleName];

export const selectWarningModalStatus = createSelector(
  [warningModalState],
  state => state.showWarningModalStatusStore
);

export const deleteAllCamerasFlagStatus = createSelector(
  [warningModalState],
  state => state.deleteAllCamerasFlagStore
);
