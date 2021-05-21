import sendErrorToSentry from "../sentry";

/**
 * Валидация объекта что у него есть свойства
 * ID, NAME, HLS, SNAPSHOT и что у свойства SNAPSHOT есть свойства HD и LOsSY
 * @param {object} cameraObject
 */
export const validateCameraObject = cameraObject => {
  const { NAME, HLS, ID } = cameraObject;

  let SNAPSHOT = cameraObject.SNAPSHOT;

  if (
    !ID ||
    !NAME ||
    !HLS ||
    !SNAPSHOT ||
    !typeof SNAPSHOT === "object" ||
    !SNAPSHOT.hasOwnProperty("HD") ||
    !SNAPSHOT.hasOwnProperty("LOSSY")
  ) {
    sendErrorToSentry("Ошибка при валидации объекта validateCameraObject");
    return { VALID: false };
  }

  const VALID = true;
  const HDSNAPSHOT = SNAPSHOT.HD;
  const LOSSYSNAPSHOT = SNAPSHOT.LOSSY;

  return {
    NAME,
    HLS,
    HDSNAPSHOT,
    LOSSYSNAPSHOT,
    VALID,
    ID,
  };
};

/*
 * Для сортировки имен (сортировки по имени камеры)
 */
export const utilsFunction = {
  sortFuncName: (a, b) => {
    return a.localeCompare(b);
  },
};

/**
 * Типы возможных сортировок
 */
export const defaultSortSettings = {
  default: {
    id: 0,
    name: "default",
    text: "",
    sortFunc: (camsList, type) => camsList,
    display: false,
  },
  //TODO: Специально скрыл сортировку по дате - поскольку не знаю что с ней делать
  // sortByDate: {
  //   id: 1,
  //   name: "sortByDate",
  //   text: "По дате",
  //   sortFunc: (camerasList, type) => {
  //     return camerasList.sort((validatedCo1, validatedCo2) => {
  //       if (
  //         validatedCo1.VALID &&
  //         validatedCo2.VALID &&
  //         typeof validatedCo1.ID === "number" &&
  //         typeof validatedCo2.ID === "number"
  //       ) {
  //         return type === "inc"
  //           ? validatedCo1.ID - validatedCo2.ID
  //           : validatedCo2.ID - validatedCo1.ID;
  //       }
  //     });
  //   },
  //   display: true,
  // },
  sortByName: {
    id: 2,
    name: "sortByName",
    text: "По алфавиту",
    sortFunc: (camerasList, type) => {
      return camerasList.sort((validatedCo1, validatedCo2) => {
        //FIXME: Не излишняя ли проверка validatedCo2.VALID разве может что то еще тут прилететь кроме string
        if (
          validatedCo1.VALID &&
          validatedCo2.VALID &&
          typeof validatedCo1.NAME === "string" &&
          typeof validatedCo2.NAME === "string"
        ) {
          return type === "inc"
            ? utilsFunction.sortFuncName(validatedCo1.NAME, validatedCo2.NAME)
            : utilsFunction.sortFuncName(validatedCo2.NAME, validatedCo1.NAME);
        }
      });
    },
    display: true,
  },
};

export const getSortSettings = () => defaultSortSettings;

export const getFunctionByName = functionName => {
  if (defaultSortSettings[functionName]) {
    return defaultSortSettings[functionName].sortFunc;
  }
  return defaultSortSettings["default"].sortFunc;
};
