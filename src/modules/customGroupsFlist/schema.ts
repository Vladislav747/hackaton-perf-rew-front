export const SEARCH_ID: string = "search";
export const SEARCH_PID: string = "search_pid";

export const objectTypes = {
    GROUP: "GROUP",
    CAMERA: "CAMERA",
};

export const stateSchema = {
    cameras: {
        byId: {},
        allIds: [],
    },

    searchString: "",

    linkName: "",

    groups: {
        byId: {
          [SEARCH_ID]: {
            OBJECT: "GROUP",
            ID: SEARCH_ID,
            NAME: "Результаты поиска",
          },
        },
        allIds: [SEARCH_ID],
      },
    
    failedLimitedIds: [],
    loadingLimitedIds: [],
    isInit: false,
    isLoading: false,
    loadingLimitedIdsForSelect: [],
    selectedObjects: [],
    activeObjectId: null,
    objectsState: {
        byId: {
            [SEARCH_ID]: {
                id: SEARCH_ID,
                children: [],
                parentId: SEARCH_PID,
                relationId: SEARCH_ID,
                isLoaded: false,
                RELATION_OBJECT: objectTypes.GROUP,
            },
        },
        allIds: [SEARCH_ID],
    },
    fullSelectedGroups: [],
};
