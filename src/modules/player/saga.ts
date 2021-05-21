import { fork, takeLatest, all, put, select } from "redux-saga/effects";

import {
  actionTypes,
  setMuteStatusAction,
  setVolumeLevelAction,
} from "./actions";

import { muteStatusSelector } from "./selectors";

export const saga = function*() {
  yield all([fork(volumeLevelSagaWatcher), fork(muteSagaWatcher)]);
};

export const volumeLevelSagaWatcher = function*() {
  yield takeLatest(
    actionTypes.SET_VOLUME_LEVEL as any,
    setVolumeLevelSagaWorker
  );
};

export const muteSagaWatcher = function*() {
  yield takeLatest(actionTypes.SET_MUTE_STATUS as any, muteSagaWorker);
};

/**
 * Обработчик при изменении громкости
 */
export const setVolumeLevelSagaWorker = function*({
  payload,
}: volumeLevelSagaWorkerType): any {
  const { volumeLevel, muteIconClicked } = payload;

  const [muteStatusStore] = yield all([select(muteStatusSelector)]);

  /* 
    Если увеличилась громкость то нужно сделать
    режим выключить режим mute
  */
  // Проверяем что ранее уже не был выключен режим Mute
  if (+volumeLevel > 0 && muteStatusStore && !muteIconClicked) {
    yield put(setMuteStatusAction(false));
  } else if (volumeLevel == "0" && !muteIconClicked) {
    yield put(setMuteStatusAction(true));
  }
};

/**
 * Обработчик при нажатии mute иконки
 */
export const muteSagaWorker = function*({
  payload,
}: volumeLevelSagaWorkerType): any {
  const { muteStatus } = payload;

  if (muteStatus) {
    yield put(setVolumeLevelAction("0", true));
  } else {
    yield put(setVolumeLevelAction("1", true));
  }
};
