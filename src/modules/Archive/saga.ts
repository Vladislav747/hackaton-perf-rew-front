import {
  fork,
  takeLatest,
  all,
  put,
  retry,
  call,
  race,
  delay,
} from "redux-saga/effects";

import {
  orderVideo,
  checkAndGetVideo,
  isVideoMoreThanHour,
} from "../../helpers/archive";
import sendErrorToSentry from "../../helpers/sentry";

import { actionTypes, setLoadingProgressAction } from "./actions";

import apiMethods from "../../helpers/api/apiMethods";
import {
  notifyError,
  notifyDismiss,
  notifyLoadInfo,
} from "../../helpers/toast";

//todo опять по упорке ерунды какой-то напихали... переименовать.
export const saga = function*() {
  yield all([fork(getDownloadVideoSagaWatcher)]);
};

export const getDownloadVideoSagaWatcher = function*() {
  yield all([
    takeLatest(actionTypes.START_DOWNLOAD_VIDEO_WORKER, downloadVideoWorker),
    takeLatest(actionTypes.UPDATE_CAMERA_DATA_START, cameraDataUpdateWorker),
  ]);
};

const cameraDataUpdateWorker = function*({ payload }: any) {
  const { cameraId } = payload;
  try {
    const { data, timeout } = yield race({
      data: call([apiMethods, apiMethods.getCamerasLimitedInfo], {
        CAMERA_IDS: [cameraId],
      }),
      timeout: delay(10000),
    });
    if (timeout) {
      throw new Error(`Request getCameraEvents timeout. More ${10000}`);
    }
    const cameraData = data[cameraId];
    yield put({ type: actionTypes.SET_CAMERA_DATA, payload: { cameraData } });
  } catch (e) {
    yield put({ type: actionTypes.CAMERA_DATA_NOT_FOUND_ERROR });
  }
};

const downloadVideoWorker = function*(data: any): any {
  try {
    const orderResult = yield call(orderVideo, data.payload);

    const { startTimeAsString, stopTimeAsString } = data.payload;
    yield put(setLoadingProgressAction(true));
    const timeoutShortDownload = 2000;
    const timeoutBigDownload = 10000;
    const numberOfTriesDownload = 2000;
    /**
     * Как часто мы будем уточнять готов ли промежуток для скачивания
     * Промежуток в миллисекундах
     * Если запрашиваемое видео для скачивания более
     * чем 1 час то делаем запрос раз в 10 сек иначе раз в 2сек
     */
    const timeoutInMs = isVideoMoreThanHour(startTimeAsString, stopTimeAsString)
      ? timeoutBigDownload
      : timeoutShortDownload;

    /**
     * Ошибка получения видео
     */
    if (!orderResult.JOB_ID && orderResult.error) {
      yield put({
        type: actionTypes.VIDEO_DOWNLOAD_FAILED,
        payload: { errorMessage: orderResult.error },
      });
      notifyError(`${orderResult.error}`);
      yield put(setLoadingProgressAction(false));
    } else {
      notifyLoadInfo();
      const { downloadLink, name } = yield retry(
        numberOfTriesDownload,
        timeoutInMs,
        checkAndGetVideo,
        {
          jobId: orderResult.JOB_ID,
          cameraId: data.payload.cameraId,
        }
      );
      if (downloadLink && name) {
        yield put({
          type: actionTypes.VIDEO_DOWNLOAD_SUCCESS,
          payload: { downloadLink, name },
        });
      } else {
        yield put({
          type: actionTypes.VIDEO_DOWNLOAD_FAILED,
          payload: { error: "Ошибка загрузки видео" },
        });
      }
      notifyDismiss();
      yield put(setLoadingProgressAction(false));
    }
  } catch (error) {
    yield put({
      type: actionTypes.VIDEO_DOWNLOAD_FAILED,
      payload: { errorMessage: error },
    });
    sendErrorToSentry(`Ошибка при загрузке видео ${error}`);
    notifyDismiss();
    yield put(setLoadingProgressAction(false));
  }
};
