import {
  fork,
  select,
  takeLatest,
  all,
  put,
  race,
  call,
  delay,
  take,
} from "redux-saga/effects";

import {
  actionTypes,
  getGroupCompleteAction,
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
  changeSearchStringAction,
  setListAction,
} from "./actions";

import {
  objectsInCustomGroupSelector,
  objectCustomGroupSelector,
  selectedObjectsCustomGroupSelector,
  activeObjectIdCustomGroupSelector,
  camerasCustomGroupSelector,
  groupsCustomGroupSelector,
} from "./selectors";

import { objectTypes } from "./schema";

import {
  createFormattedActiveParentObject,
  getRelationObject,
  getIdByObjectKey,
  SEARCH_ID,
  ObjectStateSchema,
} from "../flist/schema";

import sendErrorToSentry from "../../helpers/sentry";
import apiMethods from "../../helpers/api/apiMethods";
import { DEFAULT_FETCH_TIMEOUT } from "../../helpers/api";
import {
  mapObjectWithProperty,
  filterElementsFromObject,
} from "../../helpers/collections";

export const saga = function*() {
  yield all([
    fork(getGroupSagaWatcher),
    fork(activeObjectWatcher),
    fork(listInitSagaWatcher),
    fork(selectSagaWatcher),
    fork(searchSagaWatcher),
    fork(cleanWatcher),
    fork(updateCameraWatcher),
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
  ]);
};

export const listInitSagaWatcher = function*() {
  yield all([takeLatest(actionTypes.INIT_LIST_START, listInitStartWorker)]);
};

export const selectSagaWatcher = function*() {
  yield all([
    takeLatest(actionTypes.SELECT_TOGGLE_START as any, selectStartWorker),
    takeLatest(
      actionTypes.SET_SELECTED_OBJECTS as any,
      setSelectedObjectsWorker
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

/**
 * Обработка нажатие корзины Удалить все
 */
export const cleanAllWorker = function*() {
  yield put(setActiveObjectIdCompleteAction("0_16"));

  //Очищаем все выбранные камеры
  yield put(setSelectedObjectsAction([]));
};

/**
 * Обработчик удаления одной камеры из выделенных
 * @param {string} id - id камеры
 */
export const cleanOneCameraWorker = function*({
  payload,
}: cleanOneCameraWorkerType): any {
  const { id } = payload;

  let [selectedObjects] = yield all([
    select(selectedObjectsCustomGroupSelector),
  ]);

  //id приходит к нам как число - поэтому приводим к строке
  const selectObjectsFitlered: Array<string> = selectedObjects.filter(
    (el: string) => getIdByObjectKey(el) !== id.toString()
  );
  //Вывел отдельное действие для удаление в store чтобы разделить логику

  yield put(setSelectedObjectsFilterAction(selectObjectsFitlered));
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
      select(camerasCustomGroupSelector),
      select(selectedObjectsCustomGroupSelector),
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
export const getGroupStartWorker = function*({
  payload,
}: getGroupStartWorkerType) {
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
    yield put(getGroupCompleteAction({ data, groupId, parentObjectId }));
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
    select(camerasCustomGroupSelector),
    select(groupsCustomGroupSelector),
    select(objectsInCustomGroupSelector),
    /**
     * Тут отбор элемента в objectState в store по элементу id
     */
    select(objectCustomGroupSelector, { id: parentObjectId }),
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

/**
 * Обработчик при установке активного элемента
 * @param {string} id
 */
const setActiveObjectStartWorker = function*({
  payload,
}: setActiveObjectWorkerType): any {
  const { id } = payload;

  const [objectsState, groupsState] = yield all([
    select(objectsInCustomGroupSelector),
    select(groupsCustomGroupSelector),
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
  }
};

/**
 * Запускается при обновлении страницы
 * или при первом запуске страницы
 */
const listInitStartWorker = function*(): any {
  /**
   * Грузим 16 для имен групп в улицах
   */
  yield put(getGroupAction("0", null));
  //Дождаться выполнение всех действий и вернуться сюда

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

  yield put(initListCompleteAction());
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
    objectsInCustomGroupStore,
    selectedObjectsStore,
    currentCamerasStore,
  ] = yield all([
    select(objectsInCustomGroupSelector),
    select(selectedObjectsCustomGroupSelector),
    select(camerasCustomGroupSelector),
  ]);

  let toggleIds: Array<string> = [];

  const [groupId, realId] = id.split("_");

  if (
    objectsInCustomGroupStore.byId[id].RELATION_OBJECT === objectTypes.CAMERA
  ) {
    toggleIds.push(id);
    //Проверяем нужно ли актуализаровать.
    if (
      currentCamerasStore.byId[realId] &&
      !currentCamerasStore.byId[realId].HLS
    ) {
      yield put(getLimitedInfoStartAction([realId], [id]));
    }
  }

  let newSelectedObjects: any = [];

  if (
    objectsInCustomGroupStore.byId[id].RELATION_OBJECT === objectTypes.GROUP
  ) {
    const filteredIds = toggleIds.filter(
      (item: string) => !selectedObjectsStore.includes(item)
    );
    newSelectedObjects = [...selectedObjectsStore, ...filteredIds];
  } else if (
    objectsInCustomGroupStore.byId[id].RELATION_OBJECT === objectTypes.CAMERA
  ) {
    if (!selectedObjectsStore.includes(id)) {
      newSelectedObjects = [...selectedObjectsStore, ...toggleIds];
    } else {
      newSelectedObjects = [
        ...selectedObjectsStore.filter(
          (item: string) => !toggleIds.includes(item)
        ),
      ];
    }
  }

  yield put(setSelectedObjectsAction(newSelectedObjects, true));
};

/**
 * Запускается  при перезагрузки страницы и при выборе камеры
 * @param {Array} selectedObjects
 */
export const setSelectedObjectsWorker = function*({
  payload,
}: setSelectedObjectsWorkerType): any {
  const { selectedObjects } = payload;

  const [objectsInCustomGroupStore, groups, activeObjectIdStore] = yield all([
    select(objectsInCustomGroupSelector),
    select(groupsCustomGroupSelector),
    select(activeObjectIdCustomGroupSelector),
  ]);

  const selectedCams = selectedObjects;
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

  const [objectsInCustomGroupStore] = yield all([
    select(objectsInCustomGroupSelector),
  ]);

  objectsInCustomGroupStore.byId[SEARCH_ID] = {
    ...objectsInCustomGroupStore.byId[SEARCH_ID],
    children: [],
  };

  const removeIds = Object.values(objectsInCustomGroupStore.byId)
    .filter((object: any) => object.parentId === SEARCH_ID)
    .map((object: any) => object.id);

  yield put(
    updateObjectsAction(
      filterElementsFromObject(objectsInCustomGroupStore, removeIds)
    )
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
    getGroupCompleteAction({
      data,
      groupId: SEARCH_ID,
      parentObjectId: SEARCH_ID,
    })
  );
  //Заносим то что это активный родитель Результаты
  yield put(setActiveObjectIdCompleteAction(SEARCH_ID));
};

/**
 * Генерация списка объектов для модального окна FCamList
 */
export const setListWorker = function*(): any {
  const [
    objectsInCustomGroupStore,
    activeObjectIdSelectStore,
    groupsStore,
    camerasStore,
  ] = yield all([
    select(objectsInCustomGroupSelector),
    select(activeObjectIdCustomGroupSelector),
    select(groupsCustomGroupSelector),
    select(camerasCustomGroupSelector),
  ]);

  const mappedList = Object.values(objectsInCustomGroupStore.byId)
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
