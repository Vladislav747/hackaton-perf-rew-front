import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  ADD_CAMERA_TO_FAVOURITES: `${appName}/${moduleName}/ADD_CAMERA_TO_FAVOURITES`,
  DELETE_CAMERA_FROM_FAVOURITES: `${appName}/${moduleName}/DELETE_CAMERA_FROM_FAVOURITES`,
  GET_CAMERAS_FROM_FAVOURITES: `${appName}/${moduleName}/GET_CAMERAS_FROM_FAVOURITES`,
  SET_CAMERAS_TO_FAVOURITES: `${appName}/${moduleName}/SET_CAMERAS_TO_FAVOURITES`,
  UPDATE_CAMERAS_IN_FAVOURITES: `${appName}/${moduleName}/UPDATE_CAMERAS_IN_FAVOURITES`,
  SET_FAVOURITE_ID_GROUP: `${appName}/${moduleName}/SET_FAVOURITE_ID_GROUP`,
  CHOOSE_FAVOURITES: `${appName}/${moduleName}/CHOOSE_FAVOURITES`,
};

/**
 * actionCreators
 **/

/**
 * Добавить  новую камеру в избранные
 */
export const addCameraToFavouritesAction = (cameraId: number) => {
  return {
    type: actionTypes.ADD_CAMERA_TO_FAVOURITES,
    payload: {
      cameraId,
    },
  };
};

/**
 * Добавить  новую камеру в избранные
 */
export const deleteCameraFromFavouritesAction = (cameraId: number) => {
  return {
    type: actionTypes.DELETE_CAMERA_FROM_FAVOURITES,
    payload: {
      cameraId,
    },
  };
};

/**
 * Установить камеры в избранные
 * @param {number[]} favouritesCameras
 */
export const setCamerasToFavouritesAction = (favouritesCameras: number[]) => {
  return {
    type: actionTypes.SET_CAMERAS_TO_FAVOURITES,
    payload: {
      favouritesCameras,
    },
  };
};

/**
 * Получить все камеры из избранного
 */
/**
 *
 */
export const getCamerasFromFavouritesAction = () => {
  return {
    type: actionTypes.GET_CAMERAS_FROM_FAVOURITES,
  };
};

export const setFavouriteIdGroupAction = (favouriteGroupId: number) => {
  return {
    type: actionTypes.SET_FAVOURITE_ID_GROUP,
    payload: {
      favouriteGroupId,
    },
  };
};

/**
 * Обновить камеры
 */
export const updateCamerasInFavouritesAction = (
  favouritesCameras: number[]
) => {
  return {
    type: actionTypes.UPDATE_CAMERAS_IN_FAVOURITES,
    payload: {
      favouritesCameras,
    },
  };
};

export const chooseFavouritesAction = () => {
  return {
    type: actionTypes.CHOOSE_FAVOURITES,
  };
};
