import {
  fork,
  takeLatest,
  put,
  all,
  call,
  race,
  delay,
  select,
} from "redux-saga/effects";

import {
  actionTypes,
  authCompleteAction,
  authErrorAction,
  updateUsernameAction,
  frontendIsReadyStatusAction,
} from "./actions";

import { setPlayAll, cleanActiveCameras } from "../streetsOnline/actions";

//@ts-ignore
import { push } from "react-router-redux";

import {
  getGroupAction,
  setActiveObjectIdCompleteAction,
} from "../flist/actions";
import { filterActiveCamerasAction } from "../streetsOnline/actions";

import { userNameSelector } from "./selectors";

import { getLimitedInfoStartAction } from "../flist/actions";

import { getSelectedCamsFromLs } from "../../helpers/flist";

import apiMethods, { setToken } from "../../helpers/api/apiMethods";
import { DEFAULT_FETCH_TIMEOUT } from "../../helpers/api";
import { setLoginToLs, getLoginFromLs } from "../../helpers/user";
import { requestForSagaWorker } from "../../helpers/api/requestWrappers";
import {
  getAuthTokenFromLs,
  isValidToken,
  setTokenToLs,
  removeTokenFromLs,
} from "../../helpers/authTokens";

import sendErrorToSentry from "../../helpers/sentry";
import { getPersonalGroupsForUserAction } from "../customGroupsModal";

export const saga = function*() {
  yield all([fork(authSagaWatcher)]);
};

export const authSagaWatcher = function*() {
  yield all([
    takeLatest(actionTypes.AUTH_START as any, authStartWorker),
    takeLatest(actionTypes.AUTH_COMPLETE as any, authCompleteWorker),
    takeLatest(actionTypes.LOG_OUT as any, authLogOutWorker),
    takeLatest(actionTypes.UPDATE_TOKEN as any, updateTokenWorker),
  ]);
};

export const updateTokenWorker = function*({
  payload,
}: updateTokenWorkerType): any {
  const { token } = payload;
  try {
    const { timeoutCheck } = yield race({
      token: call([apiMethods, apiMethods.checkToken]),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeoutCheck) {
      const error = new Error("Превышено время ожидания для checkToken");
      throw error;
    }

    // Если получили 200 значит токен валиден. Берем мета-дату.
    const tokenData = yield requestForSagaWorker({
      requestRouteName: apiMethods.getTokenInfo,
    });
    if (tokenData.failed) {
      // только если токен уже не валиден.
      const isValid = yield call(isValidToken, token);
      if (!isValid) {
        const error = new Error("Превышено время ожидания для getTokenInfo");
        throw error;
      } else {
        yield put(authCompleteAction(token));
      }
    } else {
      yield put(authCompleteAction(tokenData));
    }
  } catch (e) {
    yield put(authErrorAction("Не удалось обновить токен"));
    sendErrorToSentry(`Не удалось обновить токен ${e}`);
  }
  yield put(authCompleteAction(token));
};

export const authStartWorker = function*({
  payload,
}: authStartWorkerType): any {
  const { username } = payload;
  const token = yield call(getAuthTokenFromLs);
  const isValid = yield call(isValidToken, token);
  if (isValid) {
    yield put(authCompleteAction(token));
    return;
  }
  yield call(removeTokenFromLs);
  try {
    const { token, timeout } = yield race({
      token: call([apiMethods, apiMethods.auth], payload),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      const error = new Error("Превышено время ожидания");
      //@ts-ignore-start
      error.canShowUser = true;
      throw error;
    }
    //Если все успешно заносим данные по логину в localStorage
    yield setLoginToLs(username);
    yield put(authCompleteAction(token));
    return;
  } catch (e) {
    let message = "Неизвестная ошибка";
    if (e.canShowUser && e.message) {
      message = e.message;
    }
    if (e && e.response && e.response.status === 422) {
      message = "Неверный логин или пароль";
    }
    sendErrorToSentry(`Ошибка при авторизации + ${e.message}`);
    yield put(authErrorAction(message));
  }
};

export const authLogOutWorker = function*(): any {
  //Обнуляем токен авторизации
  yield call(removeTokenFromLs);

  yield call(setToken);
  //Обнуляю localStorage с логином
  yield setLoginToLs("");

  //Убираем старые камеры
  //@todo FIXME: которые ранее были доступны зарегистрированному пользователю
  //не могу понять как лучше фильтровать возможно что то сделать на беке

  //обновляем список доступных камер после выхода из личного кабинета
  yield put(getGroupAction("0"));
  yield put(frontendIsReadyStatusAction(false));

  //искуственно выполняем обновление списка
  yield put(setActiveObjectIdCompleteAction("0_16"));

  const camerasFromLsRaw = getSelectedCamsFromLs();

  if (camerasFromLsRaw?.length) {
    const loadingLimitedIds: string[] = [];
    //Нам важно понять какой тип данных там лежит
    if (camerasFromLsRaw[0].toString().includes("_")) {
      camerasFromLsRaw.forEach((camera: string) => {
        const [rid] = camera.split("_");
        loadingLimitedIds.push(rid);
      });
    } else {
      camerasFromLsRaw.forEach((camera: any) => {
        loadingLimitedIds.push(camera.toString());
      });
    }

    yield put(
      getLimitedInfoStartAction(loadingLimitedIds, camerasFromLsRaw, true)
    );
    yield put(setPlayAll(false));
  }
  yield put(cleanActiveCameras());

  yield put(push("/"));
};

export const authCompleteWorker = function*({
  payload,
}: authCompleteWorkerType) {
  debugger;
  const { data } = payload;
  //Переназначаем логин с localStorage в store
  const userName = yield select(userNameSelector);

  if (!userName) {
    let userNameLs = getLoginFromLs();
    let dataUser = { username: userNameLs };
    yield put(updateUsernameAction(dataUser));
  }

  yield call(setTokenToLs, data);
  yield call(setToken);
  //обновляем список доступных камер после авторизации
  yield put(getGroupAction("0"));
  //Сбрасываем активные пллеры

  //Очищаем все активные камеры
  yield put(filterActiveCamerasAction([]));

  yield put(frontendIsReadyStatusAction(true));

  const camerasFromLsRaw = getSelectedCamsFromLs();

  if (camerasFromLsRaw?.length) {
    const loadingLimitedIds: string[] = [];
    //Нам важно понять какой тип данных там лежит
    if (camerasFromLsRaw[0].toString().includes("_")) {
      camerasFromLsRaw.forEach((camera: string) => {
        if (camera) {
          const [rid] = camera.split("_");
          loadingLimitedIds.push(rid);
        }
      });
    } else {
      camerasFromLsRaw.forEach((camera: any) => {
        loadingLimitedIds.push(camera.toString());
      });
    }

    yield put(getLimitedInfoStartAction(loadingLimitedIds, camerasFromLsRaw));
  }

  yield put(getPersonalGroupsForUserAction());
};
