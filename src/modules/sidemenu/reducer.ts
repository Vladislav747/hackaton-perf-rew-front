import { actionTypes } from "./actions";
import { stateSchema } from "./schema";

export default (state = { ...stateSchema }, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_CITIES: {
      const { optionsForStreetsSubMenuStore } = action.payload;
      return {
        ...state,
        optionsForStreetsSubMenuStore,
      };
    }
    case actionTypes.SET_EXTENDED_SIDEBAR_STATUS: {
      const { showExtendedSidebarStatusStore } = action.payload;
      return {
        ...state,
        showExtendedSidebarStatusStore,
      };
    }

    case actionTypes.SET_SUBMENU_STREETS_STATUS: {
      const { showExtendedSubMenuStreetsStatusStore } = action.payload;
      return {
        ...state,
        showExtendedSubMenuStreetsStatusStore,
      };
    }

    case actionTypes.SET_SUBMENU_CUSTOM_GROUPS_STATUS: {
      const { showExtendedSubMenuCustomGroupsStatusStore } = action.payload;
      return {
        ...state,
        showExtendedSubMenuCustomGroupsStatusStore,
      };
    }

    default: {
      return state;
    }
  }
};
