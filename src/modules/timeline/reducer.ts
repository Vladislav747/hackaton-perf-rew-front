import { actionTypes } from "./actions";
import { StateSchema } from "./schema";

/**
 * reducer
 **/
export default (state = { ...StateSchema }, action: any) => {
  const { type, payload = {} } = action;
  switch (type) {
    case actionTypes.SET_CURSOR_LOCKED_STATUS: {
      const { timelineCursorLockedStatus } = payload;
      return {
        ...state,
        timelineCursorLockedStatus,
      };
    }
    default:
      return state;
  }
};
