import { actionTypes } from "./actions";
import { StateSchema } from "./schema";

/**
 *reducer
 **/
export default (state = { ...StateSchema }, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_MUTE_STATUS: {
      const { muteStatus } = payload;
      return { ...state, muteStatusStore: muteStatus };
    }
    case actionTypes.SET_VOLUME_LEVEL: {
      const { volumeLevel } = payload;
      return { ...state, volumeLevelStore: volumeLevel };
    }
    case actionTypes.SET_HD_VIDEO: {
      const { hdState } = payload;
      return {
        ...state,
        hdState,
      };
    }
    case actionTypes.SET_SPEED_COEFFICIENT: {
      const { speedСoefficient } = payload;
      return {
        ...state,
        speedСoefficient,
      };
    }
    case actionTypes.SET_IS_PLAYING_STATE: {
      const { isPlaying } = payload;
      return {
        ...state,
        isPlaying,
        live: state.userNeedToStartPlayManual,
        userNeedToStartPlayManual: false,
      };
    }
    default:
      return state;
  }
};
