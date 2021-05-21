import { actionTypes } from "./actions";
import { actionTypes as flistActionTypes } from "../flist";
import { stateSchema } from "./schema";

export default (state = { ...stateSchema }, action) => {
  switch (action.type) {
    case actionTypes.SET_FULLSCREEN_ID: {
      const fsId = action.payload.fsId;
      return {
        ...state,
        fsId,
      };
    }
    case actionTypes.SET_PLAY_ALL_STATE: {
      const playAllState = action.payload.state;
      return {
        ...state,
        playAllState,
      };
    }
    case actionTypes.SET_CALCULATED_NUM: {
      const gridCalculatedNum = action.payload.num;
      return {
        ...state,
        gridCalculatedNum,
      };
    }
    case flistActionTypes.INIT_LIST_COMPLETE: {
      return {
        ...state,
        showSceleton: false,
      };
    }
    case actionTypes.CHANGE_VIEW_GRID_TYPE: {
      const currentViewType = action.payload.newViewType;
      return {
        ...state,
        currentViewType,
      };
    }
    case actionTypes.CHANGE_SORT_TYPE: {
      const currentSortFunctionName = action.payload.newSortFunctionName;
      const currentSortFunctionType = action.payload.type;
      return {
        ...state,
        currentSortFunctionName,
        sortType: currentSortFunctionType,
      };
    }
    case actionTypes.ADD_PLAYING_ID: {
      const playStateIds = [...state.playStateIds, action.payload.id];
      return {
        ...state,
        playStateIds,
      };
    }
    case actionTypes.PUT_ACTIVE_CAMERAS: {
      const activePlayerCams = [
        ...state.activePlayerCams,
        ...action.payload.id,
      ];
      return {
        ...state,
        activePlayerCams,
      };
    }
    case actionTypes.FILTER_ACTIVE_CAMERAS: {
      const activePlayerCams = [...action.payload.id];
      return {
        ...state,
        activePlayerCams,
      };
    }
    default: {
      return state;
    }
  }
};
