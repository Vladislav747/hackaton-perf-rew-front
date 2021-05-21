import { stringify } from "query-string";

/**
 * Регистрироваться по протоколу Oauth
 * @param {*} state
 */
export const getOauthUrl = state => {
  const oauthEndPoint = process.env.REACT_APP_OAUTH_ENDPOINT;
  const client_id = process.env.REACT_APP_OAUTH_CLIENT_ID;
  const response_type = process.env.REACT_APP_OAUTH_RESPONSE_TYPE;
  const xoauth_displayname = process.env.REACT_APP_OAUTH_XOAUTH_DISPLAY_NAME;
  const scope = process.env.REACT_APP_OAUTH_SCOPE;
  return `${oauthEndPoint}authorize?${stringify({
    client_id,
    response_type,
    xoauth_displayname,
    scope,
    state,
  })}`;
};

/**
 * Разлогиниться по протоколу Oauth
 */
export const getOauthLogoutUrl = () => {
  const oauthEndPoint = process.env.REACT_APP_OAUTH_ENDPOINT;
  return `${oauthEndPoint}/logout`;
};

// @todo когда-нибудь переделать логику
/**
 * Редирект
 * @param {*} state
 */
export const redirectToOauth = state => {
  window.location.href = getOauthUrl(state);
  return;
};
