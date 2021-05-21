import LocalStorage from "../storage/LocalStorage";
import localStorageKeys from "../storage/localStorageKeys";
import CheckLocalStorage from "../storage/CheckLocalStorage";

/**
 * Установка новых камер в ключ "SELECTED_CAM_IDS" localStorage
 * @param {object} data - ID камер
 */
export const setSelectedCamsToLs = data => {
  return LocalStorage.set(localStorageKeys.SELECTED_CAM_IDS, data);
};

/**
 * Получение новых камер из ключа "SELECTED_CAM_IDS" localStorage
 * void
 */
export const getSelectedCamsFromLs = () => {
  return LocalStorage.get(localStorageKeys.SELECTED_CAM_IDS);
};

/**
 * Очистить ключ "SELECTED_CAM_IDS" localStorage
 * void
 */
export const removeSelectedCamsFromLs = () => {
  LocalStorage.remove(localStorageKeys.SELECTED_CAM_IDS);
};

/**
 * Установка текущей группы в ключ "SELECTED_GROUP" localStorage
 * @param {object} data - ID и NAME группы
 */
export const setSelectedGroupToLs = async data => {
  return await LocalStorage.set(localStorageKeys.SELECTED_GROUP, data);
};

/**
 * Получение текущей группы из ключа "SELECTED_GROUP" localStorage
 * void
 */
export const getSelectedGroupFromLs = () => {
  return LocalStorage.get(localStorageKeys.SELECTED_GROUP);
};

/**
 * Очистить ключ "SELECTED_GROUP" localStorage voio
 * void
 */
export const removeSelectedGroupFromLs = async () => {
  return await LocalStorage.remove(localStorageKeys.SELECTED_GROUP);
};

/**
 * Установка активного родителя в ключ "ACTIVE_PARENT_ID" localStorage
 * @param {string} data - ID камер
 */
export const setActiveObjectIdToLs = async data => {
  return await LocalStorage.set(localStorageKeys.ACTIVE_PARENT_ID, data);
};

/**
 * Получение активного родителя из ключа "ACTIVE_PARENT_ID" localStorage
 * void
 */
export const getActiveObjectIdFromLs = async () => {
  return await LocalStorage.get(localStorageKeys.ACTIVE_PARENT_ID);
};

/**
 * Установка текущего массива групп в ключ "ALL_SELECTED_GROUPS" localStorage
 * @param {object} data - объект камер
 */
export const setAllSelectedGroupsToLs = data => {
  return LocalStorage.set(localStorageKeys.ALL_SELECTED_GROUPS, data);
};

/**
 * Получение  текущего массива групп из ключа "ALL_SELECTED_GROUPS" localStorage
 * void
 */
export const getAllSelectedGroupsFromLs = () => {
  return LocalStorage.get(localStorageKeys.ALL_SELECTED_GROUPS);
};

/**
 * Получение  текущего массива групп из ключа "ALL_SELECTED_GROUPS" localStorage
 * void
 */
export const removeAllSelectedGroupsFromLs = () => {
  return LocalStorage.remove(localStorageKeys.ALL_SELECTED_GROUPS);
};

// Работа с полностью выбранными группами
export const setFullSelectedGroupsToLs = data => {
  return LocalStorage.set(localStorageKeys.FULL_SELECTED_GROUPS, data);
};

export const getFullSelectedGroupsFromLs = () => {
  return LocalStorage.get(localStorageKeys.FULL_SELECTED_GROUPS);
};

export const removeFullSelectedGroupsFromLs = () => {
  return LocalStorage.remove(localStorageKeys.FULL_SELECTED_GROUPS);
};

/**
 * Установка текущего массива групп в ключ "ALL_OPENED_GROUPS" localStorage
 * @param {object} data - объект камер
 */
export const setAllOpenedGroupsToLs = data => {
  return LocalStorage.set(localStorageKeys.ALL_OPENED_GROUPS, data);
};
/**
 * Установка текущего ключа "VERSION_OF_LS" localStorage
 * void
 */
export const setVersionOfLsToLs = data => {
  return LocalStorage.set(localStorageKeys.VERSION_OF_LS, data);
};

/**
 * Получение текущего ключа "VERSION_OF_LS" localStorage
 * void
 */
export const getVersionOfLsFromLs = () => {
  return LocalStorage.get(localStorageKeys.VERSION_OF_LS);
};

/**
 * Проверка всех ключей localStorage
 * void
 */
export const checkAllKeysInLs = () => {
  return CheckLocalStorage.checkAllLsKeys();
};

/**
 * Установка текущего ключа "CURRENT_GROUP" localStorage
 * void
 */
export const setCurrentGroupToLs = data => {
  return LocalStorage.set(localStorageKeys.CURRENT_GROUP, data);
};

/**
 * Получение текущего ключа "CURRENT_GROUP" localStorage
 * void
 */
export const getCurrentGroupFromLs = () => {
  return LocalStorage.get(localStorageKeys.CURRENT_GROUP);
};

/**
 * Очистить ключ "CURRENT_GROUP" localStorage
 * void
 */
export const removeCurrentGroupFromLs = () => {
  return LocalStorage.remove(localStorageKeys.CURRENT_GROUP);
};
