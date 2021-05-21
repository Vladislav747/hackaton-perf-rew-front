import LocalStorage from "../storage/LocalStorage";
import localStorageKeys from "../storage/localStorageKeys";

export function prepareResult(data) {
  return data.map(el => ({ name: el.NAME, id: el.ID }));
}

/**
 * Установка новых камер в ключ "SUBMENU_OPTIONS" localStorage
 * @param {object} data - опции подменю
 */
export const setSubmenuOptionsToLs = data => {
  return LocalStorage.set(localStorageKeys.SUBMENU_OPTIONS, data);
};

/**
 * Получение новых камер из ключа "SUBMENU_OPTIONS" localStorage
 * void
 */
export const getSubmenuOptionsFromLs = () => {
  return LocalStorage.get(localStorageKeys.SUBMENU_OPTIONS);
};
