import { moduleName } from "./module";
import { createSelector } from "reselect";

export const eventsState = (state: any) => state[moduleName];

export const eventsLoadingInProgressSelector = createSelector(
  [eventsState],
  state => state.eventsLoadingInProgress
);

export const eventsNotFoundOrFailedSelector = createSelector(
  [eventsState],
  state => state.eventsNotFoundOrFailed
);

export const cameraEventsSelector = createSelector(
  [eventsState],
  state => state.cameraEvents
);

export const selectedEventsDateSelector = createSelector(
  [eventsState],
  state => state.selectedEventsDate
);
