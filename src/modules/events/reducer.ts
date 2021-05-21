import { actionTypes } from "./actions";
import { StateSchema } from "./schema";

/**
 *reducer
 **/
export default (state = { ...StateSchema }, action: eventsReduxAction) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_EVENTS_DATE: {
      return {
        ...state,
        eventsLoadingInProgress: true,
        eventsNotFoundOrFailed: false,
      };
    }
    case actionTypes.START_UPDATE_EVENTS: {
      return {
        ...state,
        eventsLoadingInProgress: true,
        eventsNotFoundOrFailed: false,
      };
    }
    case actionTypes.CLEAN_EVENTS_DATA: {
      return {
        eventsNotFoundOrFailed: false,
        cameraEvents: [],
        eventsLoadingInProgress: false,
      };
    }
    case actionTypes.FINISH_UPDATE_EVENTS: {
      const { cameraEvents } = payload;
      return {
        ...state,
        cameraEvents,
        eventsLoadingInProgress: false,
        eventsNotFoundOrFailed: false,
      };
    }
    case actionTypes.EVENTS_FAILED_OR_NOT_FOUND_ERROR: {
      return {
        ...state,
        eventsLoadingInProgress: false,
        eventsNotFoundOrFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
