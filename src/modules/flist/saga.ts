import {
  fork,
  take,
  takeLatest,
  all,
  call,
  delay,
  race,
  put,
  select,
} from "redux-saga/effects";

import {
  actionTypes,
  groupLoadCompleteAction,
  getGroupErrorAction,
  updateListAction,
  getGroupAction,
  initListCompleteAction,
  setSelectedObjectsAction,
  setActiveObjectIdAction,
  setActiveObjectIdCompleteAction,
  searchStartAction,
  searchCompleteAction,
  searchErrorAction,
  updateObjectsAction,
  getLimitedInfoStartAction,
  getLimitedInfoFinishAction,
  getLimitedInfoErrorAction,
  setSelectedObjectsFilterAction,
  saveCurrentGroupToLsAction,
  updateFullSelectedGroupsAction,
  changeSearchStringAction,
  setListAction,
  fillLsWithDefaultDataAction,
} from "./actions";

import {
  changeViewType,
  setCalculatedNum,
  filterActiveCamerasAction,
} from "../streetsOnline/actions";

import {
  groupsSelector,
  camerasSelector,
  objectsStateSelector,
  objectStateSelector,
  selectedObjectsSelector,
  activeObjectIdSelector,
  fullSelectedGroupsSelector,
} from "./selectors";

import { selectActivePlayerCams } from "../streetsOnline/selectors";
import { viewTypes } from "../streetsOnline/schema";

import apiMethods from "../../helpers/api/apiMethods";
import { DEFAULT_FETCH_TIMEOUT } from "../../helpers/api";

import {
  setSelectedCamsToLs,
  removeSelectedCamsFromLs,
  removeSelectedGroupFromLs,
  removeCurrentGroupFromLs,
  getSelectedCamsFromLs,
  setAllSelectedGroupsToLs,
  getAllSelectedGroupsFromLs,
  getCurrentGroupFromLs,
  setCurrentGroupToLs,
  removeFullSelectedGroupsFromLs,
  removeAllSelectedGroupsFromLs,
  setFullSelectedGroupsToLs,
  getFullSelectedGroupsFromLs,
  checkAllKeysInLs,
} from "../../helpers/flist";

import {
  getSelectedViewFromLs,
  getCalculatedGridNumFromLs,
} from "../../helpers/streetsOnlineElements/ls";

import {
  objectTypes,
  ObjectStateSchema,
  createFormattedActiveParentObject,
  getRelationObject,
  getIdByObjectKey,
  getParentObjectKey,
  SEARCH_ID,
} from "./schema";

import {
  mapObjectWithProperty,
  filterElementsFromObject,
} from "../../helpers/collections";

import { validateActiveGroup, createNewArrayWithoutLink } from "./helpers";

import sendErrorToSentry from "../../helpers/sentry";

/**
 * SidemenuModule
 */

import { setCitiesAction } from "../sidemenu/actions";
import { prepareResult, setSubmenuOptionsToLs } from "../../helpers/sidemenu";
import { createArrFromObj } from "../../helpers/utilsFunc";

/* 
  Город по умолчанию который будет загружаться если человек первый раз зашел на сайт 
  16_239 это Челябинск
*/
const defaultParentCity = "16_239";
const defaultCity = "239";
const STREETS_ONLINE_CURRENT_GROUP = {
  activeObjectId: "0_16",
  NAME: "Улицы Онлайн",
};

export const saga = function*() {
  yield all([
    fork(getGroupSagaWatcher),
    fork(activeObjectWatcher),
    fork(fillLsWithDefaultDataSagaWatcher),
    fork(listInitSagaWatcher),
    fork(selectSagaWatcher),
    fork(searchSagaWatcher),
    fork(cleanWatcher),
    fork(updateCameraWatcher),
    fork(saveCurrentGroupToLsWatcher),
    fork(setListWatcher),
  ]);
};

export const updateCameraWatcher = function*() {
  yield all([
    takeLatest(actionTypes.GET_LIMITED_INFO_START as any, updateCamerasWorker),
  ]);
};

export const cleanWatcher = function*() {
  yield all([
    takeLatest(actionTypes.CLEAN_ALL, cleanAllWorker),
    takeLatest(actionTypes.CLEAN_ONE_CAMERA as any, cleanOneCameraWorker),
  ]);
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

export const getGroupSagaWatcher = function*() {
  yield all([
    takeLatest(actionTypes.GET_GROUP_START as any, getGroupStartWorker),
    takeLatest(actionTypes.GET_GROUP_COMPLETE as any, getGroupCompleteWorker),
  ]);
};

export const activeObjectWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.SET_ACTIVE_OBJECT_ID_START as any,
      setActiveObjectStartWorker
    ),
    takeLatest(
      actionTypes.SET_ACTIVE_OBJECT_ID_COMPLETE,
      setActiveObjectCompleteWorker
    ),
  ]);
};

export const listInitSagaWatcher = function*() {
  yield all([
    takeLatest(actionTypes.INIT_LIST_START, listInitStartWorker),
    takeLatest(actionTypes.INIT_LIST_START, createSubMenuWorker),
    takeLatest(actionTypes.INIT_LIST_COMPLETE, listInitCompleteWorker),
  ]);
};

export const fillLsWithDefaultDataSagaWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.FILL_LS_WITH_DEFAULT_DATA,
      fillLsWithDefaultDataWorker
    ),
  ]);
};

