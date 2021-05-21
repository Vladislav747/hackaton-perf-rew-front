import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  SET_CAMERA_DATA: `${appName}/${moduleName}/SET_CAMERA_DATA`,
  CLEAN_CAMERA_DATA: `${appName}/${moduleName}/CLEAN_CAMERA_DATA`,
  GENERATE_NEXT_PLAYLIST: `${appName}/${moduleName}/GENERATE_NEXT_PLAYLIST`,
  SET_LIVE: `${appName}/${moduleName}/SET_LIVE`,
  UPDATE_CAMERA_DATA_START: `${appName}/${moduleName}/UPDATE_CAMERA_DATA_START`,
  SET_MODAL_IS_OPEN: `${appName}/${moduleName}/SET_MODAL_IS_OPEN`,
  CAMERA_DATA_NOT_FOUND_ERROR: `${appName}/${moduleName}/CAMERA_DATA_NOT_FOUND_ERROR`,
  SET_CURRENT_VIDEO_TIMESTAMP_ON_CLICK: `${appName}/${moduleName}/SET_CURRENT_VIDEO_TIMESTAMP_ON_CLICK`,
  SET_CURRENT_VIDEO_TIMESTAMP_ON_CALENDAR_CHANGE: `${appName}/${moduleName}/SET_CURRENT_VIDEO_TIMESTAMP_ON_CALENDAR_CHANGE`,
  UPDATE_PROGRESS_BAR: `${appName}/${moduleName}/UPDATE_PROGRESS_BAR`,
  SET_DOWNLOAD_MODE: `${appName}/${moduleName}/SET_DOWNLOAD_MODE`,
  SET_DOWNLOAD_RANGE: `${appName}/${moduleName}/SET_DOWNLOAD_RANGE`,
  SET_DOWNLOAD_NAME: `${appName}/${moduleName}/SET_DOWNLOAD_NAME`,
  SET_DOWNLOAD_LINK: `${appName}/${moduleName}/SET_DOWNLOAD_LINK`,
  START_DOWNLOAD_VIDEO_WORKER: `${appName}/${moduleName}/START_DOWNLOAD_VIDEO_WORKER`,
  VIDEO_DOWNLOAD_FAILED: `${appName}/${moduleName}/VIDEO_DOWNLOAD_FAILED`,
  VIDEO_DOWNLOAD_SUCCESS: `${appName}/${moduleName}/VIDEO_DOWNLOAD_SUCCESS`,
  SET_CURRENT_VIDEO_TIMESTAMP_ON_SHIFT: `${appName}/${moduleName}/SET_CURRENT_VIDEO_TIMESTAMP_ON_SHIFT`,
  SET_CURRENT_PLAYLIST_DURATION: `${appName}/${moduleName}/SET_CURRENT_PLAYLIST_DURATION`,
  SET_LOADING_PROGRESS: `${appName}/${moduleName}/SET_LOADING_PROGRESS`,
};

export const setCurrentPlaylistDurarionAction = (
  currentPlaylistDurarion: number
) => ({
  type: actionTypes.SET_CURRENT_PLAYLIST_DURATION,
  payload: {
    currentPlaylistDurarion,
  },
});

export const setCurrentVideoTimestampOnCalendarAction = (
  currentVideoTimestamp: number
) => {
  return {
    type: actionTypes.SET_CURRENT_VIDEO_TIMESTAMP_ON_CALENDAR_CHANGE,
    payload: {
      currentVideoTimestamp,
    },
  };
};

export const updateProgressBarAction = (
  currentVideoOffsetInSeconds: number
) => {
  return {
    type: actionTypes.UPDATE_PROGRESS_BAR,
    payload: {
      currentVideoOffsetInSeconds,
    },
  };
};

export const setCameraDataAction = (cameraData: cameraData) => {
  return {
    type: actionTypes.SET_CAMERA_DATA,
    payload: {
      cameraData,
    },
  };
};

export const cleanCameraDataAction = () => {
  return {
    type: actionTypes.CLEAN_CAMERA_DATA,
  };
};

export const setLiveAction = (live: boolean, url: string) => {
  return {
    type: actionTypes.SET_LIVE,
    payload: {
      live,
      url,
    },
  };
};

export const generateNextPlaylistAction = () => {
  return {
    type: actionTypes.GENERATE_NEXT_PLAYLIST,
  };
};

export const setIsOpenModalStateAction = (isOpenModalState: boolean) => {
  return {
    type: actionTypes.SET_MODAL_IS_OPEN,
    payload: {
      isOpenModalState,
    },
  };
};

export const updateCameraDataAction = (cameraId: number) => {
  return {
    type: actionTypes.UPDATE_CAMERA_DATA_START,
    payload: {
      cameraId,
    },
  };
};

export const setCurrentVideoTimestampOnShiftAction = (
  // + / -
  offset: number
) => {
  return {
    type: actionTypes.SET_CURRENT_VIDEO_TIMESTAMP_ON_SHIFT,
    payload: {
      offset,
    },
  };
};

export const setCurrentVideoTimestampAction = (
  currentVideoTimestamp: number
) => {
  return {
    type: actionTypes.SET_CURRENT_VIDEO_TIMESTAMP_ON_CLICK,
    payload: {
      currentVideoTimestamp,
    },
  };
};

/**
 * Установка Режима "Скачивание видео"
 * @param downloadMode
 * @returns
 */
export const setDownloadModeAction = (downloadMode: boolean) => {
  return {
    type: actionTypes.SET_DOWNLOAD_MODE,
    payload: {
      downloadMode,
    },
  };
};

/**
 * Установка отрезка для скачивания
 * @param downloadRangeArray
 * @returns
 */
export const setDownloadRangeArrayAction = (downloadRangeArray: Date[]) => {
  return {
    type: actionTypes.SET_DOWNLOAD_RANGE,
    payload: {
      downloadRangeArray,
    },
  };
};

/**
 * Установить ссылку для скачивания
 * @param data
 */
export const setDownloadLinkAction = (downloadLink: any) => {
  return {
    type: actionTypes.SET_DOWNLOAD_LINK,
    payload: {
      downloadLink,
    },
  };
};

/**
 * Установить имя файла для скачивания
 * @param data
 */
export const setDownloadNameAction = (name: any) => {
  return {
    type: actionTypes.SET_DOWNLOAD_NAME,
    payload: {
      name,
    },
  };
};

/**
 * Запуск скачивания видео
 * @param data
 * @returns
 */
export const startDownloadVideo = (data: downloadVideoData) => {
  return {
    type: actionTypes.START_DOWNLOAD_VIDEO_WORKER,
    payload: data,
  };
};

/**
 * Установить статус загрузки
 * @param {boolean} loadingStatus
 */
export const setLoadingProgressAction = (loadingStatus: Boolean) => {
  return {
    type: actionTypes.SET_LOADING_PROGRESS,
    payload: loadingStatus,
  };
};
