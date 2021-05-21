import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  SET_VOLUME_LEVEL: `${appName}/${moduleName}/SET_VOLUME_LEVEL`,
  SET_MUTE_STATUS: `${appName}/${moduleName}/SET_MUTE_STATUS`,
  FIVE_SECONDS_BACK: `${appName}/${moduleName}/FIVE_SECONDS_BACK`,
  FIVE_SECONDS_FORWARD: `${appName}/${moduleName}/FIVE_SECONDS_FORWARD`,
  UPDATE_VIDEO_PROGRESS: `${appName}/${moduleName}/UPDATE_VIDEO_PROGRESS`,
  SET_NEED_USER_START_PLAY_MANUAL: `${appName}/${moduleName}/SET_NEED_USER_START_PLAY_MANUAL`,
  SET_SPEED_COEFFICIENT: `${appName}/${moduleName}/SET_SPEED_COEFFICIENT`,
  SET_HD_VIDEO: `${appName}/${moduleName}/SET_HD_VIDEO`,
  SET_IS_PLAYING_STATE: `${appName}/${moduleName}/SET_IS_PLAYING_STATE`,
};

export const setIsPlayingAction = (isPlaying: boolean) => {
  return {
    type: actionTypes.SET_IS_PLAYING_STATE,
    payload: {
      isPlaying,
    },
  };
};

export const setSpeedСoefficientAction = (speedСoefficient: number) => {
  return {
    type: actionTypes.SET_SPEED_COEFFICIENT,
    payload: {
      speedСoefficient,
    },
  };
};

export const setNeedUserStartPlayFlagAction = (status: boolean) => {
  return {
    type: actionTypes.SET_NEED_USER_START_PLAY_MANUAL,
    payload: {
      userNeedToStartPlayManual: status,
    },
  };
};

export const updateVideoProgressAction = (currentVideoTime: number) => ({
  type: actionTypes.UPDATE_VIDEO_PROGRESS,
  payload: {
    currentVideoTime,
  },
});

/**
 * Установить уровень громкости
 * @param {string} volumeLevel - уровень звука
 * @param {boolean} muteIconClicked -
 */
export const setVolumeLevelAction = (
  volumeLevel: string,
  muteIconClicked: boolean = false
) => ({
  type: actionTypes.SET_VOLUME_LEVEL,
  payload: {
    volumeLevel,
    muteIconClicked,
  },
});

/**
 * Установить режим со звуком/без звука
 * @param {boolean} muteStatus
 */
export const setMuteStatusAction = (muteStatus: boolean) => ({
  type: actionTypes.SET_MUTE_STATUS,
  payload: {
    muteStatus,
  },
});

export const setHdStateAction = (hdState: boolean) => {
  return {
    type: actionTypes.SET_HD_VIDEO,
    payload: {
      hdState,
    },
  };
};
