import { actionTypes } from "./actions";
import { StateSchema } from "./schema";

/**
 * reducer
 **/
export default (state = { ...StateSchema }, action: Action) => {
  const { type, payload = {} } = action;
  switch (type) {
    case actionTypes.SET_CAMERAS_TO_FAVOURITES: {
      const { favouritesCameras } = payload;
      return { ...state, favouritesCameras };
    }

    case actionTypes.SET_FAVOURITE_ID_GROUP: {
      const { favouriteGroupId } = payload;
      return { ...state, favouriteGroupId };
    }

    default:
      return state;
  }
};
