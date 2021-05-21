import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  OPEN_ADD_GROUP_MODAL: `${appName}/${moduleName}/OPEN_ADD_GROUP_MODAL`,
  OPEN_EDIT_GROUP_MODAL: `${appName}/${moduleName}/OPEN_EDIT_GROUP_MODAL`,
  OPEN_LIST_GROUPS_MODAL: `${appName}/${moduleName}/OPEN_LIST_GROUPS_MODAL`,
  ADD_PERSONAL_GROUP_FOR_USER: `${appName}/${moduleName}/ADD_PERSONAL_GROUP_FOR_USER`,
  DELETE_PERSONAL_GROUP_FOR_USER: `${appName}/${moduleName}/DELETE_PERSONAL_GROUP_FOR_USER`,
  EDIT_PERSONAL_GROUP_FOR_USER: `${appName}/${moduleName}/EDIT_PERSONAL_GROUP_FOR_USER`,
  GET_PERSONAL_GROUPS_FOR_USER: `${appName}/${moduleName}/GET_PERSONAL_GROUPS_FOR_USER`,
  SET_PERSONAL_GROUPS_FOR_USER: `${appName}/${moduleName}/SET_PERSONAL_GROUPS_FOR_USER`,
  SET_CURRENT_GROUP_NAME: `${appName}/${moduleName}/SET_CURRENT_GROUP_NAME`,
  SET_ACTIVE_PERSONAL_GROUP: `${appName}/${moduleName}/SET_ACTIVE_PERSONAL_GROUP`,
  OPEN_EDIT_MODE: `${appName}/${moduleName}/OPEN_EDIT_MODE`,
  ADD_SELECTED_CAMERAS_FROM_FLIST_IN_CUSTOM_GROUP: `${appName}/${moduleName}/ADD_SELECTED_CAMERAS_FROM_FLIST_IN_CUSTOM_GROUP`,
  UPDATE_CAMERAS_IN_FLIST: `${appName}/${moduleName}/UPDATE_CAMERAS_IN_FLIST`,
  CHANGE_CUSTOM_GROUP: `${appName}/${moduleName}/CHANGE_CUSTOM_GROUP`,
  SET_CURRENT_CAMERA_ID: `${appName}/${moduleName}/SET_CURRENT_CAMERA_ID`,
  EDIT_CAMERA_IN_CUSTOM_GROUP: `${appName}/${moduleName}/EDIT_CAMERA_IN_CUSTOM_GROUP`,
};

/**
 * Установить статус открытого или закрытого модального окна создания группы
 * @param {boolean} showAddGroupModalStatusStore
 */
export const openAddGroupModalAction = (
  showAddGroupModalStatusStore: boolean
) => {
  return {
    type: actionTypes.OPEN_ADD_GROUP_MODAL,
    payload: {
      showAddGroupModalStatusStore,
    },
  };
};

/**
 * Установить статус открытого или закрытого модального окна редактирования группы
 * @param {boolean} showEditGroupModalStatusStore
 */
export const openEditGroupModalAction = (
  showEditGroupModalStatusStore: boolean
) => {
  return {
    type: actionTypes.OPEN_EDIT_GROUP_MODAL,
    payload: {
      showEditGroupModalStatusStore,
    },
  };
};

/**
 * Установить статус открытого или закрытого модального окна вывода списка групп для добавления/удаления камеры из группы
 * @param {boolean} showListGroupsModalStatusStore
 */
export const openListGroupsModalAction = (
  showListGroupsModalStatusStore: boolean
) => {
  return {
    type: actionTypes.OPEN_LIST_GROUPS_MODAL,
    payload: {
      showListGroupsModalStatusStore,
    },
  };
};

/**
 * Получить все группы для пользователя
 */
export const getPersonalGroupsForUserAction = () => {
  return {
    type: actionTypes.GET_PERSONAL_GROUPS_FOR_USER,
  };
};

/**
 * Установить все группы для пользователя
 * @param {Array} personalGroupsStore
 */
