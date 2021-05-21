import LocalStorage from "../storage/LocalStorage";
import localStorageKeys from "../storage/localStorageKeys";
import sendErrorToSentry from "../sentry/index";

export const getAuthTokenFromLs = () => {
  const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
  try {
    return JSON.parse(token);
  } catch (e) {
    //Если не получили ключ то очищаем его
    localStorage.setItem(localStorageKeys.AUTH_TOKEN, "");
    sendErrorToSentry(`Ошибка при получении токена из LS ${e}`);
  }
  return null;
};

/**
 * Парсинг даты который позволяет избежать конфликтов с датой в Safari - возвращает милиисекунды
 * @param {string} str - дата в виде строки формата '2011-06-21 14:27:28'
 */
function dataParse(str) {
  return Date.parse(str.replace(/ /g, "T"));
}

export const needUpdate = token => {
  //Если должным образом не преоброазовать строку для даты то она будет не валидна для safari
  const tokenEndTimestamp = dataParse(token.ACCESS_END);
  const expireIsClose = tokenEndTimestamp + 24 * 60 * 60 * 1000 > Date.now();
  if (
    token &&
    token.TOKEN &&
    token.TOKEN.length > 0 &&
    token.ACCESS_END &&
    expireIsClose
  ) {
    return true;
  }
  return false;
};

export const isValidToken = token => {
  if (
    token &&
    token.TOKEN &&
    token.TOKEN.length > 0 &&
    token.ACCESS_END &&
    Date.now() < dataParse(token.ACCESS_END)
  ) {
    return true;
  }
  return false;
};

export const removeTokenFromLs = async () => {
  await localStorage.removeItem(localStorageKeys.AUTH_TOKEN);
};

export const setTokenToLs = async token => {
  return await LocalStorage.set(localStorageKeys.AUTH_TOKEN, token);
};

export const getAccessToken = () => {
  const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
  //FIXME: Такое ощущение что тут если токена нет в любом случае будет возвращаться null условия кажутся избыточными
  //и или и catch вместе
  try {
    return JSON.parse(token).TOKEN || null;
  } catch (e) {}
  return null;
};
