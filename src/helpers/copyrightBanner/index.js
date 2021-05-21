import LocalStorage from "../storage/LocalStorage";
import localStorageKeys from "../storage/localStorageKeys";

/**
 * Получение текущего ключа "HAS_SEEN_COPYRIGHT_BANNER" localStorage
 * void
 */
export const getHasSeenCopyrightBannerFromLs = () => {
  return LocalStorage.get(localStorageKeys.HAS_SEEN_COPYRIGHT_BANNER);
};

/**
 * Установка текущего ключа "HAS_SEEN_COPYRIGHT_BANNER" в localStorage
 * void
 */
export const setHasSeenCopyrightBannerToLs = data => {
  return LocalStorage.set(localStorageKeys.HAS_SEEN_COPYRIGHT_BANNER, data);
};