export const setPersonalGroupsForUserAction = (personalGroupsStore: any) => {
  return {
    type: actionTypes.SET_PERSONAL_GROUPS_FOR_USER,
    payload: {
      personalGroupsStore,
    },
  };
};

/**
 * Добавить группу для пользователя
 * @param {string} personalGroupNameArg - название группы
 */
export const addPersonalGroupForUserAction = (personalGroupNameArg: string) => {
  return {
    type: actionTypes.ADD_PERSONAL_GROUP_FOR_USER,
    payload: {
      personalGroupName: personalGroupNameArg,
    },
  };
};

/**
 * Удалить группу для пользователя
 * @param {string} personalGroupNameArg - название группы
 */
export const deletePersonalGroupForUserAction = (
  personalGroupNameArg: string
) => {
  return {
    type: actionTypes.DELETE_PERSONAL_GROUP_FOR_USER,
    payload: {
      personalGroupName: personalGroupNameArg,
    },
  };
};

/**
 * Добавить группу для пользователя
 * @param {string} personalGroupName - название группы
 */
export const editPersonalGroupForUserAction = (personalGroupName: string) => {
  return {
    type: actionTypes.EDIT_PERSONAL_GROUP_FOR_USER,
    payload: {
      personalGroupName,
    },
  };
};

/**
 * Получить все камеры для определенной группы
 * @param {string} currentEditNameArg - название группы
 */
export const setCurrentGroupNameAction = (currentEditNameArg: string) => {
  return {
    type: actionTypes.SET_CURRENT_GROUP_NAME,
    payload: {
      currentEditName: currentEditNameArg,
    },
  };
};

/**
 * Установить  группу которая в данный момент активна
 * @param {number} activePersonalGroup - id группы
 */
export const setActivePersonalGroupAction = (activePersonalGroup: number) => {
  return {
    type: actionTypes.SET_ACTIVE_PERSONAL_GROUP,
    payload: {
      activePersonalGroupArg: activePersonalGroup,
    },
  };
};

/**
 * Запускаем режим редактирования
 * @param {number} currentIdGroup - id группы
 */
export const openEditModeAction = (currentIdGroup: number) => {
  return {
    type: actionTypes.OPEN_EDIT_MODE,
    payload: {
      currentIdGroup,
    },
  };
};

/**
 *  Добавить selected камеры из flist
 * @param {boolean} isAddCameras - флаг того нужно ли добавлять выбранные камеры или нет
 */
export const addSelectedCamerasFromFlistInCustomGroupAction = (
  isAddCameras: boolean
) => {
  return {
    type: actionTypes.ADD_SELECTED_CAMERAS_FROM_FLIST_IN_CUSTOM_GROUP,
    payload: {
      isAddCameras,
    },
  };
};

/**
 * Запускаем обновление камер в flist
 * @param {Array} realIds - id группы
 *  @param {Array} cameraIds - id группы
 */
export const updateCamerasInFlistAction = (realIds: any, cameraIds: any) => {
  return {
    type: actionTypes.UPDATE_CAMERAS_IN_FLIST,
    payload: {
      realIds,
      cameraIds,
    },
  };
};

/**
 * Изменение кастомной группы
 * @param {number} cameraId - id камеры
 */
export const changeCustomGroupAction = (cameraId: number) => {
  return {
    type: actionTypes.CHANGE_CUSTOM_GROUP,
    payload: {
      cameraId,
    },
  };
};

/**
 * Установка текущей камеры
 * @param {string} cameraId - id камеры
 */
export const setCurrentCameraIdAction = (currentCameraId: string) => {
  return {
    type: actionTypes.SET_CURRENT_CAMERA_ID,
    payload: {
      currentCameraId,
    },
  };
};

/**
 * Добавление камеры к кастомной группе
 * @param {string} customGroupId - id кастомной группы
 * @param {string} typeOfAction - тип действия который мы хотим совершить над камерой в кастомной группе
 */
export const editCameraInCustomGroupAction = (
  customGroupId: string,
  typeOfAction: string
) => {
  return {
    type: actionTypes.EDIT_CAMERA_IN_CUSTOM_GROUP,
    payload: {
      customGroupId,
      typeOfAction,
    },
  };
};
