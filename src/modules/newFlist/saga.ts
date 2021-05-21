import { fork, takeLatest, take, all, call, put, select } from "redux-saga/effects";

import { requestForSagaWorker } from "../../helpers/api/requestWrappers";
import apiMethods from "../../helpers/api/apiMethods";
import { formatDataForSearchObjects } from "../../helpers/newFlist";

import {
  getCurrentGroupFromLs,
  setCurrentGroupToLs,
  setSelectedCamsToLs,
} from "../../helpers/newFlist";

import { getVersionOfLsFromLs } from "../../helpers/flist";

import sendErrorToSentry from "../../helpers/sentry";

import _ from "lodash";

import { getIdByObjectKey, getParentObjectKey } from "../flist/schema";

import { initFailedAction, camerasReadyAction } from "../init/actions";

import { getSelectedCamsFromLs } from "../../helpers/flist";

import {
  actionTypes,
  getGroupErrorAction,
  getGroupStartAction,
  groupLoadCompleteAction,
  changeGroupFinishAction,
  setSelectedObjectsFinishAction,
  setCurrentSelectedGroupIdAction,
  setLimitedCamerasDataAction,
  addGroupToGroupsStoreAction,
  searchStartAction,
  searchCompleteAction,
  searchErrorAction,
  changeGroupStartAction,
  changeSearchStringAction,
  toggleSelectedFinishAction,
  setIsLoadingAction,
} from "./actions";

import {
  getGroupContentById,
  currentSelectedGroupIdSelector,
  getGroupByGroupId,
  selectedCamerasSelector,
  currentGroupContentSelector,
} from "./selectors";

// Для открытия модального окна с предупреждением
import {
  openWarningModalAction,
  actionTypes as WarningModalActionTypes,
} from "../WarningModal";

export const saga = function*() {
  yield all([
    fork(groupsWatcher),
    fork(initWatcher),
    fork(searchSagaWatcher),
    fork(selectionWatcher),
    fork(toggleObjectWatcher),
    fork(cleanWatcher),
  ]);
};

export const initWatcher = function*() {
  yield takeLatest(actionTypes.INIT_LIST_START as any, initListWorker);
};

export const groupsWatcher = function*() {
  yield all([
    takeLatest(actionTypes.GET_GROUP_START as any, getGroupStartWorker),
    takeLatest(
      actionTypes.SET_CURRENT_SELECTED_GROUP_START as any,
      changeGroupWorker
    ),
  ]);
};

export const selectionWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.SET_SELECTED_OBJECTS_START as any,
      setSelectedObjectsWorker
    ),
    takeLatest(
      actionTypes.SELECT_ALL_CAMERAS_IN_CURRENT_GROUP as any,
      selectAllCamerasInCurrentGroupWorker
    ),
  ]);
};

export const toggleObjectWatcher = function*() {
  yield takeLatest(
    actionTypes.TOGGLE_SELECTED_IDS_START as any,
    toggleObjectWorker
  );
};

export const searchSagaWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.CHANGE_SEARCH_STRING as any,
      changeSearchStringWorker
    ),
    takeLatest(actionTypes.SEARCH_START as any, searchStartWorker),
    takeLatest(actionTypes.SEARCH_COMPLETE as any, searchCompleteWorker),
  ]);
};

export const cleanWatcher = function*() {
  yield all([
    takeLatest(actionTypes.CLEAN_ALL_SELECTED as any, cleanAllWorker),
    takeLatest(actionTypes.CLEAN_ONE_CAMERA as any, cleanOneCameraWorker),
  ]);
};

export const toggleObjectWorker = function*({ payload }: any): any {
  const { toggledIds } = payload;
  const currentSelectedCamerasIds = yield select(selectedCamerasSelector);

  const selectedCamerasIds = _.xor(
    [...currentSelectedCamerasIds],
    [...toggledIds]
  );

  if (selectedCamerasIds.length > 0) {
    // Берем с бэкенда данные о камерах в лс
    const camerasData: any = yield requestForSagaWorker({
      requestRouteName: apiMethods.getCamerasLimitedInfo,
      requestProps: {
        CAMERA_IDS: [...selectedCamerasIds],
      },
    });
    if (camerasData.failed) {
      yield put(initFailedAction());
    } else {
      //Ставим статус что загружается
      yield put(setIsLoadingAction(true));
      yield put(setLimitedCamerasDataAction(camerasData));
      yield put(setIsLoadingAction(false));
    }
  }

  setSelectedCamsToLs(selectedCamerasIds);

  yield put(toggleSelectedFinishAction(selectedCamerasIds));
};

