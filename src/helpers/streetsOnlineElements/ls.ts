import LocalStorage from "../storage/LocalStorage";
import localStorageKeys from "../storage/localStorageKeys";

export const setCalculatedGridNumToLs = async (num: number) => {
  return await LocalStorage.set(localStorageKeys.CALCULATED_NUM, num);
};

export const removeCalculatedGridFromToLs = async () => {
  await LocalStorage.remove(localStorageKeys.CALCULATED_NUM);
};

export const getCalculatedGridNumFromLs = () => {
  return LocalStorage.get(localStorageKeys.CALCULATED_NUM);
};

export const setSelectedViewToLs = async (view: String) => {
  return await LocalStorage.set(localStorageKeys.SELECTED_VIEW, view);
};

export const removeSelectedViewToLs = async () => {
  await LocalStorage.remove(localStorageKeys.SELECTED_VIEW);
};

export const getSelectedViewFromLs = () => {
  return LocalStorage.get(localStorageKeys.SELECTED_VIEW);
};
