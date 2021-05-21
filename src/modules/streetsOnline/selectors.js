import { moduleName } from "./module";
import { createSelector } from "reselect";

export const initState = (state) => state[moduleName];

export const selectCurrentView = createSelector(
  [initState],
  (state) => state.currentViewType
);

export const selectCurrentSortFunctionName = createSelector(
  [initState],
  (state) => state.currentSortFunctionName
);

export const selectShowSceleton = createSelector(
  [initState],
  (state) => state.showSceleton
);

/*export const selectPlayStateIds = createSelector(
    [initState],
    state => state.playStateIds
)*/

export const selectCurrentSortType = createSelector(
  [initState],
  (state) => state.sortType
);

export const selectFullscreenMode = createSelector(
  [initState],
  (state) => state.fullscreenMode
);

export const selectCalculatedNum = createSelector(
  [initState],
  (state) => state.gridCalculatedNum
);

export const selectPlayAll = createSelector(
  [initState],
  (state) => state.playAllState
);

export const selectFsId = createSelector([initState], (state) => state.fsId);

export const selectActivePlayerCams = createSelector(
  [initState],
  (state) => state.activePlayerCams
);