/**
 * Загрузка currentGroup для FCamList компонента
 */
export const initListWorker = function*(): any {
  //Проверку на восстановление LS selected elements мы прошли в модуле init
  // Выбираем текущую группу из лс и редакса.
  const currentGroupLs = yield call(getCurrentGroupFromLs);
  const versionOfLs = yield call(getVersionOfLsFromLs);

  //Id группы
  let groupId;
  //Текущая группа
  let currentGroup;
  //Parent группы
  let parentId;

  //versionOfLs может быть установлены ранее
  if (currentGroupLs) {
    //У нас ключ current group нового образца
    if (typeof currentGroupLs.ID !== "undefined" && versionOfLs) {
      //Если у нас есть версия LS и текущая группа в LS
      //то это LS нового образца соотвественно сразу складывам данные
      //по группе по currentGroup в соотв переменные
      groupId = currentGroupLs.ID;
      parentId = currentGroupLs.PARENT_ID;
      currentGroup = currentGroupLs;
    } else {
      //Если у нас нет версии LS но есть текущая группа в LS
      //то значит мы работаем со старыми LS ключами(склеенными)
      //и необходима некоторая манипуляция

      //Устанавливаем текщую ID группы - выпарсовываю ключ из склеено id и превращая его в число
      groupId = parseInt(getIdByObjectKey(currentGroupLs.activeObjectId));

      //Устанавливаем текщую ID родителя - выпарсовываю ключ из склеено id и превращая его в число
      parentId = parseInt(getParentObjectKey(currentGroupLs.activeObjectId));
      //Устанавливаем текущую группу которая нам в дальнейшем потребуется для установки в LS и redux
      currentGroup = {
        ID: groupId,
        NAME: currentGroupLs.NAME,
        PARENT_ID: parentId,
      };
    }

    //Нужно предварительно загрузить данные по нашей группе в groups store
    //Сначала проверяем не была ли она загружен ранее и только если не был загружаем его
    //Загружаем его используя наши данные из LS
    const selectedGroup = yield select(getGroupByGroupId, { groupId });

    if (!selectedGroup) {
      const groupContentFromLs = {
        groupId: { ID: groupId, NAME: currentGroupLs.NAME, OBJECT: "GROUP" },
      };
      yield put(
        addGroupToGroupsStoreAction({
          groupId,
          groupContent: groupContentFromLs,
          parentId,
        })
      );
    }
  } else {
    //Если данных из LS нет - если в ключе пусто значит мы туда ничего не положили из LS
    // то грузим в лс и редакс дефолтный id группы (239 Челябинск)
    groupId = 239;
    parentId = 16;

    currentGroup = {
      ID: groupId,
      NAME: "Челябинск",
      PARENT_ID: parentId,
    };
  }

  //заполняем список на рендеринг.
  const groupContent: any = yield requestForSagaWorker({
    requestRouteName: apiMethods.getGetGroup,
    requestProps: groupId,
  });

  //Проверяем что загрузка удалась
  if (groupContent.failed && groupId) {
    //Если загрузка не удалась сообщаем об этом
    yield put(getGroupErrorAction());
    // и грузим корень (16 0)
    yield put(getGroupStartAction(16, 0));
  } else {
    //Если загрузка удалась то догружаем необходимые данные
    yield put(
      groupLoadCompleteAction({
        groupId: groupId,
        groupContent,
        parentId: parentId,
      })
    );
    yield put(changeGroupFinishAction(groupId));
  }
  //Заносим данные в LS и redux
  setCurrentGroupToLs(currentGroup);
  yield put(setCurrentSelectedGroupIdAction(groupId));
};

/**
 * Изменение группы
 * @param {number} groupId
 * @param {string} streetsMode - режим улиц бокового меню
 */
