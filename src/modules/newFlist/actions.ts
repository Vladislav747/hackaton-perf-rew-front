import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  /* Инициализация списка. Тут будет происходить выгрузка списка id из localstorage и подгрузка инфо GetLimitedIds. */
  INIT_LIST_START: `${appName}/${moduleName}/INIT_LIST_START`,
  INIT_LIST_COMPLETE: `${appName}/${moduleName}/INIT_LIST_COMPLETE`,
  /* Экшены для работы с группами */
  GET_GROUP_START: `${appName}/${moduleName}/GET_GROUP_START`,
  GET_GROUP_COMPLETE: `${appName}/${moduleName}/GET_GROUP_COMPLETE`,
  GET_GROUP_ERROR: `${appName}/${moduleName}/GET_GROUP_ERROR`,
  ADD_GROUP_TO_GROUPS_STORE: `${appName}/${moduleName}/ADD_GROUP_TO_GROUPS_STORE`,

  /* Установка группы как текущей */
  SET_CURRENT_SELECTED_GROUP_START: `${appName}/${moduleName}/SET_CURRENT_SELECTED_GROUP_START`,
  SET_CURRENT_SELECTED_GROUP_FINISH: `${appName}/${moduleName}/SET_CURRENT_SELECTED_GROUP_FINISH`,
  SET_CURRENT_SELECTED_GROUP_ID: `${appName}/${moduleName}/SET_CURRENT_SELECTED_GROUP_ID`,
  /* Экшен с передачей списком ids для переключения */
  TOGGLE_SELECTED_IDS_START: `${appName}/${moduleName}/TOGGLE_SELECTED_IDS_START`,
  TOGGLE_SELECTED_IDS_FINISH: `${appName}/${moduleName}/TOGGLE_SELECTED_IDS_FINISH`,
  /* Для обработки экшенов в хедере */
  CLEAN_ALL_SELECTED: `${appName}/${moduleName}/CLEAN_ALL_SELECTED`,
  SELECT_ALL_CAMERAS_IN_CURRENT_GROUP: `${appName}/${moduleName}/SELECT_ALL_CAMERAS_IN_CURRENT_GROUP`,
  SET_SELECTED_OBJECTS_START: `${appName}/${moduleName}/SET_SELECTED_OBJECTS_START`,
  SET_SELECTED_OBJECTS_FINISH: `${appName}/${moduleName}/SET_SELECTED_OBJECTS_FINISH`,
  /* Экшены по лимитированным данных о камерах */
  SET_LIMITED_CAMERAS_DATA: `${appName}/${moduleName}/SET_LIMITED_CAMERAS_DATA`,
  /* Для обработки поиска в хедере */
  CHANGE_SEARCH_STRING: `${appName}/${moduleName}/CHANGE_SEARCH_STRING`,
  SEARCH_START: `${appName}/${moduleName}/SEARCH_START`,
  SEARCH_COMPLETE: `${appName}/${moduleName}/SEARCH_COMPLETE`,
  SEARCH_ERROR: `${appName}/${moduleName}/SEARCH_ERROR`,
  SET_SEARCH_MODE: `${appName}/${moduleName}/SET_SEARCH_MODE`,
  /* Для удаления камеры из списка */
  CLEAN_ONE_CAMERA: `${appName}/${moduleName}/CLEAN_ONE_CAMERA`,
  /*  Установка статуса загрузки */
  SET_IS_LOADING: `${appName}/${moduleName}/SET_IS_LOADING`,
};

export const setLimitedCamerasDataAction = (camerasData: any) => {
  return {
    type: actionTypes.SET_LIMITED_CAMERAS_DATA,
    payload: {
      camerasData,
    },
  };
};

export const cleanAllSelectedAction = () => {
  return {
    type: actionTypes.CLEAN_ALL_SELECTED,
  };
};

export const selectAllCamerasInCurrentGroup = (groupId: number) => {
  return {
    type: actionTypes.SELECT_ALL_CAMERAS_IN_CURRENT_GROUP,
    payload: {
      groupId,
    },
  };
};

export const initListAction = () => {
  return {
    type: actionTypes.INIT_LIST_START,
  };
};

export const getGroupStartAction = (
  groupId: number,
  parentId: number | null
) => {
  return {
    type: actionTypes.GET_GROUP_START,
    payload: {
      groupId,
      parentId,
    },
  };
};

