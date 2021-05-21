import apiMethods from ".";

import { call, race, delay } from "redux-saga/effects";

import sendErrorToSentry from "../sentry/index";
//@todo убрать после переписывания api на ts
const apiMethodsTs: any = apiMethods;
const defaultTimeout = 10000;

export const requestForSagaWorker = function*({
  requestRouteName,
  requestProps,
  requestTimeout,
}: requestForSagaWorkerProps): IterableIterator<WrapperIterator> {
  try {
    //@ts-ignore
    const { response, timeout } = yield race({
      response: call([apiMethodsTs, requestRouteName], requestProps),
      timeout: delay(requestTimeout || defaultTimeout),
    });
    if (timeout) {
      throw new Error(
        `Request getCameraEvents timeout. More ${requestTimeout ||
          defaultTimeout}`
      );
    }
    return {
      ...response,
    };
  } catch (e) {
    sendErrorToSentry(`Method ${requestRouteName} failed with ${e}`, {
      tags: {
        section: requestRouteName,
      },
    });
    return {
      failed: true,
    };
  }
};