export const selectSagaWatcher = function*() {
  yield all([
    takeLatest(actionTypes.SELECT_TOGGLE_START as any, selectStartWorker),
    takeLatest(
      actionTypes.SET_SELECTED_OBJECTS as any,
      setSelectedObjectsWorker
    ),
    takeLatest(
      actionTypes.SET_SELECTED_OBJECTS as any,
      checkFullSelectedGroupsWorker
    ),
    takeLatest(
      actionTypes.SET_FULL_SELECTED_GROUPS,
      setFullSelectedGroupsWorker
    ),
  ]);
};

export const saveCurrentGroupToLsWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.SAVE_CURRENT_GROUP_TO_LS as any,
      saveCurrentGroupToLsWorker
    ),
  ]);
};

export const setListWatcher = function*() {
  yield all([
    takeLatest(actionTypes.UPDATE_LIST as any, setListWorker),
    takeLatest(actionTypes.UPDATE_OBJECTS as any, setListWorker),
    takeLatest(actionTypes.SET_ACTIVE_OBJECT_ID_COMPLETE as any, setListWorker),
  ]);
};

export const setFullSelectedGroupsWorker = function*(
  data: fullSelectedGroupAction
) {
  const { payload } = data;
  const { fullSelectedGroups } = payload;
  yield setFullSelectedGroupsToLs(fullSelectedGroups);
};

/**
 * Обработка нажатие корзины Удалить все
 * Очистка всех localStorage
 */
export const cleanAllWorker = function*() {
  removeSelectedCamsFromLs();
  removeFullSelectedGroupsFromLs();
  removeCurrentGroupFromLs();
  removeAllSelectedGroupsFromLs();
  yield put(setActiveObjectIdCompleteAction("0_16"));

  //Очищаем все активные камеры
  yield put(filterActiveCamerasAction([]));
};

/**
 * Обработчик удаления одной камеры из выделенных
 * @param {string} id - id камеры
 */
export const cleanOneCameraWorker = function*({
  payload,
}: cleanOneCameraWorkerType): any {
  const { id } = payload;

  let [selectedObjects] = yield all([select(selectedObjectsSelector)]);

  //id приходит к нам как число - поэтому приводим к строке
  const selectObjectsFitlered: Array<string> = selectedObjects.filter(
    (el: string) => getIdByObjectKey(el) !== id.toString()
  );
  //Вывел отдельное действие для удаление в store чтобы разделить логику

  yield put(setSelectedObjectsFilterAction(selectObjectsFitlered));
  //Обновляю LS
  yield setSelectedCamsToLs(selectObjectsFitlered);

  //Нужно убрать камеру из активных
  const camerasActive: Array<string> = yield select(selectActivePlayerCams);
  const filteredCamerasActive = camerasActive.filter(el => el !== id);
  yield put(filterActiveCamerasAction(filteredCamerasActive));
};

/**
 * Обработчик обновления списка камер
 * @param {array} loadingLimitedIds -
 * @param {array} loadingLimitedIdsForSelect -
 */