export const groupLoadCompleteAction = ({
  groupId,
  groupContent,
  parentId,
}: any) => {
  return {
    type: actionTypes.GET_GROUP_COMPLETE,
    payload: {
      groupId,
      groupContent,
      parentId: parentId != null ? parentId : null,
    },
  };
};

export const getGroupErrorAction = () => {
  return {
    type: actionTypes.GET_GROUP_ERROR,
  };
};

/**
 * Установить новую группу в groups в store
 * @param groupId
 * @param groupContent
 * @param parentId
 *
 */
export const addGroupToGroupsStoreAction = ({
  groupId,
  groupContent,
  parentId,
}: any) => ({
  type: actionTypes.ADD_GROUP_TO_GROUPS_STORE,
  payload: {
    groupId,
    groupContent,
    parentId,
  },
});

export const changeGroupStartAction = (
  groupId: number,
  streetsMode = false
) => {
  return {
    type: actionTypes.SET_CURRENT_SELECTED_GROUP_START,
    payload: {
      groupId,
      streetsMode,
    },
  };
};

export const changeGroupFinishAction = (groupId: number) => {
  return {
    type: actionTypes.SET_CURRENT_SELECTED_GROUP_FINISH,
    payload: {
      groupId,
    },
  };
};

/**
 * Установка текущей группы
 * @param {number | string} currentSelectedGroupId
 * @returns
 */
export const setCurrentSelectedGroupIdAction = (
  currentSelectedGroupId: number | string
) => {
  return {
    type: actionTypes.SET_CURRENT_SELECTED_GROUP_ID,
    payload: {
      currentSelectedGroupId,
    },
  };
};

export const toggleSelectedStartAction = (toggledIds: number[]) => {
  return {
    type: actionTypes.TOGGLE_SELECTED_IDS_START,
    payload: {
      toggledIds,
    },
  };
};

export const toggleSelectedFinishAction = (selectedCamerasIds: number[]) => {
  return {
    type: actionTypes.TOGGLE_SELECTED_IDS_FINISH,
    payload: {
      selectedCamerasIds,
    },
  };
};

/**
 * Установить новые выделенные объекты
 * @param {array} selectedObjects
 */
export const setSelectedObjectsStartAction = (
  selectedObjects: Array<number>
) => ({
  type: actionTypes.SET_SELECTED_OBJECTS_START,
  payload: {
    selectedObjects,
  },
});

/**
 * Установить новые выделенные объекты в store
 * @param {array} selectedObjects
 */
export const setSelectedObjectsFinishAction = (selectedObjects: number[]) => ({
  type: actionTypes.SET_SELECTED_OBJECTS_FINISH,
  payload: {
    selectedObjects,
  },
});

/**
 * Поменять строку поиска
 * @param {string} searchString
 * @param {boolean} searchStart
 */
export const changeSearchStringAction = (
  searchString: string,
  searchStart: boolean = true
) => ({
  type: actionTypes.CHANGE_SEARCH_STRING,
  payload: {
    searchString,
    searchStart,
  },
});

/**
 * Выполнить поиск по элементам
 * @param {string} searchString
 */
export const searchStartAction = (searchString: string) => ({
  type: actionTypes.SEARCH_START,
  payload: {
    searchString,
  },
});

/**
 * Вызвать доп обработку при поиске
 * @param {string} searchString
 */
export const searchCompleteAction = (
  data: object,
  forceSetActiveId = true
) => ({
  type: actionTypes.SEARCH_COMPLETE,
  payload: {
    data,
    forceSetActiveId: !!forceSetActiveId,
  },
});

/**
 * Вызвать ошибку при поиске
 * @param {string} message - сообщение об ошибке
 */
export const searchErrorAction = (message: string) => ({
  type: actionTypes.SEARCH_ERROR,
  payload: {
    message,
  },
});

/**
 * Удалить одну камеру
 *  @param {number} cameraId
 */
export const cleanOneCameraAction = (cameraId: number) => {
  return {
    type: actionTypes.CLEAN_ONE_CAMERA,
    payload: {
      cameraId,
    },
  };
};

/**
 * Удалить одну камеру
 *  @param {boolean} status
 */
export const setIsLoadingAction = (status: boolean) => {
  return {
    type: actionTypes.SET_IS_LOADING,
    payload: {
      status,
    },
  };
};
