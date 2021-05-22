import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  AUTH_START: `${appName}/${moduleName}/AUTH_START`,
  AUTH_COMPLETE: `${appName}/${moduleName}/AUTH_COMPLETE`,
  AUTH_ERROR: `${appName}/${moduleName}/AUTH_ERROR`,
  LOG_OUT: `${appName}/${moduleName}/LOG_OUT`,
  UPDATE_TOKEN: `${appName}/${moduleName}/UPDATE_TOKEN`,
  UPDATE_USERNAME: `${appName}/${moduleName}/UPDATE_USERNAME`,
  READY: `${appName}/${moduleName}/READY`,
};

/**
 * Обновить токен
 *
 * @param {string} token
 */
export const updateTokenAction = (token: string) => {
  return {
    type: actionTypes.UPDATE_TOKEN,
    payload: {
      token,
    },
  };
};

/**
 * Запуск авторизации на сайте
 * @param {string} username
 * @param {string} password
 *
 */
export const authStartAction = ({
  name,
  phone,
}: authStartActionType) => {
  return {
    type: actionTypes.AUTH_START,
    payload: {
      name,
      phone,
    },
  };
};

/**
 * Обновить логин
 * @param {string} username
 * @param {string} password
 *
 */
export const updateUsernameAction = ({ username }: updateUsernameType) => {
  return {
    type: actionTypes.UPDATE_USERNAME,
    payload: {
      username,
    },
  };
};

/**
 * Завершение авторизации
 *
 * @param {any} data
 *
 */
export const authCompleteAction = (data: any) => {
  return {
    type: actionTypes.AUTH_COMPLETE,
    payload: {
      data,
    },
  };
};

/**
 * Установка статуса фронтенда
 * @param {boolean} frontendIsReadyStatus -
 */
export const frontendIsReadyStatusAction = (frontendIsReadyStatus: boolean) => {
  return {
    type: actionTypes.READY,
    payload: {
      frontendIsReadyStatus,
    },
  };
};

/**
 * Вызвать ошибку при авторизации
 * @param {string} message
 */
export const authErrorAction = (message: string) => {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: {
      message,
    },
  };
};

/**
 * Выйти из авторизации
 */
export const logOutAction = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};
