import { actionTypes } from "./actions";
import { stateSchema } from "./schema";

export default (state = { ...stateSchema }, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.OPEN_ADD_GROUP_MODAL: {
      const { showAddGroupModalStatusStore } = payload;
      return {
        ...state,
        showAddGroupModalStatusStore,
      };
    }

    case actionTypes.OPEN_EDIT_GROUP_MODAL: {
      const { showEditGroupModalStatusStore } = payload;
      return {
        ...state,
        showEditGroupModalStatusStore,
      };
    }

    case actionTypes.OPEN_LIST_GROUPS_MODAL: {
      const { showListGroupsModalStatusStore } = payload;
      return {
        ...state,
        showListGroupsModalStatusStore,
      };
    }

    case actionTypes.SET_PERSONAL_GROUPS_FOR_USER: {
      const { personalGroupsStore } = payload;
      return {
        ...state,
        personalGroupsStore,
      };
    }

    case actionTypes.SET_ACTIVE_PERSONAL_GROUP: {
      const { activePersonalGroupArg } = payload;
      return {
        ...state,
        activePersonalGroupStore: activePersonalGroupArg,
      };
    }

    case actionTypes.SET_CURRENT_GROUP_NAME: {
      const { currentEditName } = payload;
      return {
        ...state,
        currentEditNameStore: currentEditName,
      };
    }

    case actionTypes.SET_CAMS_LIST_EDIT_MODE: {
      const { camsForPersonalGroupStore } = payload;
      return {
        ...state,
        camsForPersonalGroupStore,
      };
    }

    case actionTypes.SET_CURRENT_CAMERA_ID: {
      const { currentCameraId } = payload;

      return {
        ...state,
        currentCameraId,
      };
    }

    default: {
      return state;
    }
  }
};
