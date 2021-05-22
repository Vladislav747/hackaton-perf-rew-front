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
 * Авторизация
 * @param data 
 * @returns 
 */
apiMethods.auth = (data: dataApiAuth) => {
  return ApiAgent.post(`${authApiUrl}/auth/login`, data);
};

apiMethods.createPerfRequest = (data: dataApiperfRequest) => {
  return ApiAgent.post(`${authApiUrl}/perfRequest`, data);
};

apiMethods.getUserInfo = () => {
  return ApiAgent.get(`${authApiUrl}/user`);
};


export default apiMethods;