export const updateCamerasWorker = function*({
  payload,
}: updateCamerasWorkerType): any {
  const {
    loadingLimitedIds,
    loadingLimitedIdsForSelect,
    logoutActon,
  } = payload;
  try {
    const { data, timeout } = yield race({
      data: call([apiMethods, apiMethods.getCamerasLimitedInfo], {
        CAMERA_IDS: loadingLimitedIds,
      }),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      throw new Error(
        `Request getCamerasLimitedInfo timeout. More ${DEFAULT_FETCH_TIMEOUT}`
      );
    }
    const [currentCameras, selectedObjects] = yield all([
      select(camerasSelector),
      select(selectedObjectsSelector),
    ]);
    if (!logoutActon) {
      const byId = currentCameras.byId;
      const newCamerasById = Object.assign(byId, data);
      const newCameras = Object.assign(currentCameras, {
        byId: newCamerasById,
      });

      const newSelectedObjectsSet = new Set([
        ...selectedObjects,
        ...loadingLimitedIdsForSelect,
      ]);
      const newSelectedObjects = Array.from(newSelectedObjectsSet.values());

      yield put(getLimitedInfoFinishAction(newCameras));
      yield put(setSelectedObjectsAction(newSelectedObjects));
    } else {
      const newCameras = {
        byId: data,
        allIds: loadingLimitedIds,
      };

      const newSelectedObjectsSet = new Set([
        ...selectedObjects,
        ...loadingLimitedIdsForSelect,
      ]);
      const newSelectedObjects = Array.from(newSelectedObjectsSet.values());

      yield put(getLimitedInfoFinishAction(newCameras));
      yield put(setSelectedObjectsAction(newSelectedObjects));
    }
  } catch (e) {
    yield put(getLimitedInfoErrorAction(loadingLimitedIdsForSelect));
    sendErrorToSentry(`Ошибка при получении информации о камерах ${e}`);
  }
};

/**
 * Получение камер которые содержится в группе
 * либо получение групп которые находиться выше уровнем с сервера
 * @param {string} groupId
 * @param {string} parentObjectId
 */
export const getGroupStartWorker = function*({ payload }: any) {
  const { groupId, parentObjectId } = payload;
  try {
    const { data, timeout } = yield race({
      data: call(
        [apiMethods, apiMethods.getGetGroup],
        groupId === "0" ? "" : groupId
      ),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      throw new Error(`Request timeout. More ${DEFAULT_FETCH_TIMEOUT}`);
    }
    yield put(groupLoadCompleteAction({ data, groupId, parentObjectId }));
  } catch (e) {
    yield put(
      getGroupErrorAction(
        e.message || "Ошибка получения списка",
        groupId,
        parentObjectId
      )
    );
    sendErrorToSentry(`Ошибка получения списка ${e}`);
  }
};

/**
 * Формирование группы во всплывающем окне
 * @param {array} data
 * @param {string} groupId
 * @param {string} parentObjectId
 */
export const getGroupCompleteWorker = function*({
  payload,
}: getGroupCompleteWorkerType): any {
  const { data, groupId, parentObjectId } = payload;

  const [
    camerasStore,
    groupsStore,
    objectsStore,
    parentObjectSelect,
  ] = yield all([
    select(camerasSelector),
    select(groupsSelector),
    select(objectsStateSelector),
    /**
     * Тут отбор элемента в objectState в store по элементу id
     */
    select(objectStateSelector, { id: parentObjectId }),
  ]);

  /*
    Занести полученные данные с сервера в store
    в camerasStore 
    в groupsStore
    в objectsStore
  */
  for (let i = 0; i < data.length; i++) {
    //Заносим папку в группы
    if (data[i].OBJECT === objectTypes.GROUP) {
      mapObjectWithProperty(groupsStore, data[i], "ID");
    }
    //Заносим камеру в камеры
    if (data[i].OBJECT === objectTypes.CAMERA) {
      mapObjectWithProperty(camerasStore, data[i], "ID");
    }

    //Выстраиваем корректный порядок в objectsStore
    mapObjectWithProperty(
      objectsStore,
      {
        ...ObjectStateSchema,
        id: createFormattedActiveParentObject(groupId, data[i].ID),
        relationId: data[i].ID,
        RELATION_OBJECT: data[i].OBJECT,
        parentId: parentObjectId,
      },
      "id"
    );

    /*
      Проверяем что родитель есть и что его св-во children является массивом
     */
    if (parentObjectSelect && Array.isArray(parentObjectSelect.children)) {
      parentObjectSelect.children = [
        ...parentObjectSelect.children,
        createFormattedActiveParentObject(groupId, data[i].ID),
      ];
      parentObjectSelect.isLoaded = true;
    }
  }

  yield put(
    updateListAction({
      cameras: { ...camerasStore },
      groups: { ...groupsStore },
      objectsState: { ...objectsStore },
    })
  );
};

const setActiveObjectCompleteWorker = function*(
  props: activeObjectCompleteWorkerProps
) {
  const { payload } = props;
  // это текущий id группы в формате "parent_id"
  const { id: activeObjectId } = payload;
  saveCurrentGroupToLsAction(activeObjectId);
};

/**
 * Обработчик при установке активного элемента
 * @param {string} id
 */
const setActiveObjectStartWorker = function*({
  payload,
}: setActiveObjectWorkerType): any {
  const { id, init } = payload;

  const [objectsState, groupsState] = yield all([
    select(objectsStateSelector),
    select(groupsSelector),
  ]);

  //Если это корень то грузим все папки для корня
  if (id === undefined) {
    yield put(getGroupAction("0", null));
  } else {
    //Объект есть в objectState - данный функционал для хождения вперед в папки
    if (
      objectsState &&
      objectsState.byId[id] &&
      !objectsState.byId[id].isLoaded
    ) {
      const relation = getRelationObject(objectsState.byId[id], {
        [objectTypes.GROUP]: groupsState,
      });
      if (relation && relation.ID) {
        yield put(getGroupAction(relation.ID, id));
      }
    }
  }

  /**
   * Если вдруг по какой то причине у нас не определен родитель
   * то грузим корень
   */
  if (id === undefined || id === "search_pid") {
    yield put(setActiveObjectIdCompleteAction("0_16"));
    yield put(changeSearchStringAction(""));
  } else {
    yield put(setActiveObjectIdCompleteAction(id));
    // Если идет инициализация (при восстановлении из ls, то устанавливать то что уже установлено не надо.)
    if (!init) yield put(saveCurrentGroupToLsAction(id));
  }
};

/**
 * Запускается при обновлении страницы
 * или при первом запуске страницы
 */
const listInitStartWorker = function*(): any {
  // Здесь восстанавливаем последнюю выбранную группу.

  const [restoredParentDataFromLs, selectedObjectsFromLs] = yield all([
    getCurrentGroupFromLs(),
    getSelectedCamsFromLs(),
  ]);

  // Флаг, что ничего не было восстанослено из ls
  const noRestoredParentData =
    restoredParentDataFromLs === null || restoredParentDataFromLs == undefined;

  /**
   * Выбранные объекты в LS
   * Проверяем что данный объект LS существует или если ключ не пустой то элементы там есть
   */

  const noSelectedObject =
    selectedObjectsFromLs === null || selectedObjectsFromLs.length == 0;

  const validatedRestoredParentData = restoredParentDataFromLs
    ? restoredParentDataFromLs
    : STREETS_ONLINE_CURRENT_GROUP;

  //тут потенциально крах и провал.

  if (noSelectedObject && noRestoredParentData) {
    /*
    Если данных по выбранным камерам
    и данных по активному родителю нет 
    то выставляем по умолчанию Челябинск и все его камеры 
  */
    yield put(fillLsWithDefaultDataAction());
  } else {
    //Необходимо чтобы выводить вверху группу
    // Тут мы ставим активную группу в т.ч. с расчетом что ее нет в состоянии, при перезагрузки страницы.
    // Второй аргумент говорит о том, что логика ниже будет работать как для инициализации.
    /*
      Если данные по выбранным камерам и активному родителю в LS есть 
     */
    yield put(
      setActiveObjectIdAction(validatedRestoredParentData.activeObjectId, true)
    );
    yield restoreSelectedFromLs();
  }
  yield put(initListCompleteAction());
};

/**
 * Запускается при обновлении страницы
 * или при первом запуске страницы
 * При вызове данного метода будет проходиться
 * проверка localStorage
 */
const listInitCompleteWorker = function*(): any {
  //Проверка ключей localStorage
  const checkAllKeysLs = checkAllKeysInLs();

  if (!checkAllKeysLs.correctAll) {
    //В зависимости от ключа который неверен мы производим те или иные действия

    /*
      Если ключ SELECTED_CAM_IDS неверен то просто 
      очищаю ключи   FULL_SELECTED_GROUPS и  ALL_SELECTED_GROUPS и SELECTED_CAM_IDS
    */
    if (!checkAllKeysLs.correctSelectedCamIdsLs) {
      yield put(fillLsWithDefaultDataAction());
    } else if (!checkAllKeysLs.correctAllSelectedGroupLs) {
      /**
       * Если ключ  ALL_SELECTED_GROUPS неверен то заполняю LS по умолчанию
       */
      yield put(fillLsWithDefaultDataAction());
    } else if (!checkAllKeysLs.correctFullSelectedGroupLs) {
      /*
      Если ключ  FULL_SELECTED_GROUPS неверен то просто удаляю его
    */
      removeFullSelectedGroupsFromLs();
    } else if (
      !checkAllKeysLs.correctSelectedCamIdsLs &&
      !checkAllKeysLs.correctCurrentGroupLs
    ) {
      /*
      Если ключ SELECTED_CAM_IDS и CURRENT_GROUP неверны - запускаю восстановление по умолчанию
    */
      yield put(fillLsWithDefaultDataAction());
    }
  }
};

/*
 * Создать подменю бокового меню
 */
const createSubMenuWorker = function*(): any {
  try {
    const { data, timeout } = yield race({
      data: call([apiMethods, apiMethods.getGetGroup], "16"),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      throw new Error(
        `Request timeout in createSubMenuWorker. More ${DEFAULT_FETCH_TIMEOUT}`
      );
    }
    const preparedResult = prepareResult(data);

    yield put(setCitiesAction(preparedResult));
    yield setSubmenuOptionsToLs(preparedResult);
  } catch (e) {
    sendErrorToSentry(
      `Ошибка получения списка для подменю. СreateSubMenuWorker${e}`
    );
  }
};

/**
 * Восстановить данные из localStorage
 *
 * @param {*} currentGroupFromLs -текущая группа из ls
 * @param {*} selectedCamsFromLs - выбранные камеры из ls
 * @param {*} selectedViewLs
 * @param {*} calculatedGridNum
 * @param {*} groups
 * @param {*} objectsState
 *
 */
const restoreSelectedFromLs = function*(): any {
  const [
    currentGroupFromLs,
    selectedCamsFromLsRaw,
    allSelectedGroupLs,
    fullSelectedGroupLs,
    groups,
    objectsState,
    cameras,
  ] = yield all([
    getCurrentGroupFromLs(),
    getSelectedCamsFromLs(),
    getAllSelectedGroupsFromLs(),
    getFullSelectedGroupsFromLs(),
    select(groupsSelector),
    select(objectsStateSelector),
    select(camerasSelector),
  ]);

  const selectedViewLs: Promise<string | number> = getSelectedViewFromLs();
  const calculatedGridNum: Promise<number> = getCalculatedGridNumFromLs();

  yield put(changeViewType(selectedViewLs));

  yield put(setCalculatedNum(calculatedGridNum));

  //Если по какой то причине данных по количеству ячеек в калькуляторе нет то ставим по умолчанию FOUR_PANEL
  const defaultGridNum = 3;
  if (calculatedGridNum === null) {
    yield put(setCalculatedNum(defaultGridNum));
    yield put(changeViewType(viewTypes.FOUR_PANEL));
  }

  let { activeObjectId, NAME } = currentGroupFromLs || {};
  if (!activeObjectId) {
    return false;
  }

  //Только группы камер
  const newGroups: Array<string> = [];
  //Только ID камер
  const realIds: Array<string> = [];
  //Собираем ID камер и определяем какие группы камер у нас лежат в LS

  const selectedCamsFromLs = selectedCamsFromLsRaw || [];
  selectedCamsFromLs.forEach((el: string) => {
    let groupOfCamera = getParentObjectKey(el);

    if (
      !newGroups.includes(groupOfCamera) &&
      getIdByObjectKey(activeObjectId) !== groupOfCamera
    ) {
      newGroups.push(groupOfCamera);
    }

    realIds.push(getIdByObjectKey(el));
    mapObjectWithProperty(cameras, { ID: getIdByObjectKey(el) }, "ID");
  });

  let ID = getIdByObjectKey(activeObjectId);
  //Важно при восстановлении воссоздать структуру групп
  mapObjectWithProperty(groups, { ID, NAME, OBJECT: objectTypes.GROUP }, "ID");

  //Проверяем что массив новых групп не пустой и только тогда добавляем их в redux
  if (newGroups.length !== 0 && allSelectedGroupLs) {
    newGroups.forEach(el => {
      let elName = allSelectedGroupLs.filter(
        (currentObject: restoreSelectedFromLsWorkerAllSelectedGroupLsType) => {
          return currentObject.id !== el.toString();
        }
      );
      mapObjectWithProperty(
        groups,
        { ID: el.toString(), NAME: elName, OBJECT: objectTypes.GROUP },
        "ID"
      );
    });
  }

  //Активный родитель не может равняться undefined
  if (currentGroupFromLs.activeObjectId !== "undefined") {
    //Важно при восстановлении структуру текущего объекта
    mapObjectWithProperty(
      objectsState,
      {
        ...ObjectStateSchema,
        id: currentGroupFromLs.activeObjectId,
        relationId: ID,
        RELATION_OBJECT: objectTypes.GROUP,
        parentId: "0_16",
      },
      "id"
    );
  } else {
    //@todo почему это не может?
    sendErrorToSentry(`Активный родитель не может равняться undefined`, {
      place: "src/modules/flist/saga.js",
    });
  }

  //Проверяем что массив новых групп не пустой и только тогда добавляем их в redux
  if (newGroups.length !== 0) {
    newGroups.forEach(el => {
      mapObjectWithProperty(
        objectsState,
        {
          ...ObjectStateSchema,
          id: createFormattedActiveParentObject("16", el),
          relationId: ID,
          RELATION_OBJECT: objectTypes.GROUP,
          parentId: "0_16",
        },
        "id"
      );
    });
  }

  //Получить все корневую директорию
  yield put(getGroupAction("0", "null"));
  //Вернуться сюда после окончания действия вверху
  yield take(
    //TODO усилить типизацию в будущих коммитах
    (action: any) =>
      action.type === actionTypes.GET_GROUP_COMPLETE &&
      action.payload &&
      action.payload.groupId === "0"
  );

  //Получить все основные группы городов
  yield put(getGroupAction("16", "0_16"));
  //Вернуться сюда после окончания действия вверху
  yield take(
    //TODO усилить типизацию в будущих коммитах
    (action: any) =>
      action.type === actionTypes.GET_GROUP_COMPLETE &&
      action.payload &&
      action.payload.groupId === "16"
  );
  yield put(getGroupAction(ID, currentGroupFromLs.activeObjectId));
  // eslint-disable-next-line
  //Пробуем получить данные
  const { success, error } = yield race({
    success: take(
      //TODO усилить типизацию в будущих коммитах
      (action: any) =>
        action.type === actionTypes.GET_GROUP_COMPLETE &&
        action.payload &&
        action.payload.groupId === ID
    ),
    error: take(
      //TODO усилить типизацию в будущих коммитах
      (action: any) =>
        action.type === actionTypes.GET_GROUP_ERROR &&
        action.payload &&
        action.payload.groupId === ID
    ),
  });
  if (success && ID) {
    yield take(actionTypes.UPDATE_LIST);
    const updatedObjectsState = yield select(objectsStateSelector);
    if (selectedCamsFromLs === null) return true;
    if (updatedObjectsState && updatedObjectsState.byId) {
      const selectedObjects = Object.values(updatedObjectsState.byId)
        .filter(
          //TODO усилить типизацию в будущих коммитах
          (item: any) =>
            selectedCamsFromLs[item.id] &&
            selectedCamsFromLs[item.id].relationId === item.relationId
        )
        //TODO усилить типизацию в будущих коммитах
        .map((item: any) => item.id);
      if (Array.isArray(selectedObjects) && selectedObjects.length > 0) {
        yield put(setActiveObjectIdAction("0_16"));
        yield put(setSelectedObjectsAction(selectedObjects));
        return true;
      }
    }
  } else if (error) {
    sendErrorToSentry(`Ошибка при восстановлении групп ${error}`);
  }

  if (realIds && realIds.length > 0) {
    yield put(getLimitedInfoStartAction(realIds, selectedCamsFromLs));
  }

  // Восстанавление списка полностью выбранных групп
  if (fullSelectedGroupLs && fullSelectedGroupLs.length > 0) {
    yield put(updateFullSelectedGroupsAction(fullSelectedGroupLs));
  }

  return false;
};

//@todo пилить на 2 селектора - для камеры и для группы.

/**
 * Срабатывает при выборе камеры
 * Обработчик actionа SELECT_TOGGLE_START
 * @param {string} id
 */
export const selectStartWorker = function*({
  payload,
}: selectStartWorkerType): any {
  const { id } = payload;

  const [
    objects,
    selectedObjects,
    currentCameras,
    currentGroups,
    currentFullSelectedGroups,
  ] = yield all([
    select(objectsStateSelector),
    select(selectedObjectsSelector),
    select(camerasSelector),
    select(groupsSelector),
    select(fullSelectedGroupsSelector),
  ]);

  let toggleIds: Array<string> = [];

  const [groupId, realId] = id.split("_");

  const groupAlreadySelected = currentFullSelectedGroups.find(
    (selectedObject: fullSelectedGroup) => selectedObject.ID === Number(realId)
  );
  const cameraInAlreadySelected = currentFullSelectedGroups.find(
    (selectedObject: fullSelectedGroup) => selectedObject.ID === Number(groupId)
  );

  //Если мы выбрали единичную камеру
  if (objects.byId[id].RELATION_OBJECT === objectTypes.CAMERA) {
    toggleIds.push(id);
    // Группа перестает быть полностью выбранной, если исключается элемент из этой группы
    if (cameraInAlreadySelected) {
      const filteredAllSelectedGroups = currentFullSelectedGroups.filter(
        (selectedObject: fullSelectedGroup) =>
          selectedObject.ID !== Number(groupId)
      );
      yield put(updateFullSelectedGroupsAction(filteredAllSelectedGroups));
    }
    //Проверяем нужно ли актуализаровать.
    if (currentCameras.byId[realId] && !currentCameras.byId[realId].HLS) {
      yield put(getLimitedInfoStartAction([realId], [id]));
    }
  } else {
    // если это группа (Если мы выбрали в FCamListheader - все камеры которые в списке)
    if (
      objects.byId[id] &&
      objects.byId[id].RELATION_OBJECT === objectTypes.GROUP &&
      Array.isArray(objects.byId[id].children) &&
      objects.byId[id].children.length > 0
    ) {
      //Создаем новый массив чтобы не было ссылки на объект ссылки.
      const childrenIdsOfGroup = createNewArrayWithoutLink(
        objects.byId[id].children
      );

      //Здесь мы проверяем что в массив выбраннных для обновления камер не попали случайно группы иначе мы получим ошибка
      const filteredIds = childrenIdsOfGroup.filter((el: string) => {
        return objects.byId[el].RELATION_OBJECT === objectTypes.CAMERA;
      });

      toggleIds = toggleIds.concat(filteredIds);

      // если группа есть - исключаем
      if (groupAlreadySelected) {
        const filteredFullSelectedGroups = currentFullSelectedGroups.filter(
          (selectedObject: fullSelectedGroup) =>
            selectedObject.ID !== Number(realId)
        );
        yield put(updateFullSelectedGroupsAction(filteredFullSelectedGroups));
      } else {
        currentFullSelectedGroups.push({
          ID: Number(realId),
          NAME: currentGroups.byId[realId].NAME,
        });
        yield put(updateFullSelectedGroupsAction(currentFullSelectedGroups));
      }
    }
  }

  let newSelectedObjects: any = [];

  if (objects.byId[id].RELATION_OBJECT === objectTypes.GROUP) {
    if (groupAlreadySelected) {
      newSelectedObjects = [
        ...selectedObjects.filter((item: string) => !toggleIds.includes(item)),
      ];
    } else {
      const filteredIds = toggleIds.filter(
        (item: string) => !selectedObjects.includes(item)
      );
      newSelectedObjects = [...selectedObjects, ...filteredIds];
    }
  } else if (objects.byId[id].RELATION_OBJECT === objectTypes.CAMERA) {
    if (!selectedObjects.includes(id)) {
      newSelectedObjects = [...selectedObjects, ...toggleIds];
    } else {
      newSelectedObjects = [
        ...selectedObjects.filter((item: string) => !toggleIds.includes(item)),
      ];
    }
  }

  yield put(setSelectedObjectsAction(newSelectedObjects, true));
};

/**
 * Запускается  при перезагрузки страницы и при выборе камеры
 * @param {Array} selectedObjects
 */
export const setSelectedObjectsWorker = function*({ payload }: any): any {
  const { selectedObjects, noUseLs } = payload;

  /**
   * Если выбранных камер на данный момент нет
   * то очищаем localStorage и выходим из функции
   */
  if (selectedObjects.length === 0) {
    removeSelectedCamsFromLs();
    removeSelectedGroupFromLs();
    return;
  }

  const [
    objects,
    groups,
    activeObjectIdSelect,
    currentGroupFromLs,
  ] = yield all([
    select(objectsStateSelector),
    select(groupsSelector),
    select(activeObjectIdSelector),
    getCurrentGroupFromLs(),
  ]);

  const selectedCams = selectedObjects;

  let newSelected = [];

  if (noUseLs) {
    newSelected = [...selectedCams];
  } else {
    const selectedCamsFromLs = getSelectedCamsFromLs() ?? [];
    newSelected = [...selectedCamsFromLs, ...selectedCams];
  }

  yield setSelectedCamsToLs(Array.from(new Set(newSelected)));

  /* 
    Boolean ключ для проверки что текущего родителя уже нет в группе
    По умолчанию false
  */
  let isDuplicate = false;

  /*
    ?? два вопросительных знака это сравнение с null и undefined и если true то будет равно 0
    Если ничего нет в LS в ключе activeObjectId объекта currentGroupFromLs то устанавливаем 0
    console.log может тут поставить не default value а ошибку валить и перезагрузку
  */

  const activeObjectIdLs = currentGroupFromLs?.activeObjectId ?? "0_16";

  /**
   * Получаем id именно группы так как ключи
   * лежат в виде id-родитель__id-группы
   */
  const realId = getIdByObjectKey(activeObjectIdLs);

  /**
   * Получаем все выделенные группы из LS
   *  Устанавливаем группы в которых когда либо выбирались камеры в
    все группы выделенных камер в LS
    Если ничего нет в LS из выбранных камер то просто массив будет пустым
   */

  const allSelectedGroupLs = getAllSelectedGroupsFromLs() ?? [];

  /**
   * Проверяем что если ключ LS не пустой в нем есть группы
   */
  if (allSelectedGroupLs.length > 0) {
    /**
     * Получить ID групп
     */
    //TODO: Усилить типизацию
    let valueArr = allSelectedGroupLs.map(function(item: any) {
      return item.ID.toString();
    });

    /**
     * Если хотя бы одно значение id
     * содержиться в массиве групп то значение
     * isDuplicate будет true
     */
    //TODO: Усилить типизацию
    isDuplicate = valueArr.some(function(item: any) {
      return item === realId;
    });
  }
  /*
    Проверяем что новая группа не дубликат и у нее есть readID(id группы)  и что он в наших группах в store
  */
  if (!isDuplicate && realId && groups.byId[realId]) {
    allSelectedGroupLs.push({
      ID: realId,
      NAME: groups.byId[realId].NAME,
    });
    const allSelectedGroupLsSet = new Set(allSelectedGroupLs);
    const newSelectedObjects = Array.from(allSelectedGroupLsSet.values());
    yield setAllSelectedGroupsToLs(newSelectedObjects);
  }

  /**
   * Проверяем что активный элемент есть в objects в store и это группа.
   * console.log поставить тут realId вместо activeObjectIdSelect?? они одни и те же проверить?
   */
  if (
    objects.byId[activeObjectIdSelect] &&
    objects.byId[activeObjectIdSelect].RELATION_OBJECT === objectTypes.GROUP
  ) {
    const groupFromStore = getRelationObject(
      objects.byId[activeObjectIdSelect],
      {
        [objectTypes.GROUP]: groups,
      }
    );

    /* 
      activeObjectId тут нужен чтобы у нас везде 
      одиннаково ложилось св-во activeObjectId в этот ключ LS
    */
    let activeObjectId = activeObjectIdSelect;

    /**
     * Вытаскиваем из объекта groupFromStore - ключ NAME
     */
    const { NAME } = groupFromStore;

    /* 
      Проверяем что активный элемент есть
      и у той группы которая выбрана есть имя
    */
    if (activeObjectId && NAME) {
      setCurrentGroupToLs({ activeObjectId, NAME });
    }
  }
};

/**
 * Проверить не требуется ли обновить список fullSelectedgroups
 * Может при выборе текущего id выбрались все камеры текущей группы.
 * @param {string} id
 */
export const checkFullSelectedGroupsWorker = function*({ payload }: any): any {
  const { selectedObjects } = payload;

  //Получаю текущий список элементов из objectsStateStore и Получаю текущий  список  fullSelectedGroups
  const [objectsStateStore, groupsStore] = yield all([
    select(objectsStateSelector),
    select(groupsSelector),
  ]);

  const allGroups: Set<string> = new Set();
  const newFullSelectedGroups: Set<string> = new Set();

  /**
   * Нам нужно собрать все группы из которых состоят наши выбранные элементы
   */
  selectedObjects.forEach((el: string) => {
    if (objectsStateStore?.byId[el]?.parentId) {
      allGroups.add(objectsStateStore.byId[el].parentId);
    }
  });

  const allGroupsArr: Array<string> = Array.from(allGroups.values());

  //Удобнее будет работать с массивом
  const objectsStateStoreArr = createArrFromObj(objectsStateStore.byId);

  allGroupsArr.forEach((element: string) => {
    //Получаю сколько должно всего камер должно быть в группе
    const childrenLength = objectsStateStoreArr.filter(
      (el: objectsState) =>
        el.parentId === element && el.RELATION_OBJECT === "CAMERA"
    ).length;

    const childrenOfGroup = objectsStateStore.byId[element].children;
    //Считаю сколько среди выбранных камер - камер которые принадлежат именно текущей группе
    const selectedLength = selectedObjects.filter((el: string) =>
      childrenOfGroup.includes(el)
    ).length;
    //Если выбраны все значит нужно добавить в полностью выбранные группы
    if (selectedLength === childrenLength) {
      newFullSelectedGroups.add(element);
    }
  });

  let newFullSelectedGroupsArr: fullSelectedGroup[] = [];

  newFullSelectedGroups.forEach((el: string) => {
    //TODO: Используем склееные id тут
    const idOfGroup = getIdByObjectKey(el);
    const nameOfGroup = groupsStore.byId[idOfGroup].NAME;
    if (idOfGroup && nameOfGroup) {
      newFullSelectedGroupsArr.push({ NAME: nameOfGroup, ID: +idOfGroup });
    }
  });

  //Если выбраны все тогда обновляю fullSelectedGroups
  //Иначе группа не заполнена удаляю из fullSelectedGroups
  yield put(updateFullSelectedGroupsAction(newFullSelectedGroupsArr));
};

/**
 * Поменять подстроку для поиска - после смена строки запускается поиск(searchStartWorker)
 * @param {string} searchString, - поисковая строка
 */
export const changeSearchStringWorker = function*({
  payload,
}: changeSearchStringWorkerType): any {
  const { searchString } = payload;
  yield put(searchStartAction(searchString));
};

/**
 * Осуществить поиск по подстроке searchString
 * @param {string} searchString, - поисковая строка
 */
export const searchStartWorker = function*({
  payload,
}: searchStartWorkerType): any {
  const { searchString } = payload;

  const [objectsState] = yield all([select(objectsStateSelector)]);

  objectsState.byId[SEARCH_ID] = {
    ...objectsState.byId[SEARCH_ID],
    children: [],
  };

  const removeIds = Object.values(objectsState.byId)
    .filter((object: any) => object.parentId === SEARCH_ID)
    .map((object: any) => object.id);

  yield put(
    updateObjectsAction(filterElementsFromObject(objectsState, removeIds))
  );

  if (searchString === "") {
    yield put(searchCompleteAction([], false));
    yield put(setActiveObjectIdAction("0_16"));
    return;
  }
  try {
    const { data, timeout } = yield race({
      data: call([apiMethods, apiMethods.search], searchString),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      throw new Error(`Request timeout. More ${DEFAULT_FETCH_TIMEOUT}`);
    }
    yield put(searchCompleteAction(data));
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
  yield put(
    groupLoadCompleteAction({
      data,
      groupId: SEARCH_ID,
      parentObjectId: SEARCH_ID,
    })
  );
  //Заносим то что это активный родитель Результаты
  yield put(setActiveObjectIdCompleteAction(SEARCH_ID));
};

/**
 * Сохранение текущей группы LS если вдруг мы до этого еше не сделала
 *  @param {string} id, - активный родитель
 */
export const saveCurrentGroupToLsWorker = function*({
  payload,
}: saveCurrentGroupToLsWorkerType): any {
  // это текущий id группы в формате "parent_id"
  const { id: activeObjectId } = payload;

  const groupsStore = yield select(groupsSelector);

  //null - корень.
  if (activeObjectId === null) {
    setCurrentGroupToLs(STREETS_ONLINE_CURRENT_GROUP);
  } else {
    //если поиск - пока не сохраняем.
    if (activeObjectId.startsWith("search")) return;
    try {
      if (validateActiveGroup(activeObjectId)) {
        // если переданная группа валидна - начинаем обработку.
        const [parentGroupId, groupId] = activeObjectId.split("_");
        // если есть в сторе - обрабатываем
        if (groupsStore.byId[groupId]) {
          if (typeof groupsStore.byId[groupId].NAME == "string") {
            //если все нормально - сохраняем.
            const NAME = groupsStore.byId[groupId].NAME;
            setCurrentGroupToLs({ activeObjectId, NAME });
          } else {
            // если переданная группа не валидна ставим 0_16 группу и имя Список камер
            throw new Error(
              `Переданная для сохранения в LS содержит не корректные значения ${groupsStore.byId[groupId]}`
            );
          }
        } else {
          // если нужной группы нет в сторе - выставляем значение по умолчанию. В будущем может нужно сделать дозагрузку?
          throw new Error(
            `Переданная для сохранения в LS текущая группа отсутсвует в состоянии ${activeObjectId}`
          );
        }
      } else {
        // если переданная группа отсутствует в сторе - ставим 0_16, @Список камер@
        throw new Error(
          `Переданная для сохранения в LS текущая группа не валидна ${activeObjectId} -> `
        );
      }
    } catch (error) {
      setCurrentGroupToLs(STREETS_ONLINE_CURRENT_GROUP);
      sendErrorToSentry(error);
    }
  }
};

/**
 * Генерация списка объектов для модального окна FCamList
 */
export const setListWorker = function*(): any {
  const [
    objectsStore,
    activeObjectIdSelectStore,
    groupsStore,
    camerasStore,
  ] = yield all([
    select(objectsStateSelector),
    select(activeObjectIdSelector),
    select(groupsSelector),
    select(camerasSelector),
  ]);

  const mappedList = Object.values(objectsStore.byId)
    .filter((item: any) => {
      /*
        FIXME: todo@ фильтр по значение id  - 16_search и search это  костыль
        чтобы в папках не появлились сами результаты поиска
      */
      return (
        item.parentId === activeObjectIdSelectStore &&
        item.id !== "16_search" &&
        item.id !== "search"
      );
    })
    //Определяем что это камера или группа камер
    .map((object: any) => {
      const relation = getRelationObject(object, {
        [objectTypes.CAMERA]: camerasStore,
        [objectTypes.GROUP]: groupsStore,
      });
      return { ...object, relation: { ...relation } };
    });

  //Устанавливаем новое значение в listStore.
  yield put(setListAction(mappedList));
};

/**
 * Восстановление Localstorage по умолчанию город Челябинск
 */
const fillLsWithDefaultDataWorker = function*(): any {
  const objectsStateStore = yield select(objectsStateSelector);

  /**
   * Грузим 0(корневую директорию) для имен групп в улицах
   */
  yield put(getGroupAction("0", null));

  //Дожидаемся выполнение прерыдущего действия и возвращаемся сюда

  yield take(
    //TODO: усилить типизацию в будущих коммитах
    (action: any) =>
      action.type === actionTypes.GET_GROUP_COMPLETE &&
      action.payload &&
      action.payload.groupId === "0"
  );

  /**
   * Грузим 16 для имен групп в улицах
   */
  yield put(getGroupAction("16", "0_16"));
  //Дождаться выполнение всех действий и вернуться сюда

  yield take(
    //TODO: усилить типизацию в будущих коммитах
    (action: any) =>
      action.type === actionTypes.GET_GROUP_COMPLETE &&
      action.payload &&
      action.payload.groupId === "16"
  );

  /**
   * @todo добавить контроллер определения города
   *  если ничего нет в localStorage то Челябинск
   *
   */
  yield put(getGroupAction(defaultCity, defaultParentCity));

  //Дождаться завершения формирования группы затем тут продолжить
  yield take(
    //TODO усилить типизацию в будущих коммитах
    (action: any) =>
      action.type === actionTypes.GET_GROUP_COMPLETE &&
      action.payload &&
      action.payload.groupId === defaultCity
  );
  /**
   * Устаналиваем активным родителем Челябинск
   */
  yield put(setActiveObjectIdAction(defaultParentCity));

  /**
   * Из тех значений что есть в objectsStateStore в store значения объекта
   *  далее фильтруем те что значения в которых есть id и его значение начинается с 239__
   * В итоге мы складываем только отобранные idшники
   */
  const defaultObjectsIds: Array<string> = Object.values(objectsStateStore.byId)
    .filter((item: any) => item.id && item.id.startsWith("239_"))
    .map((item: any) => item.id);

  yield setSelectedCamsToLs(defaultObjectsIds);
  yield put(setSelectedObjectsAction(defaultObjectsIds));

  const defaultData = { ID: 239, NAME: "Челябинск" };
  const { ID, NAME } = defaultData;

  yield put(updateFullSelectedGroupsAction([defaultData]));

  let activeObjectId = defaultParentCity;

  /**
   * Сохраняем текущую группу в LS
   */
  yield setCurrentGroupToLs({ activeObjectId, NAME });

  /**
   * Устаналиваем текущую группу в массив всех выделенных групп LS
   */
  const selectGroupLs = [];
  selectGroupLs.push({ ID, NAME });
  yield setAllSelectedGroupsToLs(selectGroupLs);
};
