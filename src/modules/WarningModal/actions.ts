import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  OPEN_WARNING_MODAL: `${appName}/${moduleName}/OPEN_WARNING_MODAL`,
  CLEAN_ALL_SELECTED: `${appName}/${moduleName}/CLEAN_ALL_SELECTED`,
  DELETE_ALL_CAMERAS_FLAG: `${appName}/${moduleName}/DELETE_ALL_CAMERAS_FLAG`,
};

/**
 * Установить статус открытого или закрытого модального окна
 * @param {boolean} showWarningModalStatusStore
 */
export const openWarningModalAction = (
  showWarningModalStatusStore: boolean
) => {
  return {
    type: actionTypes.OPEN_WARNING_MODAL,
    payload: {
      showWarningModalStatusStore,
    },
  };
};

/**
 * Очищаем все камеры
 */
export const cleanAllSelectedAction = () => {
  return {
    type: actionTypes.CLEAN_ALL_SELECTED,
  };
};

/**
 * Проверка выбора пользователя очистка/отмена
 * @param {boolean} deleteAllCamerasFlagStore
 */
export const deleteAllCamerasFlagAction = (
  deleteAllCamerasFlagStore: boolean
) => {
  return {
    type: actionTypes.DELETE_ALL_CAMERAS_FLAG,
    payload: {
      deleteAllCamerasFlagStore,
    },
  };
};