export const changeGroupWorker = function*({ payload }: any) {
  const { groupId, streetsMode } = payload;

  const lastCurrentGroupId = yield select(currentSelectedGroupIdSelector);
  if (lastCurrentGroupId === "search") {
    yield put(changeSearchStringAction("", false));
  }

  /* Проверяем была ли уже группа загружена и закеширована. */
  const selectedGroupContent = yield select(getGroupContentById, { groupId });

  let parentId;

  if (groupId == 16) {
    parentId = 0;
  } else if (groupId == 0) {
    parentId = null;
    //Если это вызов со стороны бокового меню со стороны умных улиц
  } else if (streetsMode) {
    parentId = 16;
  } else {
    parentId = yield select(currentSelectedGroupIdSelector);
  }

  // Если еще нет - загружаем.
  if (!selectedGroupContent) {
    const groupContent: any = yield requestForSagaWorker({
      requestRouteName: apiMethods.getGetGroup,
      requestProps: groupId,
    });

    if (groupContent.failed) {
      yield put(getGroupErrorAction());
    } else {
      yield put(groupLoadCompleteAction({ groupId, groupContent, parentId }));
    }
  }

  const selectedGroup = yield select(getGroupByGroupId, { groupId });

  const currentGroup = {
    ID: groupId,
    NAME: selectedGroup.content.NAME,
    PARENT_ID: parentId,
  };
  //Заносим данные в LS
  setCurrentGroupToLs(currentGroup);
  //Сохраняем данные в redux
  yield put(changeGroupFinishAction(groupId));
};

export const getGroupStartWorker = function*({ payload }: any) {
  const { groupId, parentId } = payload;
  const groupContent: any = yield requestForSagaWorker({
    requestRouteName: apiMethods.getGetGroup,
    requestProps: groupId,
  });
  if (groupContent.failed) {
    yield put(getGroupErrorAction());
  } else {
    yield put(groupLoadCompleteAction({ groupId, groupContent, parentId }));
  }
};

/**
 * Запускается  при перезагрузки страницы и при выборе камеры
 * @param {Array} selectedObjects
 */
export const setSelectedObjectsWorker = function*({
  payload,
}: setSelectedObjectsWorkerType): any {
  const { selectedObjects } = payload;

  //Установить данные в LS по ключу SELECTED_CAM_IDS
  yield setSelectedCamsToLs(Array.from(new Set(selectedObjects)));

  if (selectedObjects.length > 0) {
    // Берем с бэкенда данные о камерах в лс
    const camerasData: any = yield requestForSagaWorker({
      requestRouteName: apiMethods.getCamerasLimitedInfo,
      requestProps: {
        CAMERA_IDS: [...selectedObjects],
      },
    });
    if (camerasData.failed) {
      yield put(initFailedAction());
    } else {
      //Ставим статус что загружается
      yield put(setIsLoadingAction(true));
      yield put(setLimitedCamerasDataAction(camerasData));
      yield put(setIsLoadingAction(false));
    }
  }
  yield put(camerasReadyAction());
  //Установить данные в redux по ключу SELECTED_CAM_IDS
  yield put(
    setSelectedObjectsFinishAction(Array.from(new Set(selectedObjects)))
  );
};

/**
 * Поменять подстроку для поиска - после смена строки запускается поиск(searchStartWorker)
 * @param {string} searchString, - поисковая строка
 * @param {boolean} startSearch - флаг того проводить ли поиск
 * - иногда нужно просто подменить поисковую строку без начала поиска
 */
export const changeSearchStringWorker = function*({
  payload,
}: changeSearchStringWorkerType): any {
  const { searchString, searchStart } = payload;
  if (searchStart) {
    yield put(searchStartAction(searchString));
  }
};

/**
 * Осуществить поиск по подстроке searchString
 * @param {string} searchString, - поисковая строка
 */
export const searchStartWorker = function*({
  payload,
}: searchStartWorkerType): any {
  const { searchString } = payload;

  if (searchString === "") {
    //Перекидывать на корень
    //Заносим данные в LS и redux
    const currentGroup = {
      ID: 16,
      NAME: "Все улицы онлайн",
      PARENT_ID: 0,
    };
    yield put(changeGroupStartAction(currentGroup.ID));
    setCurrentGroupToLs(currentGroup);
    yield put(setCurrentSelectedGroupIdAction(currentGroup.ID));
    return;
  }

  try {
    const searchedData: any = yield requestForSagaWorker({
      requestRouteName: apiMethods.search,
      requestProps: searchString,
    });

    //Переупаковываю объект в массив.
    const arrFromObj = [];

    for (const key in searchedData) {
      arrFromObj.push(searchedData[key]);
    }

    yield put(searchCompleteAction(arrFromObj));
  } catch (e) {
    yield put(searchErrorAction(e.message || "Ошибка поиска"));
    sendErrorToSentry(`Ошибка поиска ${e}`);
  }
};

