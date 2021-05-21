import { moduleName } from "./module";
import { createSelector } from "reselect";
import {
  objectTypes,
  getRelationObject,
  getIdByObjectKey,
  SEARCH_ID,
} from "./schema";

import { validateCameraObject } from "../../helpers/streetsOnlineElements/serviceFunctions";
/**
 * селекторы
 */
export const fListState = state => state[moduleName];

export const forwardIdState = (state, { id }) => id;

export const loadingProgressSelector = createSelector(
  [fListState],
  state => state.loadingProgress
);

export const failedLimitedIdsSelector = createSelector(
  [fListState],
  state => state.failedLimitedIds
);

export const loadingLimitedIdsSelector = createSelector(
  [fListState],
  state => state.loadingLimitedIdsForSelect
);

export const camerasSelector = createSelector(
  [fListState],
  state => state.cameras
);

export const selectedObjectsSelector = createSelector(
  [fListState],
  state => state.selectedObjects
);

export const rootIsLoadedSelector = createSelector(
  [fListState],
  state => state.rootIsLoaded
);

export const fullSelectedGroupsSelector = createSelector(
  [fListState],
  state => state.fullSelectedGroups
);

export const searchStringSelector = createSelector(
  [fListState],
  state => state.searchString
);

export const groupsSelector = createSelector(
  [fListState],
  state => state.groups
);

export const isInitSelector = createSelector(
  [fListState],
  state => state.isInit
);

export const groupSelector = createSelector(
  [groupsSelector, forwardIdState],
  (groups, id) => groups.byId[id]
);

export const objectsStateSelector = createSelector(
  [fListState],
  state => state && state.objectsState
);

export const objectStateSelector = createSelector(
  [objectsStateSelector, forwardIdState],
  (objects, id) => objects.byId[id]
);

export const objectStateIsLoadedSelector = createSelector(
  [objectStateSelector],
  state => state && state.isLoaded
);

export const objectStateParentIdSelector = createSelector(
  [objectStateSelector],
  state => state && state.parentId
);

export const activeObjectIdSelector = createSelector(
  [fListState],
  state => state.activeObjectId
);

/**
 * Генерация списка для компонента FCamList
 */
export const listSelector = createSelector(
  [fListState],
  state => state.listStore
);

export const isLoadingSelector = createSelector(
  [fListState],
  state => state.isLoading
);

export const activeObjectNameSelector = createSelector(
  [
    activeObjectIdSelector,
    objectsStateSelector,
    groupsSelector,
    camerasSelector,
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

export const selectedCamerasSelector = createSelector([fListState], state => {
  const camerasListForView = [];

  for (let objectKey of state.selectedObjects) {
    const obj = getRelationObject(
      { RELATION_OBJECT: "cameras", relationId: getIdByObjectKey(objectKey) },
      state
    );

    if (obj?.NAME) {
      const validatedObject = validateCameraObject(obj);
      if (validatedObject.VALID) camerasListForView.push(obj);
    }
  }
  return camerasListForView;
});

/**Может ли данный объект быть выбран для просмотра*/
export const isSelectableSelector = createSelector(
  [objectsStateSelector, groupsSelector, forwardIdState],
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
