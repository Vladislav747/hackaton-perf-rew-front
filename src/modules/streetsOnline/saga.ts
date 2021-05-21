import { viewTypes } from "../../modules/streetsOnline/schema";

import { fork, takeLatest, all, select, put } from "redux-saga/effects";

import {
  setSelectedViewToLs,
  setCalculatedGridNumToLs,
} from "../../helpers/streetsOnlineElements/ls";

import {
  actionTypes,
  putActiveCamerasAction,
  filterActiveCamerasAction,
} from "./actions";

import { selectActivePlayerCams } from "./selectors";

export const saga = function* () {
  yield all([
    fork(getViewSagaWatcher),
    fork(getGridCalculationWatcher),
    fork(addCameraToActiveWatcher),
    fork(removeCameraFromActiveWatcher),
  ]);
};

export const getGridCalculationWatcher = function* () {
  yield all([
    takeLatest(actionTypes.SET_CALCULATED_NUM, gridCalcilationSaveWorker),
  ]);
};

export const getViewSagaWatcher = function* () {
  yield all([
    takeLatest(actionTypes.CHANGE_VIEW_GRID_TYPE, viewTypeSaveWorker),
    takeLatest(actionTypes.CHANGE_VIEW_GRID_TYPE, cleanAllActiveCamerasWorker),
  ]);
};

export const addCameraToActiveWatcher = function* () {
  yield all([
    //@ts-ignore
    takeLatest(actionTypes.ADD_CAMERA_TO_ACTIVE, addCameraToActiveWorker),
  ]);
};

export const removeCameraFromActiveWatcher = function* () {
  yield all([
    //@ts-ignore
    takeLatest(
      actionTypes.REMOVE_CAMERA_FROM_ACTIVE,
      removeCameraFromActiveWorker
    ),
  ]);
};

const viewTypeSaveWorker = function* (data: viewSelectPayloadData) {
  const selectedView = data.payload.newViewType || viewTypes.BIG_PANEL;
  yield setSelectedViewToLs(selectedView);
};

const gridCalcilationSaveWorker = function* (data: gridCalculationPayloadData) {
  const calculated = data.payload.num || 3;
  yield setCalculatedGridNumToLs(calculated);
};

const addCameraToActiveWorker = function* (data: activeCameraId) {
  const { id } = data.payload;
  const camerasActive = yield select(selectActivePlayerCams);
  //Проверим то что такой камеры не существует перед внесением ее в список
  if (!camerasActive.includes(id)) {
    yield put(putActiveCamerasAction([id]));
  }
};

//Удалить камеру из активных
const removeCameraFromActiveWorker = function* (data: activeCameraId) {
  const { id } = data.payload;
  const camerasActive = yield select(selectActivePlayerCams);
  const filteredCamerasActive = camerasActive.filter((el: any) => el !== id);
  yield put(filterActiveCamerasAction(filteredCamerasActive));
};

//Очищаем все активные камеры при смене типа отображения камер
const cleanAllActiveCamerasWorker = function* () {
  yield put(filterActiveCamerasAction([]));
};
