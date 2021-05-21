import { moduleName } from "./module";
import { createSelector } from "reselect";
import _ from "lodash";

import { validateCameraObject } from "../../helpers/streetsOnlineElements/serviceFunctions";

//@ts-ignore
export const newFListState = (state: NewFlistSchema) => state[moduleName];

const forwardGroupIdState = (state: NewFlistSchema, { groupId }: any) =>
  groupId;

export const loadingProgressSelector = createSelector(
  [newFListState],
  state => state.loadingProgress
);

export const groupContentSelector = createSelector(
  [newFListState],
  //@ts-ignore
  (state: NewFlistSchema, groupId: number) =>
    state.groupsContentById[groupId] ? state.groupsContentById[groupId] : []
);

export const currentGroupContentSelector = createSelector(
  [newFListState],
  (state: NewFlistSchema) => {
    if (!state.currentSelectedGroupId && state.currentSelectedGroupId != 0) {
      return [];
    } else {
      //@ts-ignore
      return state.groupsContentById[state.currentSelectedGroupId]
        ? //@ts-ignore
          Object.values(
            //@ts-ignore
            state.groupsContentById[state.currentSelectedGroupId].content
          )
        : [];
    }
  }
);

export const selectedCamerasSelector = createSelector(
  [newFListState],
  state => state.selectedCamerasIds
);

export const isLoadingSelector = createSelector(
  [newFListState],
  state => state.isLoading
);

export const getGroupByGroupId = createSelector(
  [forwardGroupIdState, newFListState],
  //@ts-ignore
  (groupId: number, state: NewFlistSchema) => state.groups[groupId]
);

export const getGroupContentById = createSelector(
  [forwardGroupIdState, newFListState],
  //@ts-ignore
  (groupId: number, state: NewFlistSchema) => state.groupsContentById[groupId]
);

export const getParentIdByGroupId = createSelector(
  [forwardGroupIdState, newFListState],
  (groupId: number | customGroupId, state: NewFlistSchema) => {
    //@ts-ignore
    if (state.groups[groupId]) {
      //@ts-ignore
      return state.groups[groupId].parentId;
    } else if (groupId == 16) {
      return 0;
    } else {
      return null;
    }
  }
);

export const isInitSelector = createSelector(
  [newFListState],
  state => state.isInit
);

export const isContentFullSelectedSelector = createSelector(
  [forwardGroupIdState, newFListState],
  (groupId: number, state: NewFlistSchema) => {
    /**
     * 1) Проверяем, что в контенте группы только камеры
     * 2) Проверяем, содержатся ли все эти камеры в массиве "selected"
     */
    const camsInGroup: any[] = [];
    const selectedIdList = state.selectedCamerasIds;
    if (!state.groupsContentById[groupId]) {
      return false;
    }

    //@ts-ignore
    const content = Object.values(state.groupsContentById[groupId].content);
    content.forEach((element: any) => {
      if (element.OBJECT === "CAMERA") {
        camsInGroup.push(element.ID);
      }
    });
    //@ts-ignore
    return _.without(camsInGroup, ...selectedIdList).length == 0;
  }
);

export const selectedCamerasContentSelector = createSelector(
  [newFListState],
  state => {
    const camerasListForView = [];

    for (let cameraId of state.selectedCamerasIds) {
      const obj = state.cameras[cameraId];

      if (obj?.NAME) {
        const validatedObject = validateCameraObject(obj);
        if (validatedObject.VALID) camerasListForView.push(obj);
      }
    }

    return camerasListForView;
  }
);

export const isContentSelectableSelector = createSelector(
  [forwardGroupIdState, newFListState],
  (groupId: number, state: NewFlistSchema) => {
    /**
     * 1) Проверяем, что в контенте нет групп
     */
    if (!state.groupsContentById[groupId]) return false;
    //@ts-ignore
    const content = Object.values(state.groupsContentById[groupId].content);
    return (
      content.find((element: any) => element.OBJECT === "GROUP") === undefined
    );
  }
);

export const currentSelectedGroupIdSelector = createSelector(
  [newFListState],
  (state: NewFlistSchema) => state.currentSelectedGroupId
);

export const currentGroupNameSelector = createSelector(
  [newFListState],
  (state: NewFlistSchema) =>
    //@ts-ignore
    state?.groups[state.currentSelectedGroupId]?.content?.NAME
);

export const currentGroupParentIdSelector = createSelector(
  [newFListState],
  (state: NewFlistSchema) => {
    //@ts-ignore
    return state?.groupsContentById[state.currentSelectedGroupId]?.parentId;
  }
);

export const groupsSelector = createSelector(
  [newFListState],
  (state: NewFlistSchema) => state.groups
);

export const searchStringSelector = createSelector(
  [newFListState],
  state => state.searchString
);
