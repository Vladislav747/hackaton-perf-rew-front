import { actionTypes } from "./actions";
import { StateSchema } from "./schema";

/**
 * reducer
 **/
export default (state = { ...StateSchema }, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.STOP: {
      return { ...state, carusel: false };
    }
    case actionTypes.RUN: {
      return { ...state, carusel: true };
    }
    default:
      return state;
  }
};
