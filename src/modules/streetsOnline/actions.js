import { moduleName } from "./module";
const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  CHANGE_VIEW_GRID_TYPE: `${appName}/${moduleName}/CHANGE_VIEW_GRID_TYPE`,
  CHANGE_SORT_TYPE: `${appName}/${moduleName}/CHANGE_SORT_TYPE`,
  CHANGE_CAMERAS_READY_STATE: `${appName}/${moduleName}/CHANGE_CAMERAS_READY_STATE`,
  ADD_PLAYING_ID: `${appName}/${moduleName}/ADD_PLAYING_ID`,
  SET_FULLSCREEN_MODE: `${appName}/${moduleName}/SET_FULLSCREEN_MODE`,
  SET_CALCULATED_NUM: `${appName}/${moduleName}/SET_CALCULATED_NUM`,
  SET_PLAY_ALL_STATE: `${appName}/${moduleName}/SET_PLAY_ALL_STATE`,
  SET_FULLSCREEN_ID: `${appName}/${moduleName}/SET_FULLSCREEN_ID`,
  ADD_CAMERA_TO_ACTIVE: `${appName}/${moduleName}/ADD_CAMERA_TO_ACTIVE`,
  REMOVE_CAMERA_FROM_ACTIVE: `${appName}/${moduleName}/REMOVE_CAMERA_FROM_ACTIVE`,
  PUT_ACTIVE_CAMERAS: `${appName}/${moduleName}/PUT_ACTIVE_CAMERAS`,
  CLEAN_ACTIVE_CAMERAS: `${appName}/${moduleName}/CLEAN_ACTIVE_CAMERAS`,
  FILTER_ACTIVE_CAMERAS: `${appName}/${moduleName}/FILTER_ACTIVE_CAMERAS`,
};

export const cleanActiveCameras = () => {
  return {
    type: actionTypes.CLEAN_ACTIVE_CAMERAS,
  };
};

export const setFsId = fsId => {
  return {
    type: actionTypes.SET_FULLSCREEN_ID,
    payload: {
      fsId,
    },
  };
};

export const setPlayAll = state => {
  return {
    type: actionTypes.SET_PLAY_ALL_STATE,
    payload: {
      state,
    },
  };
};

export const setCalculatedNum = num => {
  return {
    type: actionTypes.SET_CALCULATED_NUM,
    payload: {
      num,
    },
  };
};

export const setFullscreenMode = fullscreenMode => {
  return {
    type: actionTypes.SET_FULLSCREEN_MODE,
    payload: {
      fullscreenMode,
    },
  };
};

export const setCamerasReadyState = newCamerasReadyState => {
  return {
    type: actionTypes.CHANGE_CAMERAS_READY_STATE,
    payload: {
      newCamerasReadyState,
    },
  };
};

export const changeViewType = newViewType => {
  return {
    type: actionTypes.CHANGE_VIEW_GRID_TYPE,
    payload: {
      newViewType,
    },
  };
};

export const changeSortType = (newSortFunctionName, type) => {
  return {
    type: actionTypes.CHANGE_SORT_TYPE,
    payload: {
      newSortFunctionName,
      type: type,
    },
  };
};

export const addPlayingId = id => {
  return {
    type: actionTypes.ADD_PLAYING_ID,
    payload: {
      id,
    },
  };
};

/**
 * Добавить камеру к активным камерам
 * @param {*} id -  id камеры
 */
export const addCameraToActiveAction = id => {
  return {
    type: actionTypes.ADD_CAMERA_TO_ACTIVE,
    payload: {
      id,
    },
  };
};

/**
 * Удалить камеру из активных камер по id
 * @param {*} id -  id камеры
 */
export const removeCameraFromActiveAction = id => {
  return {
    type: actionTypes.REMOVE_CAMERA_FROM_ACTIVE,
    payload: {
      id,
    },
  };
};

/**
 * Обновить список активных камер (полностью переписать)
 * @param {*} id - id камеры
 */
export const putActiveCamerasAction = id => {
  return {
    type: actionTypes.PUT_ACTIVE_CAMERAS,
    payload: {
      id,
    },
  };
};

/**
 * Фильтровать список активных камер
 * @param {*} id - id камеры
 */
export const filterActiveCamerasAction = id => {
  return {
    type: actionTypes.FILTER_ACTIVE_CAMERAS,
    payload: {
      id,
    },
  };
};
