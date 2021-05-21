import localStorageKeys from "./localStorageKeys";
// import LocalStorage from './LocalStorage';
import IStorage from "./IStorage";
import sendErrorToSentry from "../sentry";

import { checkIsObjEmpty, validateStrForLs } from "../utilsFunc";

class LocalStorage extends IStorage {
  /**
   * Получить  ключ из LS
   * @param  {string} key
   */

  get(key) {
    try {
      const res = localStorage.getItem(key);
      if (res) {
        return JSON.parse(res);
      }
      return res;
    } catch (error) {
      //Очистить ключ в случае неудачи
      localStorage.setItem(key, "");
      sendErrorToSentry(`Ошибка получения ключа ${error}`);
    }
  }
  /**
   * Установить новый ключ в LS
   * @param  {string} key
   * @param  {mixed} data
   */
  set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      sendErrorToSentry(`Error set data ${key} into storage ${e}`);
    }
  }
  /**
   * Удалить ключ
   * @param  {string} key
   */
  remove(key) {
    localStorage.removeItem(key);
  }
  /**
   *
   * Очистить весь localStorage с того сайта где вы находитесь
   */
  clear() {
    localStorage.clear();
  }
}

/**
 *  Валидирование LS данных
 *
 *  На данный момент валидируются ключи
 *  - SELECTED_CAM_IDS
 *  - CURRENT_GROUP
 *  - ALL_SELECTED_GROUPS
 *  - FULL_SELECTED_GROUPS
 */
class CheckLocalStorage extends LocalStorage {
  constructor() {
    //Мне нужны существующие методы получения LS из LocalStorage
    super();
  }

  /**
   * Проверить ключ LS SELECTED_CAM_IDS
   */
  checkSelectedCamIdsKey() {
    const selectedCamIdsKeyLs = super.get(localStorageKeys.SELECTED_CAM_IDS);

    //если ключа равен null значит ключа нет в LS и проверять нечего значит считается что ключ верен
    if (selectedCamIdsKeyLs === null) {
      return true;
    }

    //Проверяем что это массив
    if (!Array.isArray(selectedCamIdsKeyLs)) {
      return false;
    }

    /*
			Проверяем что каждый объект имеет структуру типа "groupId_ParentObjectId"
			если хотя бы у одного объект нет этой структуры то структура неверна вся
		*/
    for (let i = 0; i < selectedCamIdsKeyLs.length; i++) {
      if (!validateStrForLs(selectedCamIdsKeyLs[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Проверить ключ LS CURRENT_GROUP
   */
  checkCurrentGroupKey() {
    const currentGroupLs = super.get(localStorageKeys.CURRENT_GROUP);

    //если ключа равен null значит ключа нет в LS и проверять нечего значит считается что ключ верен
    if (currentGroupLs === null) {
      return true;
    }

    //Сначала проверяем что объект не пустой
    if (checkIsObjEmpty(currentGroupLs)) {
      return false;
    }

    return this.validateCurrentGroup(currentGroupLs);
  }

  /**
   * Проверить ключ LS ALL_SELECTED_GROUP
   */
  checkAllSelectedGroupKey() {
    const allSelectedGroupLs = super.get(localStorageKeys.ALL_SELECTED_GROUPS);

    //если ключа равен null значит ключа нет в LS и проверять нечего значит считается что ключ верен
    if (allSelectedGroupLs === null) {
      return true;
    }

    //Сначала проверяем что объект не пустой
    if (checkIsObjEmpty(allSelectedGroupLs)) {
      return false;
    }

    for (let i = 0; i < allSelectedGroupLs.length; i++) {
      if (!this.validateSelectedGroup(allSelectedGroupLs[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Проверить ключ LS FULL_SELECTED_GROUPS
   */
  checkFullSelectedGroupKey() {
    const fullSelectedGroupLs = super.get(
      localStorageKeys.FULL_SELECTED_GROUPS
    );

    //если ключа равен null значит ключа нет в LS и проверять нечего значит считается что ключ верен
    if (fullSelectedGroupLs === null) {
      return true;
    }

    //Сначала проверяем что объект не пустой
    if (checkIsObjEmpty(fullSelectedGroupLs)) {
      return false;
    }
    for (let i = 0; i < fullSelectedGroupLs.length; i++) {
      if (!this.validateSelectedGroup(fullSelectedGroupLs[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Проверить все необходимые нам ключи на валидность
   */
  checkAllLsKeys() {
    //Все проверки складываем в объект проверок
    const objOfChecks = {};
    objOfChecks.correctSelectedCamIdsLs = this.checkSelectedCamIdsKey();
    objOfChecks.correctCurrentGroupLs = this.checkCurrentGroupKey();
    objOfChecks.correctAllSelectedGroupLs = this.checkAllSelectedGroupKey();
    objOfChecks.correctFullSelectedGroupLs = this.checkFullSelectedGroupKey();

    //По умолчанию проверки пройдены
    objOfChecks.correctAll = true;

    /* 
      Если хотя бы одном из проверок ключей ошибка то correctAll = false
    */
    for (var prop in objOfChecks) {
      if (objOfChecks[prop] === false) {
        objOfChecks.correctAll = false;
        return objOfChecks;
      }
    }

    return objOfChecks;
  }

  /**
   * Валидировать правильность заполнения  ключа
   */
  validateSelectedGroup(keyObj) {
    //если нет ключей ID и NAME в объекте то LS неверен
    if (!keyObj.ID || !keyObj.NAME) {
      return false;
    }

    //если ключи пустые то LS неверен
    if (keyObj["ID"] === "" || keyObj["NAME"] === "") {
      return false;
    }
    return true;
  }

  /**
   * Валидировать правильность заполнения ключа CURRENT_GROUP
   */
  validateCurrentGroup(keyObj) {
    //если нет ключей activeObjectId и NAME в объекте то LS неверен
    if (!keyObj.activeObjectId || !keyObj.NAME) {
      return false;
    }

    //если ключи пустые то LS неверен
    if (keyObj["activeObjectId"] === "" || keyObj["NAME"] === "") {
      return false;
    }
    return true;
  }
}

export default new CheckLocalStorage();
