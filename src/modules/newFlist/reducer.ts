import { actionTypes } from "./actions";
import { StateSchema } from "./schema";

import {
  splitUserGroupsContentForRedux,
  mergeGroupsContentById,
} from "./helpers";

export default (state = { ...StateSchema }, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_LIMITED_CAMERAS_DATA: {
      const { camerasData } = payload;

      const mergedCamerasList = Object.assign(state.cameras, camerasData);

      return {
        ...state,
        cameras: mergedCamerasList,
      };
    }
    case actionTypes.GET_GROUP_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.TOGGLE_SELECTED_IDS_FINISH: {
      const { selectedCamerasIds } = payload;

      return {
        ...state,
        selectedCamerasIds,
      };
    }
    case actionTypes.INIT_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.SET_CURRENT_SELECTED_GROUP_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.SET_CURRENT_SELECTED_GROUP_FINISH: {
      const { groupId } = payload;

      return {
        ...state,
        currentSelectedGroupId: groupId,
        isLoading: false,
      };
    }
    case actionTypes.GET_GROUP_COMPLETE: {
      const { parentId, groupContent, groupId } = payload;

      const { cameras, groups } = splitUserGroupsContentForRedux(
        state.cameras,
        state.groups,
        groupContent,
        parentId
      );

      const groupsContentById = mergeGroupsContentById(
        state.groupsContentById,
        groupContent,
        groupId,
        parentId
      );

      return {
        ...state,
        cameras,
        groups,
        groupsContentById,
        isLoading: false,
      };
    }

    case actionTypes.ADD_GROUP_TO_GROUPS_STORE: {
      const { parentId, groupContent } = payload;

      const { groups } = splitUserGroupsContentForRedux(
        state.cameras,
        state.groups,
        groupContent,
        parentId
      );

      return {
        ...state,
        groups,
      };
    }

    case actionTypes.SET_IS_LOADING: {
      const { status } = payload;

      return {
        ...state,
        isLoading: status,
      };
    }

    case actionTypes.GET_GROUP_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case actionTypes.SET_CURRENT_SELECTED_GROUP_ID: {
      const { currentSelectedGroupId } = payload;

      return {
        ...state,
        currentSelectedGroupId,
      };
    }

    case actionTypes.SET_SELECTED_OBJECTS_FINISH: {
      const { selectedObjects } = payload;

      return {
        ...state,
        selectedCamerasIds: selectedObjects,
      };
    }
    default:
      return state;
  }
};
