import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  INIT_LIST_START: `${appName}/${moduleName}/INIT_LIST_START`,
  INIT_LIST_COMPLETE: `${appName}/${moduleName}/INIT_LIST_COMPLETE`,
  GET_GROUP_START: `${appName}/${moduleName}/GET_GROUP_START`,
  GET_GROUP_COMPLETE: `${appName}/${moduleName}/GET_GROUP_COMPLETE`,
  GET_GROUP_ERROR: `${appName}/${moduleName}/GET_GROUP_ERROR`,
  UPDATE_LIST: `${appName}/${moduleName}/UPDATE_LIST`,
  UPDATE_OBJECTS: `${appName}/${moduleName}/UPDATE_OBJECTS`,
  SET_ACTIVE_OBJECT_ID_START: `${appName}/${moduleName}/SET_ACTIVE_OBJECT_ID_START`,
  SET_ACTIVE_OBJECT_ID_COMPLETE: `${appName}/${moduleName}/SET_ACTIVE_OBJECT_ID_COMPLETE`,
  SELECT_TOGGLE_START: `${appName}/${moduleName}/SELECT_TOGGLE_START`,
  SELECT_TOGGLE_COMPLETE: `${appName}/${moduleName}/SELECT_TOGGLE_COMPLETE`,
  SET_SELECTED_OBJECTS: `${appName}/${moduleName}/SET_SELECTED_OBJECTS`,
  SET_SELECTED_OBJECTS_FILTER: `${appName}/${moduleName}/SET_SELECTED_OBJECTS_FILTER`,
  SET_FULL_SELECTED_GROUPS: `${appName}/${moduleName}/SET_FULL_SELECTED_GROUPS`,
  GET_OBJECT_START: `${appName}/${moduleName}/GET_OBJECT_START`,
  GET_OBJECT_COMPLETE: `${appName}/${moduleName}/GET_GROUP_COMPLETE`,
  GET_OBJECT_ERROR: `${appName}/${moduleName}/GET_GROUP_ERROR`,
  SET_ROOT_IS_LOADED: `${appName}/${moduleName}/SET_ROOT_IS_LOADED`,
  CHANGE_SEARCH_STRING: `${appName}/${moduleName}/CHANGE_SEARCH_STRING`,
  SEARCH_START: `${appName}/${moduleName}/SEARCH_START`,
  SEARCH_COMPLETE: `${appName}/${moduleName}/SEARCH_COMPLETE`,
  SEARCH_ERROR: `${appName}/${moduleName}/SEARCH_ERROR`,
  CLEAN_ALL: `${appName}/${moduleName}/CLEAN_ALL`,
  CLEAN_ONE_CAMERA: `${appName}/${moduleName}/CLEAN_ONE_CAMERA`,
  GET_LIMITED_INFO_START: `${appName}/${moduleName}/GET_LIMITED_INFO_START`,
  GET_LIMITED_INFO_FINISH: `${appName}/${moduleName}/GET_LIMITED_INFO_FINISH`,
  GET_LIMITED_INFO_ERROR: `${appName}/${moduleName}/GET_LIMITED_INFO_ERROR`,
  SAVE_CURRENT_GROUP_TO_LS: `${appName}/${moduleName}/SAVE_CURRENT_GROUP_TO_LS`,
  SET_CAMERAS_LIST_UPDATE_IN_PROGRESS: `${appName}/${moduleName}/SET_CAMERAS_LIST_UPDATE_IN_PROGRESS`,
  SET_LIST: `${appName}/${moduleName}/SET_LIST`,
  FILL_LS_WITH_DEFAULT_DATA: `${appName}/${moduleName}/FILL_LS_WITH_DEFAULT_DATA`,
};

/**
 * Получить  информацию об определенных камерах
 * @param {array} loadingLimitedIds
 * @param {array} loadingLimitedIdsForSelect
 *
 */
export const getLimitedInfoStartAction = (
  loadingLimitedIds: Array<any>,
  loadingLimitedIdsForSelect: Array<any>,
  logoutActon: boolean = false
) => ({
  type: actionTypes.GET_LIMITED_INFO_START,
  payload: {
    loadingLimitedIds,
    loadingLimitedIdsForSelect,
    logoutActon,
  },
});

/**
 * Отобразить лоудер, означающий обновление списка камер.
 * @param {boolean} camerasListUpdateInProgress
 *
 */
export const setCamerasListUpdateInProgressAction = (
  camerasListUpdateInProgress: boolean
) => ({
  type: actionTypes.SET_CAMERAS_LIST_UPDATE_IN_PROGRESS,
  payload: {
    camerasListUpdateInProgress,
  },
});

/**
 * Вызвать допобработку при получении  информации об определенных камерах
 * @param {array} loadingLimitedIds
 * @param {array} loadingLimitedIdsForSelect
 *
 */
export const getLimitedInfoFinishAction = (cameras: any) => ({
  type: actionTypes.GET_LIMITED_INFO_FINISH,
  payload: {
    cameras,
  },
});

/**
 * Вызвать ошибку при запросе информации об определенных камерах
 * @param {array} failedLimitedIds
 */
export const getLimitedInfoErrorAction = (failedLimitedIs: Array<[]>) => ({
  type: actionTypes.GET_LIMITED_INFO_ERROR,
  payload: {
    failedLimitedIs,
  },
});

/**
 * Удалить все камеры
 */
export const cleanAllAction = () => ({
  type: actionTypes.CLEAN_ALL,
});

/**
 * Удалить одну камеру
 *  @param {object} payload -
 */
