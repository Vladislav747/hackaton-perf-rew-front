import Api from "./index";
import { getAccessToken } from "../authTokens";
import sendErrorToSentry from "../sentry";

const authApiUrl = process.env.REACT_APP_AUTH_ENDPOINT;

export const ApiAgent = (() => {
  const api = Api.create();
  try {
    const accessToken = getAccessToken();
    if (accessToken) {
      api.setToken(accessToken);
    }
  } catch (e) {
    sendErrorToSentry(`Error broken access token ${e}`, {
      place: "src/helpers/api/apiMethods.ts",
    });
  }
  return api;
})();

export const setToken = () => {
  try {
    const accessToken: string = getAccessToken();
    ApiAgent.setToken(accessToken);
  } catch (e) {
    sendErrorToSentry(`Error broken access token ${e}`, {
      place: "src/helpers/api/apiMethods.ts",
    });
  }
};

const apiMethods: any = {};

/**
 * Получить содержание группы с указанным id
 */
apiMethods.getGetGroup = (id: string | number | null = "") => {
  if (id == 0 || id == undefined) id = null;
  return ApiAgent.get(`get-group/${id}`);
};

apiMethods.getCamerasLimitedInfo = (data: object) => {
  return ApiAgent.post(`limited-info`, data);
};

apiMethods.checkToken = () => {
  return ApiAgent.post(`${authApiUrl}token/check`);
};

apiMethods.getTokenInfo = () => {
  return ApiAgent.get(`${authApiUrl}token/info`);
};

apiMethods.auth = (data: dataApiAuth) => {
  return ApiAgent.post(`${authApiUrl}auth/password`, data);
};

apiMethods.getCameraEvents = (data: any) => {
  return ApiAgent.get(`event`, { params: data });
};

/**
 * Получить содержание группы с указанным id
 */
apiMethods.search = (term: string = "") => {
  return ApiAgent.get(`search`, { params: { term } });
};

/* Загрузка видео из архива
 * {
 *  "CAMERA_ID": 97,
 *  "START_TIME": "24.01.2019 14:05",
 *  "STOP_TIME": "24.01.2019 14:15"
 * }
 */

apiMethods.orderVideoForDownload = (data: backendRequestForDownload) => {
  const { cameraId, startTimeAsString, stopTimeAsString } = data;
  return ApiAgent.post(`order-whole`, {
    CAMERA_ID: cameraId,
    START_TIME: startTimeAsString,
    STOP_TIME: stopTimeAsString,
  });
};

/* Получение ссылки на загрузку видео
 *
 * {
 *  "JOB_ID": 21221,
 *  "CAMERA_ID": 97
 * }
 */
apiMethods.getDownloadLink = (data: dataGetDownloadLink) => {
  const { jobId, cameraId } = data;
  return ApiAgent.post(`get-file`, {
    JOB_ID: jobId,
    CAMERA_ID: cameraId,
  });
};

/**
 * Получить список своих персональных групп
 * Обрати внимание что используется токен пользователя для получения - по нему идет отбор
 */
apiMethods.getPersonalGroups = () => {
  return ApiAgent.get(`person-group`);
};

/**
 * Добавить персональную группу
 */
apiMethods.addPersonalGroup = (data: any) => {
  const { name, cameraIds, customIds } = data;
  return ApiAgent.post(`person-group/add`, {
    name: name,
    cameraIds: cameraIds,
    customIds: customIds,
  });
};

/**
 * Удалить персональную группу
 */
apiMethods.deletePersonalGroup = (data: any) => {
  const { id } = data;
  return ApiAgent.delete(`person-group/${id}`);
};

/**
 * Редактировать персональную группу
 */
apiMethods.editPersonalGroup = (data: any) => {
  const { name, cameraIds, id, customIds } = data;
  return ApiAgent.put(`person-group/${id}`, {
    name: name,
    cameraIds: cameraIds,
    customIds: customIds,
  });
};

apiMethods.getFavouriteCameras = () => {
  return ApiAgent.get(`person-group/favorite`);
};

/**
 * Добавить избранную группу
 */
apiMethods.addFavouriteGroup = (data: any) => {
  const { camerasIds } = data;
  return ApiAgent.post(`person-group/favorite`, {
    name: "Избранное",
    cameraIds: camerasIds,
  });
};

/**
 * Добавить избранную группу
 */
apiMethods.updateFavouriteGroup = (data: any) => {
  const { camerasIds, groupId } = data;
  return ApiAgent.put(`person-group/${groupId}`, {
    cameraIds: camerasIds,
  });
};

export default apiMethods;
