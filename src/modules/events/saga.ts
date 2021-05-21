import { fork, takeLatest, all, put } from "redux-saga/effects";

import { actionTypes } from "./actions";
import {
  finishUpdateEventsAction,
  eventsLoadFailedOrNotFoundAction,
} from "./actions";

import apiMethods from "../../helpers/api/apiMethods";
import { requestForSagaWorker } from "../../helpers/api/requestWrappers";

import { generateDownloadTime } from "../../helpers/archive";
import { countOffsetFromNowAndGenerateDate } from "../../helpers/time";

export const saga = function*() {
  yield all([fork(EventsSagaWatcher)]);
};

export const EventsSagaWatcher = function*() {
  yield all([
    takeLatest(actionTypes.SET_EVENTS_DATE, eventsUpdateWorker),
    takeLatest(actionTypes.START_UPDATE_EVENTS, eventsUpdateWorker),
  ]);
};

const eventsUpdateWorker = function*(actionData: any) {
  const { payload } = actionData;
  const { cameraId } = payload;
  const requestResult = yield requestForSagaWorker({
    requestRouteName: apiMethods.getCameraEvents,
    requestProps: {
      CAMERA_ID: cameraId,
      START_DATE: generateDownloadTime(
        countOffsetFromNowAndGenerateDate(-1 * (24 * 60 * 60 * 1000))
      ),
      END_DATE: generateDownloadTime(new Date()),
    },
    requestTimeout: 60000,
  });
  if (requestResult.failed) {
    yield put(eventsLoadFailedOrNotFoundAction());
  } else {
    yield put(finishUpdateEventsAction(requestResult.RESULT));
  }
};
