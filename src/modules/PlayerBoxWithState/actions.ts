import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  ADD_PLAYING_ID: `${appName}/${moduleName}/ADD_PLAYING_ID`,
  REMOVE_PLAYING_ID: `${appName}/${moduleName}/REMOVE_PLAYING_ID`,
  SET_PLAYING_ARRAY: `${appName}/${moduleName}/SET_PLAYING_ARRAY`,
  TOGGLE_HD_ALL: `${appName}/${moduleName}/TOGGLE_HD_ALL`,
};

/**
 * Добавить новый id камеры
 * @param {string} id
 */
export const addPlayingIdAction = (id: string) => {
  return {
    type: actionTypes.ADD_PLAYING_ID,
    payload: id,
  };
};

/**
 * Убрать id камеры из проигрываемых
 * @param {string} id
 */
export const removePlayingIdAction = (id: string) => {
  return {
    type: actionTypes.REMOVE_PLAYING_ID,
    payload: id,
  };
};

/**
 * Установить массив проигрываемых id плееров
 * @param {Array<string>} playingArray
 */
export const setPlayingArrayAction = (playingArray: Array<string>) => {
  return {
    type: actionTypes.SET_PLAYING_ARRAY,
    payload: playingArray,
  };
};

/**
 * Установить HD статус
 * @param {boolean} hdStatus
 */
export const toggleHdAllAction = (hdStatus: boolean) => {
  return {
    type: actionTypes.TOGGLE_HD_ALL,
    payload: hdStatus,
  };
};
