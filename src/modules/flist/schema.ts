import sendErrorToSentry from "../../helpers/sentry";

export const SEARCH_ID: string = "search";
/**
 * Родитель результаты поиска
 */
export const SEARCH_PID: string = "search_pid";
export const ROOT_ID: string = "0";
/**
 * Родитель результаты поиска
 */
export const ROOT_PID: string = "root";

export const ObjectStateSchema = {
  id: null,
  children: [],
  parentId: null,
  relationId: null,
  RELATION_OBJECT: null,
  isLoaded: false,
};

export const objectTypes = {
  GROUP: "GROUP",
  CAMERA: "CAMERA",
};

export const CameraSchema = {
  OBJECT: objectTypes.CAMERA,
  ID: null,
  NAME: "",
  HLS: "",
  REALTIME_HLS: "",
  ACCESS: {
    LIVE: { STATUS: null, REASON: "" },
    ARCHIVE: { STATUS: null, REASON: "" },
    DOWNLOAD: { STATUS: null, REASON: "" },
    MOVEMENT: { STATUS: null, REASON: "" },
  },
  SNAPSHOT: {
    HD: "",
    LOSSY: "",
  },
  ARCHIVE: {
    LINK: "",
    START_TIME: "",
    STOP_TIME: "",
  },
};

export const GroupSchema = {
  OBJECT: objectTypes.GROUP,
  ID: null,
  NAME: null,
};

export const StateSchema = {
  cameras: {
    byId: {},
    allIds: [],
  },
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
  listStore: [],
  activeObjectId: null,
  isLoading: false,
  isInit: false,
  rootIsLoaded: false,
  selectedObjects: [],
  searchString: "",
  failedLimitedIds: [],
  loadingLimitedIds: [],
  loadingLimitedIdsForSelect: [],
  extraObjects: [],
  fullSelectedGroups: [],
};

/**
 * Создать форматировоного родителя для store по типу pid_id
 * @param {string} pid
 * @param {string} id
 */
export const createFormattedActiveParentObject = (pid: string, id: string) => {
  return `${pid}_${id}`;
};

/**
 * Получить сам ID(группу) - ключ после нижнего подчеркивания
 * @param {string} key
 */
export const getIdByObjectKey = function(key: string) {
  try {
    return key.split("_")[1];
  } catch (error) {
    sendErrorToSentry(`getIdByObjectKey Ошибка получения ${error}`, {
      place: "src/modules/flist/schema.js",
    });
    return "0";
  }
};

/**
 * Получить родителя камеры
 * @param {string} key
 */
export const getParentObjectKey = function(key: string): string {
  try {
    return key.split("_")[0];
  } catch (error) {
    sendErrorToSentry(`getParentObjectKey Ошибка получения ${error}`, {
      place: "src/modules/flist/schema.js",
    });
    return "0";
  }
};

/**
 * Определить к какой группе относится объект? к камерам или к группе камер
 * @param {object} object - Чаще всего тут приходит ObjectsState
 * @param {object} relations
 */
export const getRelationObject = (
  object: getRelationSchemaObjectType = {},
  relations: getRelationSchemaRelationsType = {}
) => {
  //TODO: усилить типизацию
  /*
   
    Найти в объекте RELATION_OBJECT и присвоить переменной relationName значение  этого ключа
     relationName - это либо CAMERA или GROUP
  */
  const { RELATION_OBJECT: relationName } = object;

  //@ts-ignore-start
  if (object && relations[relationName]) {
    if (
      //@ts-ignore-start
      relations[relationName].byId &&
      //@ts-ignore-start
      relations[relationName].byId[object.relationId]
    ) {
      //@ts-ignore-start
      if (object.relationId == "search") {
        return { ID: 0, NAME: "Результаты поиска" };
      } else {
        //@ts-ignore-start
        return relations[relationName].byId[object.relationId];
      }
    }

    switch (relationName) {
      case objectTypes.CAMERA: {
        return { ...CameraSchema };
      }
      case objectTypes.GROUP: {
        return { ...GroupSchema };
      }
      default:
        return {};
    }
  } else {
    //@todo чинить в следующем реквесте. Пока это несет только вред.
    /*sendErrorToSentry(
      `getRelationObject ошибка отсутствия объекта object=${object}`
    );*/
  }
};
