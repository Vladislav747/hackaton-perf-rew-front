import LocalStorage from "../storage/LocalStorage";
import localStorageKeys from "../storage/localStorageKeys";

/**
 * Установка новых камер в ключ "SELECTED_CAM_IDS" localStorage
 * @param {object} data - ID камер
 */
export const setSelectedCamsToLs = (data: number[]) => {
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
export const removeSelectedCamsFromLs = async () => {
  await LocalStorage.remove(localStorageKeys.SELECTED_CAM_IDS);
};

/**
 * Установка текущего ключа "CURRENT_GROUP" localStorage
 * void
 */
export const setCurrentGroupToLs = (data: CurrentSelectedGroup) => {
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
 *  Очистить ключа "CURRENT_GROUP" localStorage
 * void
 */
export const removeCurrentGroupFromLs = () => {
  return LocalStorage.get(localStorageKeys.CURRENT_GROUP);
};

/**
 * Установка текущей группы в ключ "SELECTED_GROUP" localStorage
 * @param {object} data - ID и NAME группы
 */
export const setSelectedGroupToLs = async (data: any) => {
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
 * Форматировать данные для redux для ключа searchedObjects
 */
export function formatDataForSearchObjects(data: any) {
  let res: any = {};
  data.forEach((curVal: any, i: any) => {
    const { ID } = curVal;
    res[+ID] = data[i];
  });

  return res;
}
