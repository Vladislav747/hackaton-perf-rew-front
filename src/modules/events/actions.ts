import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

/**`${appName}/${moduleName}/actionName`**/
export const actionTypes = {
  START_UPDATE_EVENTS: `${appName}/${moduleName}/START_UPDATE_EVENTS`,
  FINISH_UPDATE_EVENTS: `${appName}/${moduleName}/FINISH_UPDATE_EVENTS`,
  EVENTS_FAILED_OR_NOT_FOUND_ERROR: `${appName}/${moduleName}/EVENTS_FAILED_OR_NOT_FOUND_ERROR`,
  CLEAN_EVENTS_DATA: `${appName}/${moduleName}/CLEAN_EVENTS_DATA`,
  SET_EVENTS_DATE: `${appName}/${moduleName}/SET_EVENTS_DATE`,
};

export const setEventsDateAction = (
  cameraId: number,
  selectedEventsDate: Date
) => {
  return {
    type: actionTypes.SET_EVENTS_DATE,
    payload: {
      selectedEventsDate,
      cameraId,
      eventsLoadingInProgress: true,
      eventsNotFoundOrFailed: false,
    },
  };
};

export const cleanCameraEventsAction = () => {
  return {
    type: actionTypes.CLEAN_EVENTS_DATA,
  };
};

export const finishUpdateEventsAction = (cameraEvents: cameraEvent[]) => {
  return {
    type: actionTypes.FINISH_UPDATE_EVENTS,
    payload: {
      cameraEvents,
      eventsLoadingInProgress: false,
      eventsNotFoundOrFailed: false,
    },
  };
};

export const startUpdateEventsAction = (cameraId: number) => {
  return {
    type: actionTypes.START_UPDATE_EVENTS,
    payload: {
      cameraId,
      eventsLoadingInProgress: true,
      eventsNotFoundOrFailed: false,
    },
  };
};

export const eventsLoadFailedOrNotFoundAction = () => {
  return {
    type: actionTypes.EVENTS_FAILED_OR_NOT_FOUND_ERROR,
    payload: {
      eventsLoadingInProgress: false,
      eventsNotFoundOrFailed: true,
    },
  };
};
