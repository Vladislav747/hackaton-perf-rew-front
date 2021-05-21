import {
  fork,
  takeLatest,
  put,
  all,
  call,
  select,
  race,
  delay,
  take,
} from "redux-saga/effects";

import store from "../../store/store";

/**
 * INIT Module
 */
import {
  actionTypes,
  initCompleteAction,
  setUpdateTokenIntervalValAction,
  addTokenUpdateIntervalAction,
  runUpdateProcessAction,
  setHasSeenCopyrightBannerValAction,
  setHasSeenRedirectBannerValAction,
  setVersionOfLsAction,
  initDefaultSelectedAction,
} from "./actions";

import { tokenUpdateIntervalValSelector } from "./selectors";

import {
  getAuthTokenFromLs,
  removeTokenFromLs,
  isValidToken,
  needUpdate,
} from "../../helpers/authTokens";

import {
  getHasSeenCopyrightBannerFromLs,
  setHasSeenCopyrightBannerToLs,
} from "../../helpers/copyrightBanner";

import {
  getVersionOfLsFromLs,
  setVersionOfLsToLs,
  removeFullSelectedGroupsFromLs,
  getSelectedCamsFromLs,
} from "../../helpers/flist";

import { currentVersionOfLs } from "../../helpers/storage/constants";

import { parseCamsIds } from "../flist/helpers";

/**
 * User Module
 */
import {
  actionTypes as actionTypesUser,
  authCompleteAction,
  updateTokenAction,
} from "../user/actions";
import sendErrorToSentry from "../../helpers/sentry";

import { parseIdsFromGroupContent } from "../../helpers/init";

/**
 * NewFlist Module
 */
import { setSelectedObjectsStartAction } from "../newFlist";
import { requestForSagaWorker } from "../../helpers/api/requestWrappers";
import {
  getGroupErrorAction,
  getGroupStartAction,
  groupLoadCompleteAction,
  changeGroupFinishAction,
} from "../newFlist";

/**
 * SidemenuModule
 */
import { setCitiesAction } from "../sidemenu/actions";
import { DEFAULT_FETCH_TIMEOUT } from "../../helpers/api";
import apiMethods from "../../helpers/api/apiMethods";
import { prepareResult, setSubmenuOptionsToLs } from "../../helpers/sidemenu";

export const saga = function*() {
  yield all([fork(setVersionOfLsSagaWatcher)]);
  yield all([
    fork(initSagaWatcher),
    fork(setCopyrightBannerSagaWatcher),
    fork(setRedirectBannerSagaWatcher),
  ]);
};

export const initSagaWatcher = function*() {
  yield takeLatest(actionTypes.START, initStartSagaWorker);
  yield takeLatest(actionTypes.START, showCopyrightBannerSagaWorker);
  yield takeLatest(actionTypes.START, showRedirectBannerSagaWorker);
  yield takeLatest(
    actionTypes.INIT_DEFAULT_SELECTED,
    initDefaultSelectedObjectsWorker
  );
  yield takeLatest(actionTypes.COMPLETE, initLsSelectedObjectsWorker);
  yield takeLatest(actionTypes.COMPLETE, createSubMenuWorker);
  yield takeLatest(actionTypes.START_TOKEN_UPDATE, tokenUpdateStartWorker);
  yield takeLatest(actionTypes.RUN_UPDATE_PROCESS, updateTokenWorker);
};

export const setCopyrightBannerSagaWatcher = function*() {
  yield takeLatest(
    actionTypes.CHANGE_HAS_SEEN_COPYRIGHT_BANNER_VAL as any,
    changeCopyrightBannerSagaWorker
  );
};

export const setRedirectBannerSagaWatcher = function*() {
  yield takeLatest(
    actionTypes.СHANGE_HAS_SEEN_REDIRECT_BANNER_VAL as any,
    changeRedirectBannerSagaWorker
  );
};

export const setVersionOfLsSagaWatcher = function*() {
  yield takeLatest(actionTypes.SET_LS_VERSION as any, setVersionOfLsSagaWorker);
};

export const updateTokenWorker = function*(): any {
  const token = yield call(getAuthTokenFromLs);
  const isNeedUpdate = yield call(needUpdate, token);
  if (isNeedUpdate) yield put(updateTokenAction(token));
};

/**
 * Обработчик запуск обновления токена
 */
export const tokenUpdateStartWorker = function*() {
  const updateIntervalVal = select(tokenUpdateIntervalValSelector);

  //@ts-ignore-start
  if (updateIntervalVal) clearInterval(updateIntervalVal);

  const newInterval = setInterval(() => {
    store.dispatch(runUpdateProcessAction());
  }, 12 * 60 * 60 * 1000);
  //@ts-ignore
  yield put(setUpdateTokenIntervalValAction(newInterval));
};

/**
 * Проверка текущего токена из LS
 */
export const initStartSagaWorker = function*(): any {
  const token = yield call(getAuthTokenFromLs);
  const isValid = yield call(isValidToken, token);

  if (isValid) {
    const isNeedUpdate = yield call(needUpdate, token);

    if (isNeedUpdate) {
      yield put(updateTokenAction(token));
    } else {
      yield put(authCompleteAction(token));
      //Дождаться окончания авторизации
      yield take(actionTypesUser.AUTH_COMPLETE);
    }
  } else {
    // если токен не валиден - удаляем.
    yield call(removeTokenFromLs);
  }
  yield put(addTokenUpdateIntervalAction());
  yield put(initCompleteAction());
};

