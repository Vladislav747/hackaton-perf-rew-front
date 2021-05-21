import { moduleName } from "./module";
import { createSelector } from "reselect";

import { objectTypes, getRelationObject, SEARCH_ID } from "../flist/schema";

import { forwardIdState } from "../flist/selectors";

export const customGroupsFlistState = state => state[moduleName];

export const failedLimitedIdsCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.failedLimitedIds
);

export const isInitCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.isInit
);

export const isLoadingCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.isLoading
);

/**
 * Генерация списка для компонента FCamList
 */
export const listCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.listStore
);

/**
 * Генерация списка для компонента FCamList
 */
export const loadingLimitedIdsCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.loadingLimitedIdsForSelect
);

export const selectedObjectsCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.selectedObjects
);

export const objectsInCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state && state.objectsState
);

export const objectCustomGroupSelector = createSelector(
  [objectsInCustomGroupSelector, forwardIdState],
  (objects, id) => objects.byId[id]
);

export const camerasCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.cameras
);

export const groupsCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.groups
);

export const searchStringSelector = createSelector(
  [customGroupsFlistState],
  state => state.searchString
);

export const activeObjectIdCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.activeObjectId
);

export const activeObjectNameCustomGroupSelector = createSelector(
  [
    activeObjectIdCustomGroupSelector,
    objectsInCustomGroupSelector,
    groupsCustomGroupSelector,
    camerasCustomGroupSelector,
  ],
  (activeObjectId, objects, groups, cameras) => {
    const object = objects.byId[activeObjectId];
    const relation = getRelationObject(object, {
      [objectTypes.CAMERA]: cameras,
      [objectTypes.GROUP]: groups,
    });
    return relation ? relation.NAME : null;
  }
);

export const objectParentIdCustomGroupSelector = createSelector(
  [objectCustomGroupSelector],
  state => state && state.parentId
);

/**Может ли данный объект быть выбран для просмотра*/
export const isSelectableCustomGroupSelector = createSelector(
  [objectsInCustomGroupSelector, groupsCustomGroupSelector, forwardIdState],
  (objectsStore, groupsStore, id) => {
    if (id === SEARCH_ID) {
      return false;
    }
    if (objectsStore && objectsStore.byId[id]) {
      /** Это камера? */
      if (objectsStore.byId[id].RELATION_OBJECT === objectTypes.CAMERA) {
        return true;
      }
      /** Это папка камер? */
      if (objectsStore.byId[id].RELATION_OBJECT === objectTypes.GROUP) {
        if (
          Array.isArray(objectsStore.byId[id].children) &&
          objectsStore.byId[id].children.length > 0
        ) {
          let result = true;
          objectsStore.byId[id].children.forEach(childId => {
            const groupRelation = getRelationObject(
              objectsStore.byId[childId],
              {
                [objectTypes.GROUP]: groupsStore,
              }
            );
            if (groupRelation && groupRelation.ID) {
              result = false;
            } else {
              result = true;
            }
          });
          return result;
        }
        return false;
      }
    }
    return false;
  }
);

export const fullSelectedGroupsCustomGroupSelector = createSelector(
  [customGroupsFlistState],
  state => state.fullSelectedGroups
);

export const linkNameSelector = createSelector(
  [customGroupsFlistState],
  state => state.linkName
);
