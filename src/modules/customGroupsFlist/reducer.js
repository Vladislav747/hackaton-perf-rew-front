import { actionTypes } from "./actions";
import { stateSchema } from "./schema";

export default (state = { ...stateSchema }, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_LIMITED_INFO_START: {
      const { loadingLimitedIds, loadingLimitedIdsForSelect } = payload;
      return { ...state, loadingLimitedIds, loadingLimitedIdsForSelect };
    }
    case actionTypes.GET_LIMITED_INFO_FINISH: {
      const { cameras } = payload;
      return {
        ...state,
        cameras,
        loadingLimitedIds: [],
        loadingLimitedIdsForSelect: [],
      };
    }
    case actionTypes.GET_LIMITED_INFO_ERROR: {
      const { failedLimitedIds } = payload;
      return {
        ...state,
        failedLimitedIds,
        loadingLimitedIds: [],
        loadingLimitedIdsForSelect: [],
      };
    }
    case actionTypes.SET_FULL_SELECTED_GROUPS: {
      const { fullSelectedGroups } = payload;
      return {
        ...state,
        fullSelectedGroups,
      };
    }
    case actionTypes.CLEAN_ALL: {
      return {
        ...state,
        selectedObjects: [],
        fullSelectedGroups: [],
      };
    }

    case actionTypes.GET_GROUP_START: {
      return { ...state, isLoading: true };
    }

    case actionTypes.SET_ROOT_IS_LOADED: {
      const { rootIsLoaded } = payload;
      return { ...state, rootIsLoaded: !!rootIsLoaded };
    }

    case actionTypes.GET_GROUP_ERROR: {
      return { ...state, isLoading: false };
    }

    case actionTypes.UPDATE_LIST: {
      const { data = {} } = payload;
      const { cameras, groups, objectsState } = data;
      return {
        ...state,
        isLoading: false,
        cameras: { ...cameras },
        groups: { ...groups },
        objectsState: { ...objectsState },
      };
    }
    case actionTypes.UPDATE_OBJECTS: {
      const { objectsState } = payload;
      return { ...state, objectsState: { ...objectsState } };
    }
    case actionTypes.SET_ACTIVE_OBJECT_ID_COMPLETE: {
      const { id: activeObjectId } = payload;
      return { ...state, activeObjectId };
    }
    case actionTypes.INIT_LIST_START: {
      return { ...state, isInit: false };
    }
    case actionTypes.INIT_LIST_COMPLETE: {
      return { ...state, isInit: true };
    }

    case actionTypes.SET_SELECTED_OBJECTS: {
      const { selectedObjects = [] } = payload;
      return { ...state, selectedObjects: selectedObjects };
    }

    case actionTypes.SET_SELECTED_OBJECTS_FILTER: {
      const { selectedObjects = [] } = payload;
      return { ...state, selectedObjects: selectedObjects };
    }

    case actionTypes.CHANGE_SEARCH_STRING: {
      const { searchString = "" } = payload;
      return { ...state, searchString };
    }
    case actionTypes.SEARCH_START: {
      return { ...state, isLoading: true };
    }
    case actionTypes.SEARCH_COMPLETE: {
      return { ...state, isLoading: false };
    }
    case actionTypes.SEARCH_ERROR: {
      return { ...state, isLoading: false };
    }
    case actionTypes.SET_LIST: {
      const { list } = payload;
      return { ...state, listStore: list };
    }
      
    case actionTypes.SET_LINK_NAME: {
      const { linkName } = payload;
      return { ...state, linkName };
    }
      
      
    
    default:
      return state;
  }
};
