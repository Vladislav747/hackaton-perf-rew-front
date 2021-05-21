import { actionTypes } from "./actions";
import { stateSchema } from "./schema";

export default (state = { ...stateSchema }, action: Action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_HD_ALL: {
      const hdAllStatus = action.payload;
      return {
        ...state,
        hdAllStatus,
      };
    }
    case actionTypes.ADD_PLAYING_ID: {
      const id = action.payload;
      if (state?.playStateIds.indexOf(id) == -1) {
        const playgId = [...state.playStateIds];
        const playStateIds = [...playgId, id];
        return {
          ...state,
          playStateIds,
        };
      } else {
        return state;
      }
    }
    case actionTypes.REMOVE_PLAYING_ID: {
      const id = action.payload.id;
      const idInArray = state.playStateIds.indexOf(id);
      if (idInArray != -1) {
        const playgId = [...state.playStateIds];
        const playStateIds = [...playgId.splice(idInArray, 1)];
        return {
          ...state,
          playStateIds,
        };
      } else {
        return state;
      }
    }
    case actionTypes.SET_PLAYING_ARRAY: {
      const playStateIds = action.payload;
      return {
        ...state,
        playStateIds,
      };
    }
    default: {
      return state;
    }
  }
};
