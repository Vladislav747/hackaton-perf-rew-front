import { moduleName } from "./module";
import { createSelector } from "reselect";

export const customGroupsModalState = state => state[moduleName];

export const selectShowAddGroupModalStatus = createSelector(
  [customGroupsModalState],
  state => state.showAddGroupModalStatusStore
);

export const selectPersonalGroups = createSelector(
  [customGroupsModalState],
  state => state.personalGroupsStore
);

export const selectActivePersonalGroup = createSelector(
  [customGroupsModalState],
  state => state.activePersonalGroupStore
);

export const selectShowEditGroupModalStatus = createSelector(
  [customGroupsModalState],
  state => state.showEditGroupModalStatusStore
);

export const selectCamsForPersonalGroup = createSelector(
  [customGroupsModalState],
  state => state.camsForPersonalGroupStore
);

export const selectCurrentEditName = createSelector(
  [customGroupsModalState],
  state => state.currentEditNameStore
);

export const selectShowListCustomGroupsModalStatus = createSelector(
  [customGroupsModalState],
  state => state.showListGroupsModalStatusStore
);

export const selectCurrentCameraId = createSelector(
  [customGroupsModalState],
  state => state.currentCameraId
);

export const selectPersonalGroupsForListGroupsModal = createSelector(
  [customGroupsModalState],
  state => state.personalGroupsForListGroupsModal
);