/**
 * Завершение поиска
 *  @param {object} data, - поисковая строка
 *  @param {boolean} forceSetActiveId, - поисковая строка
 */
export const searchCompleteWorker = function*({
  payload,
}: searchCompleteWorkerType): any {
  const { data } = payload;

  const formattedData = formatDataForSearchObjects(data);

  const currentGroup = {
    ID: "search",
    NAME: "Результаты поиска",
    PARENT_ID: 16,
  };

  const groupContentFromLs = {
    groupId: { ID: currentGroup.ID, NAME: currentGroup.NAME, OBJECT: "GROUP" },
  };

  yield put(
    addGroupToGroupsStoreAction({
      groupId: currentGroup.ID,
      groupContent: groupContentFromLs,
      parentId: currentGroup.PARENT_ID,
    })
  );

  yield put(
    groupLoadCompleteAction({
      groupId: currentGroup.ID,
      groupContent: formattedData,
      parentId: currentGroup.PARENT_ID,
    })
  );

  //Заносим то что текущая группа Результаты поиска
  //Заносим данные в redux;
  yield put(setCurrentSelectedGroupIdAction(currentGroup.ID));
};

/**
 * Обработчик удаления одной камеры из выделенных
 * @param {string | number} cameraId - id камеры
 */
export const cleanOneCameraWorker = function*({
  payload,
}: newCleanOneCameraWorkerType): any {
  const { cameraId } = payload;

  let selectedCamerasStore = yield select(selectedCamerasSelector);

  const selectCamerasFitlered: Array<number> = selectedCamerasStore.filter(
    (el: number) => el != +cameraId
  );

  yield put(setSelectedObjectsFinishAction(selectCamerasFitlered));

  yield setSelectedCamsToLs(selectCamerasFitlered);
};

/**
 * Очистить все
 */
const cleanAllWorker = function*() {
  // проверяем имеются ли сейчас камеры в LocalStorage
  const camerasFromLsRaw = getSelectedCamsFromLs();

  if (camerasFromLsRaw.length) {
    // Выводим модальное окно с предупреждением и дожидаемся ответа
    yield put(openWarningModalAction(true));
    // Дожидаемся ответа в предупреждающем об удалении камер модальном окне
    yield take(
      (action: Action) =>
        action.type === WarningModalActionTypes.DELETE_ALL_CAMERAS_FLAG &&
        action.payload &&
        action.payload?.deleteAllCamerasFlagStore
    );

    yield put(setSelectedObjectsFinishAction([]));

    setSelectedCamsToLs([]);
  }
};

export const selectAllCamerasInCurrentGroupWorker = function*({
  payload,
}: selectAllCamerasInCurrentGroupWorkerType): any {
  const contentOfGroup = yield select(currentGroupContentSelector);
  const selectedCamerasStore = yield select(selectedCamerasSelector);

  const contentOfGroupValues = Object.values(contentOfGroup);

  const camerasInCurrentGroup: any[] = [];
  contentOfGroupValues.forEach((element: any) => {
    if (element.OBJECT === "CAMERA") {
      //@ts-ignore
      camerasInCurrentGroup.push(element.ID);
    }
  });

  //Занести все значения кроме тех что уже занесены в store
  const selectedWithout = _.without(
    camerasInCurrentGroup,
    ...selectedCamerasStore
  );

  const inFullSelected = selectedWithout.length === 0;

  const selectedCamerasIds: number[] = inFullSelected
    ? _.without(selectedCamerasStore, ...camerasInCurrentGroup)
    : _.union(selectedCamerasStore, camerasInCurrentGroup);

  yield put(setSelectedObjectsFinishAction(selectedCamerasIds));

  //Занести в LS
  setSelectedCamsToLs(selectedCamerasIds);
};
