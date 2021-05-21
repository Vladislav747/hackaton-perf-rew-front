import { actionTypes } from "./actions";
import { StateSchema } from "./schema";

/**
 * reducer
 **/
export default (state = { ...StateSchema }, action) => {
  const { type, payload = {} } = action;
  switch (type) {
    case actionTypes.READY: {
      const { frontendIsReadyStatus } = payload;
      return {
        ...state,
        frontendIsReadyStatus,
      };
    }
    case actionTypes.AUTH_START: {
      const { username } = payload;
      return {
        ...state,
        authInProgress: true,
        username,
        authErrors: "",
      };
    }
    case actionTypes.AUTH_COMPLETE: {
      const { TOKEN } = action.payload.data;
      return {
        ...state,
        authInProgress: false,
        authorized: true,
        token: TOKEN,
      };
    }
    case actionTypes.AUTH_ERROR: {
      const {
        payload: { message = "" },
      } = action;
      return {
        ...state,
        authInProgress: false,
        authErrors: message,
      };
    }
    case actionTypes.LOG_OUT: {
      return {
        ...state,
        authorized: false,
        authInProgress: false,
        authError: "",
        username: "",
      };
    }
    case actionTypes.UPDATE_USERNAME: {
      const { username } = payload;
      return {
        ...state,
        username,
      };
    }
    default:
      return state;
  }
};