/**
 * Проверка того стоит ли показывать баннер о защите авторских прав или нет
 */
export const showCopyrightBannerSagaWorker = function*(): any {
  const hasSeenBannerLs = yield getHasSeenCopyrightBannerFromLs();
  if (!hasSeenBannerLs) {
    yield put(setHasSeenCopyrightBannerValAction(false));
  } else {
    yield put(setHasSeenCopyrightBannerValAction(true));
  }
};

/*
 * Проверка того стоит ли показывать баннер о редиректе или нет
 */
export const showRedirectBannerSagaWorker = function*(): any {
  const hasSeenBannerLs = yield sessionStorage.getItem("showRedirectBanner");
  if (!!hasSeenBannerLs) {
    yield put(setHasSeenRedirectBannerValAction(true));
  } else {
    yield put(setHasSeenRedirectBannerValAction(false));
  }
};

/**
 * Установка значения в LS значения стоит ли показывать в будущем баннер о защите авторских прав или нет
 */
export const changeCopyrightBannerSagaWorker = function*({
  payload,
}: changeCopyrightBannerSagaWorkerType): any {
  const { hasSeenCopyrightBannerVal } = payload;
  if (
    hasSeenCopyrightBannerVal !== undefined &&
    hasSeenCopyrightBannerVal !== null
  ) {
    //Устанавливаем в store
    yield put(setHasSeenCopyrightBannerValAction(hasSeenCopyrightBannerVal));
    //Устанавливаем в LS
    yield setHasSeenCopyrightBannerToLs(hasSeenCopyrightBannerVal);
  }
};

/*
 * Установка значения о том что баннер о редиректе уже показан
 */
export const changeRedirectBannerSagaWorker = function*({
  payload,
}: changeRedirectBannerSagaWorkerType): any {
  const { hasSeenRedirectBannerVal } = payload;
  if (hasSeenRedirectBannerVal === true) {
    //Устанавливаем в sessionStorage
    sessionStorage.setItem("showRedirectBanner", `${hasSeenRedirectBannerVal}`);
  }
};

/**
 * Установка версионности LS
 */
export const setVersionOfLsSagaWorker = function*(): any {
  yield call(setVersionOfLsToLs, currentVersionOfLs);
};

/**
 * Тут мы занимаемся только восстановлением выбранных камер из LS (при перезагрузке или при заходе на страницу)
 */
export const initLsSelectedObjectsWorker = function*(): any {
  // Выбираем выбранные id и текущую версию из лс .
  const selectedCamsFromLs = yield call(getSelectedCamsFromLs);
  const versionOfLs = yield call(getVersionOfLsFromLs);

  if (selectedCamsFromLs) {
    let selectedCams;
    //Проверяем старые ли у нас id в LS или нет
    if (versionOfLs) {
      selectedCams = selectedCamsFromLs;
    } else {
      selectedCams = parseCamsIds(selectedCamsFromLs);
      //Удаляем deprecated keys если они вдруг есть
      yield call(removeFullSelectedGroupsFromLs);
      //Устанавливаем версионность ls
      yield put(setVersionOfLsAction());
    }
    yield put(setSelectedObjectsStartAction(selectedCams));
  } else {
    yield put(initDefaultSelectedAction());
    //Если Ls по версионности пуста значит мы ее не установили
    if (!versionOfLs || versionOfLs !== currentVersionOfLs) {
      //Устанавливаем версионность ls
      yield put(setVersionOfLsAction());
    }
  }
};

/**
 * Тут мы занимаемся только восстановлением выбранных камер из LS (при перезагрузке или при заходе на страницу)
 */
export const initDefaultSelectedObjectsWorker = function*(): any {
  const groupId = 239;
  const parentId = 16;

  //заполняем список на рендеринг.
  const groupContent: any = yield requestForSagaWorker({
    requestRouteName: apiMethods.getGetGroup,
    requestProps: groupId,
  });

  //Проверяем что загрузка удалась
  if (groupContent.failed && groupId) {
    //Если загрузка не удалась сообщаем об этом
    yield put(getGroupErrorAction());
    // и грузим корень (16 null)
    yield put(getGroupStartAction(16, null));
  } else {
    //Если загрузка удалась то догружаем необходимые данные
    yield put(
      groupLoadCompleteAction({
        groupId: groupId,
        groupContent,
        parentId: parentId,
      })
    );

    //Мне нужны только ID камер
    const parseIds = parseIdsFromGroupContent(groupContent);

    yield put(changeGroupFinishAction(groupId));
    yield put(setSelectedObjectsStartAction(parseIds));
  }
};

/**
 * Создать подменю бокового меню
 */
const createSubMenuWorker = function*(): any {
  try {
    const { data, timeout } = yield race({
      data: call([apiMethods, apiMethods.getGetGroup], "16"),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      throw new Error(
        `Request timeout in createSubMenuWorker. More ${DEFAULT_FETCH_TIMEOUT}`
      );
    }
    const preparedResult = prepareResult(data);

    yield put(setCitiesAction(preparedResult));
    yield setSubmenuOptionsToLs(preparedResult);
  } catch (e) {
    sendErrorToSentry(
      `Ошибка получения списка для подменю. СreateSubMenuWorker${e}`
    );
  }
};
