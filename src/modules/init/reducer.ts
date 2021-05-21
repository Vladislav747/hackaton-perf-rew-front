import { actionTypes } from "./actions";
import { StateSchema } from "./schema";

/**
 * reducer
 **/
export default (state = { ...StateSchema }, action: Action) => {
  const { type, payload = {} } = action;
  switch (type) {
    case actionTypes.SET_UPDATE_TOKEN_INTERVAL: {
      const { tokenUpdateIntervalVal } = payload;
      return { ...state, tokenUpdateIntervalVal };
    }
    case actionTypes.START: {
      return { ...state, inProgress: true, complete: false };
    }
    case actionTypes.COMPLETE: {
      return { ...state, inProgress: false, complete: true };
    }

    case actionTypes.SET_HAS_SEEN_COPYRIGHT_BANNER_VAL: {
      const { hasSeenCopyrightBannerVal } = payload;
      return { ...state, hasSeenCopyrightBanner: hasSeenCopyrightBannerVal };
    }

    case actionTypes.SET_HAS_SEEN_REDIRECT_BANNER_VAL: {
      const { hasSeenRedirectBannerVal } = payload;
      return { ...state, hasSeenRedirectBanner: hasSeenRedirectBannerVal };
    }

    default:
      return state;
  }
};
