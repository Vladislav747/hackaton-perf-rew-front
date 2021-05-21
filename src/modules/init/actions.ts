import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  START: `${appName}/${moduleName}/START`,
  COMPLETE: `${appName}/${moduleName}/COMPLETE`,
  FAILED: `${appName}/${moduleName}/FAILED`,
  START_TOKEN_UPDATE: `${appName}/${moduleName}/START_TOKEN_UPDATE`,
  SET_UPDATE_TOKEN_INTERVAL: `${appName}/${moduleName}/SET_UPDATE_TOKEN_INTERVAL`,
  RUN_UPDATE_PROCESS: `${appName}/${moduleName}/RUN_UPDATE_PROCESS`,
  SET_HAS_SEEN_COPYRIGHT_BANNER_VAL: `${appName}/${moduleName}/SET_HAS_SEEN_COPYRIGHT_BANNER_VAL`,
  CHANGE_HAS_SEEN_COPYRIGHT_BANNER_VAL: `${appName}/${moduleName}/CHANGE_HAS_SEEN_COPYRIGHT_BANNER_VAL`,
  SET_HAS_SEEN_REDIRECT_BANNER_VAL: `${appName}/${moduleName}/SET_HAS_SEEN_REDIRECT_BANNER_VAL`,
  СHANGE_HAS_SEEN_REDIRECT_BANNER_VAL: `${appName}/${moduleName}/СHANGE_HAS_SEEN_REDIRECT_BANNER_VAL`,
  SET_LS_VERSION: `${appName}/${moduleName}/SET_LS_VERSION`,
  INIT_DEFAULT_SELECTED: `${appName}/${moduleName}/INIT_DEFAULT_SELECTED`,
  CAMERAS_LIST_READY: `${appName}/${moduleName}/CAMERAS_LIST_READY`,
};

/**
 * actionCreators
 **/

export const camerasReadyAction = () => {
  return {
    type: actionTypes.CAMERAS_LIST_READY,
  };
};

/**
 * Провал инициализации
 * @returns
 */
export const initFailedAction = () => {
  return {
    type: actionTypes.FAILED,
  };
};

/**
 * Начало инициализации
 */
export const initStartAction = () => {
  return {
    type: actionTypes.START,
  };
};

/**
 * Если нет LS то используем стандартное восстановление с Челябинском.
 */
export const initDefaultSelectedAction = () => {
  return {
    type: actionTypes.INIT_DEFAULT_SELECTED,
  };
};

/**
 * Окончание инициализации
 */
export const initCompleteAction = () => {
  return {
    type: actionTypes.COMPLETE,
  };
};

/**
 * Добавить токен обновления
 */
export const addTokenUpdateIntervalAction = () => {
  return {
    type: actionTypes.START_TOKEN_UPDATE,
  };
};

/**
 * Установить токен обновления
 * @param {number} tokenUpdateIntervalVal
 */
export const setUpdateTokenIntervalValAction = (
  tokenUpdateIntervalVal: number
) => {
  return {
    type: actionTypes.SET_UPDATE_TOKEN_INTERVAL,
    payload: {
      tokenUpdateIntervalVal,
    },
  };
};

/**
 * Запустить процесс обновления
 */
export const runUpdateProcessAction = () => {
  return {
    type: actionTypes.RUN_UPDATE_PROCESS,
  };
};

/**
 * Установить значение показа баннера об авторских прав
 */
export const setHasSeenCopyrightBannerValAction = (
  hasSeenCopyrightBannerVal: boolean
) => {
  return {
    type: actionTypes.SET_HAS_SEEN_COPYRIGHT_BANNER_VAL,
    payload: {
      hasSeenCopyrightBannerVal,
    },
  };
};

/**
 * Поменять значение показа баннера об авторских прав
 */
export const changeHasSeenCopyrightBannerValAction = (
  hasSeenCopyrightBannerVal: boolean
) => {
  return {
    type: actionTypes.CHANGE_HAS_SEEN_COPYRIGHT_BANNER_VAL,
    payload: {
      hasSeenCopyrightBannerVal,
    },
  };
};

/**
 * Поменять значение показа баннера о редиректе
 */

export const setHasSeenRedirectBannerValAction = (
  hasSeenRedirectBannerVal: boolean
) => {
  return {
    type: actionTypes.SET_HAS_SEEN_REDIRECT_BANNER_VAL,
    payload: {
      hasSeenRedirectBannerVal,
    },
  };
};

/**
 * Установить значение показа баннера о редиректе
 */
export const changeHasSeenRedirectBannerValAction = (
  hasSeenRedirectBannerVal: boolean
) => {
  return {
    type: actionTypes.СHANGE_HAS_SEEN_REDIRECT_BANNER_VAL,
    payload: {
      hasSeenRedirectBannerVal,
    },
  };
};

/*
 * Установить версию LS
 */
export const setVersionOfLsAction = () => {
  return {
    type: actionTypes.SET_LS_VERSION,
  };
};
