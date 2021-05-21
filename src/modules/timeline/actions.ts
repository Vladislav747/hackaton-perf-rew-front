import { moduleName } from "./module";

const appName = process.env.REACT_APP_NAME;

export const actionTypes = {
  SET_CURSOR_LOCKED_STATUS: `${appName}/${moduleName}/SET_CURSOR_LOCKED_STATUS`,
};

export const setCursorLockedStatusAction = (
  timelineCursorLockedStatus: boolean
) => {
  return {
    type: actionTypes.SET_CURSOR_LOCKED_STATUS,
    payload: {
      timelineCursorLockedStatus,
    },
  };
};
