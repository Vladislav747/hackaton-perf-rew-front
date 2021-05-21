import { fork, takeLatest, put, all, select } from "redux-saga/effects";

import {
  actionTypes,
  setCamerasToFavouritesAction,
  setFavouriteIdGroupAction,
} from "./actions";

import {
  favouritesCamerasSelector,
  favouriteGroupIdSelector,
} from "./selectors";

import { requestForSagaWorker } from "../../helpers/api/requestWrappers";

import apiMethods from "../../helpers/api/apiMethods";
import { createArrFromObj, createObjFromArr } from "../../helpers/utilsFunc";

/**
 * Init Module
 */
import { actionTypes as actionTypesUser } from "../user";

/** NewFlist */
import {
  cleanAllSelectedAction,
  setSelectedObjectsFinishAction,
} from "../newFlist/actions";

import { setSelectedCamsToLs } from "../../helpers/newFlist";
/** NewFlist */
import { authorizedSelector } from "../user";

export const saga = function*() {
  yield all([
    fork(favouriteInitWatcher),
    fork(favouriteCamerasWatcher),
    fork(chooseFavouriteWatcher),
  ]);
};

export const favouriteInitWatcher = function*() {
  yield takeLatest(
    actionTypesUser.AUTH_COMPLETE as any,
    getCamerasFromFavouritesWorker
  );
};

export const favouriteCamerasWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.GET_CAMERAS_FROM_FAVOURITES as any,
      getCamerasFromFavouritesWorker
    ),
    takeLatest(
      actionTypes.ADD_CAMERA_TO_FAVOURITES as any,
      addCameraToFavouritesWorker
    ),
    takeLatest(
      actionTypes.DELETE_CAMERA_FROM_FAVOURITES as any,
      deleteCameraFromFavouritesWorker
    ),
  ]);
};

export const chooseFavouriteWatcher = function*() {
  yield takeLatest(
    actionTypes.CHOOSE_FAVOURITES as any,
    chooseFavouritesWorker
  );
};

/**
 * Получить камеры из избранного
 */
export const getCamerasFromFavouritesWorker = function*(): any {
  const authorizedStore = yield select(authorizedSelector);
  //Запрашиваем информацию об избранных группах только будучи авторизованным
  if (authorizedStore) {
    const res: any = yield requestForSagaWorker({
      requestRouteName: apiMethods.getFavouriteCameras,
    });
    if (res) {
      const { cameraIds, id } = res;
      yield put(setCamerasToFavouritesAction(createArrFromObj(cameraIds)));
      yield put(setFavouriteIdGroupAction(id));
    }
  }
};

/**
 * Добавить камеру в избранное
 */
const addCameraToFavouritesWorker = function*({
  payload,
}: addCameraToFavouritesWorkerType): any {
  const { cameraId } = payload;

  //Получаем все камеры из избранного
  let favouritesCamerasStore = yield select(favouritesCamerasSelector);
  //Делаем все через структуру SET чтобы не было дублей
  const newFavouritesCameras: number[] = Array.from(
    new Set([...favouritesCamerasStore, ...[cameraId]])
  );

  //Если у нас id избранной группы то значит группа уже создана - изначально у каждого пользователя она не создана
  let favouriteGroupIdStore = yield select(favouriteGroupIdSelector);

  if (favouriteGroupIdStore) {
    //Обновляем существующую группу
    yield requestForSagaWorker({
      requestRouteName: apiMethods.updateFavouriteGroup,
      requestProps: {
        groupId: favouriteGroupIdStore,
        camerasIds: newFavouritesCameras,
      },
    });
  } else {
    //Нужно создать группу сначала
    //Если мы только создали группу то API вернет нам id группы избранного - его необходимо занести в store
    const res: any = yield requestForSagaWorker({
      requestRouteName: apiMethods.addFavouriteGroup,
      requestProps: {
        camerasIds: createObjFromArr(newFavouritesCameras),
      },
    });

    const { id } = res;
    yield put(setFavouriteIdGroupAction(id));
  }

  yield put(setCamerasToFavouritesAction(newFavouritesCameras));
};

/**
 * Удалить камеру из избранного
 */
const deleteCameraFromFavouritesWorker = function*({
  payload,
}: deleteCameraFromFavouritesWorkerType): any {
  const { cameraId } = payload;

  let favouritesCamerasStore = yield select(favouritesCamerasSelector);
  const favouriteGroupIdStore = yield select(favouriteGroupIdSelector);

  const favouritesCamerasStoreFitlered: number[] = favouritesCamerasStore.filter(
    (el: number) => el !== cameraId
  );

  //Обновляем существующую группу
  yield requestForSagaWorker({
    requestRouteName: apiMethods.updateFavouriteGroup,
    requestProps: {
      groupId: favouriteGroupIdStore,
      camerasIds: favouritesCamerasStoreFitlered,
    },
  });

  yield put(setCamerasToFavouritesAction(favouritesCamerasStoreFitlered));
};

/**
 * Выбрать все камеры из избранного и установить их на экран
 */
const chooseFavouritesWorker = function*(): any {
  let favouritesCamerasStore = yield select(favouritesCamerasSelector);

  //Для начала очистим прошлый выбор камер
  yield put(cleanAllSelectedAction());
  yield put(setSelectedObjectsFinishAction(favouritesCamerasStore));

  //Занести в LS
  setSelectedCamsToLs(favouritesCamerasStore);
};
