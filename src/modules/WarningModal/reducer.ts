import { actionTypes } from "./actions";
import { stateSchema } from "./schema";

export default (state = { ...stateSchema }, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.OPEN_WARNING_MODAL: {
      const { showWarningModalStatusStore } = payload;
      return {
        ...state,
        showWarningModalStatusStore,
      };
    }

    case actionTypes.DELETE_ALL_CAMERAS_FLAG: {
      const { deleteAllCamerasFlagStore } = payload;
      return {
        ...state,
        deleteAllCamerasFlagStore,
      };
    }

    default: {
      return state;
    }
  }
};
