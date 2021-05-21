import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  CHOOSE_CITY: `${appName}/${moduleName}/CHOOSE_CITY`,
  SET_CITIES: `${appName}/${moduleName}/SET_CITIES`,
  SET_EXTENDED_SIDEBAR_STATUS: `${appName}/${moduleName}/SET_EXTENDED_SIDEBAR_STATUS`,
  SET_SUBMENU_STREETS_STATUS: `${appName}/${moduleName}/SET_SUBMENU_STREETS_STATUS`,
  SET_SUBMENU_CUSTOM_GROUPS_STATUS: `${appName}/${moduleName}/SET_SUBMENU_CUSTOM_GROUPS_STATUS`,

};

/**
 * Выбрать город в боковом меню
 * @param {number} groupId
 * @param {string} groupName
 */
export const chooseCityAction = (groupId: number, groupName: string) => {
  return {
    type: actionTypes.CHOOSE_CITY,
    payload: {
      groupId,
      groupName,
    },
  };
};

/**
 * Установить список городов для подменю улицы онлайн
 * @param {*} optionsForStreetsSubMenuStore
 */
export const setCitiesAction = (optionsForStreetsSubMenuStore: optionsForStreetsSubMenuType) => {
  return {
    type: actionTypes.SET_CITIES,
    payload: {
      optionsForStreetsSubMenuStore,
    },
  };
};

/**
 * Установить статус раскрытого или закрытого подменю улицы (раскрыть/закрыть подменю улицы)
 * @param {boolean} showExtendedSubMenuStreetsStatusStore
 */
export const setSubmenuStreetsStatusAction = (showExtendedSubMenuStreetsStatusStore: boolean) => {
  return {
    type: actionTypes.SET_SUBMENU_STREETS_STATUS,
    payload: {
      showExtendedSubMenuStreetsStatusStore,
    },
  };
};

/**
 * Установить статус раскрытого или закрытого подменю мои группы (раскрыть/закрыть подменю мои группы)
 * @param {boolean} showExtendedSubMenuCustomGroupsStatusStore
 */
export const setSubmenuCustomGroupsStatusAction = (showExtendedSubMenuCustomGroupsStatusStore: boolean) => {
  return {
    type: actionTypes.SET_SUBMENU_CUSTOM_GROUPS_STATUS,
    payload: {
      showExtendedSubMenuCustomGroupsStatusStore,
    },
  };
};


/**
 * Установить статус раскрытого или закрытого меню (раскрыть/закрыть боковое меню)
 * @param {boolean} showExtendedSidebarStatusStore
 */
export const setExtendedSidebarStatusAction = (showExtendedSidebarStatusStore: boolean) => {
  return {
    type: actionTypes.SET_EXTENDED_SIDEBAR_STATUS,
    payload: {
      showExtendedSidebarStatusStore,
    },
  };
};