export const cleanOneCameraAction = (payload: any) => {
  const { id } = payload;
  return {
    type: actionTypes.CLEAN_ONE_CAMERA,
    payload: {
      id,
    },
  };
};

/**
 * Получить содержимое группы с сервера
 * @param {string} groupId - ID города
 * @param {string | null} parentObjectId - Специальный ID склееный с родителем
 *
 * у parentObjectId -  если null это прям корень ?
 */
export const getGroupAction = (
  groupId: string,
  parentObjectId: null | string = null
) => ({
  type: actionTypes.GET_GROUP_START,
  payload: {
    groupId,
    parentObjectId,
  },
});

/**
 * Получить содержимое группы с сервера
 * @param {string} groupId
 * @param parentObjectId
 */
export const groupLoadCompleteAction = (Args: groupLoadCompleteActionType) => {
  const { data, groupId, parentObjectId } = Args;
  return {
    type: actionTypes.GET_GROUP_COMPLETE,
    payload: {
      data,
      groupId,
      parentObjectId,
    },
  };
};

/**
 * Вызвать ошибку при запросе информации об содержимом группы
 * @param {string} message
 * @param {string} groupId
 * @param {string} parentObjectId
 */
export const getGroupErrorAction = (
  message: string,
  groupId: string,
  parentObjectId: string
) => ({
  type: actionTypes.GET_GROUP_ERROR,
  payload: {
    message,
    groupId,
    parentObjectId,
  },
});

/**
 * Обновить текущий список полностью выбранных групп
 * @param {array} fullSelectedGroups
 */
export const updateFullSelectedGroupsAction = (
  fullSelectedGroups: fullSelectedGroup[]
) => ({
  type: actionTypes.SET_FULL_SELECTED_GROUPS,
  payload: {
    fullSelectedGroups,
  },
});

/**
 * Обновить текущий список камер
 * @param {array} data
 */
export const updateListAction = (data: object) => ({
  type: actionTypes.UPDATE_LIST,
  payload: {
    data,
  },
});

/**
 * Установить текущий активный элемент
 * @param {string} id
 */
export const setActiveObjectIdAction = (id: string, init: boolean = false) => {
  return {
    type: actionTypes.SET_ACTIVE_OBJECT_ID_START,
    payload: {
      id,
      init,
    },
  };
};

/**
 * Занести в store текущий активный элемент
 * @param {string} id
 */
export const setActiveObjectIdCompleteAction = (id: string) => {
  return {
    type: actionTypes.SET_ACTIVE_OBJECT_ID_COMPLETE,
    payload: {
      id,
    },
  };
};

/**
 * Инициализация списка камер
 */
export const initListAction = () => ({
  type: actionTypes.INIT_LIST_START,
});

/**
 * Допобработка при Инициализации списка камер
 */
export const initListCompleteAction = () => ({
  type: actionTypes.INIT_LIST_COMPLETE,
});

/**
 * Выбор камер в верхнем всплывающем меню
 * @param {string} id
 */
export const selectStartAction = (id: string) => ({
  type: actionTypes.SELECT_TOGGLE_START,
  payload: {
    id,
  },
});

/**
 * Дообработка при выборе камер в верхнем меню
 * @param {array<string>} selectedObjects
 */
export const selectCompleteAction = (selectedObjects: Array<string>) => ({
  type: actionTypes.SELECT_TOGGLE_COMPLETE,
  payload: {
    selectedObjects,
  },
});

/**
 * Установить новые выделенные объекты в store
 * @param {array} selectedObjects
 */
export const setSelectedObjectsAction = (
  selectedObjects: Array<string>,
  noUseLs: boolean = false
) => ({
  type: actionTypes.SET_SELECTED_OBJECTS,
  payload: {
    selectedObjects,
    noUseLs,
  },
});

/**
 * Установить новые выделенные объекты при фильрации в store
 * @param {array} selectedObjects
 */
export const setSelectedObjectsFilterAction = (
  selectedObjects: Array<string>
) => ({
  type: actionTypes.SET_SELECTED_OBJECTS_FILTER,
  payload: {
    selectedObjects,
  },
});

/**
 * Перейти в корень всплывающего меню
 * @param {boolean} rootIsLoaded
 */
export const setRootIsLoadedAction = (rootIsLoaded: boolean) => ({
  type: actionTypes.SET_ROOT_IS_LOADED,
  payload: {
    rootIsLoaded,
  },
});

/**
 * Поменять строку поиска
 * @param {string} searchString
 */
export const changeSearchStringAction = (searchString: string) => ({
  type: actionTypes.CHANGE_SEARCH_STRING,
  payload: {
    searchString,
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
 * Обновить объект objectsState
 * @param {object} objectsState
 */
export const updateObjectsAction = (objectsState: object) => ({
  type: actionTypes.UPDATE_OBJECTS,
  payload: {
    objectsState,
  },
});

/**
 * Сохранить current Group и activeObjectId to LS
 * @param {any} id
 */
export const saveCurrentGroupToLsAction = (id: any, init: boolean = false) => ({
  type: actionTypes.SAVE_CURRENT_GROUP_TO_LS,
  payload: {
    id,
    init,
  },
});

/**
 * Установить новый список list в store
 * @param {Array} list - Массив объектов камер либо папок
 */

export const setListAction = (list: Array<Object[]>) => ({
  type: actionTypes.SET_LIST,
  payload: {
    list,
  },
});

/**
 * Заполнить LS - значениями по умочанию
 */

export const fillLsWithDefaultDataAction = () => ({
  type: actionTypes.FILL_LS_WITH_DEFAULT_DATA,
});
