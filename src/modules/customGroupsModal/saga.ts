import {
  fork,
  select,
  takeLatest,
  all,
  put,
  race,
  call,
  delay,
} from "redux-saga/effects";

import { actionTypes, openListGroupsModalAction } from "./actions";

import {
  setPersonalGroupsForUserAction,
  getPersonalGroupsForUserAction,
  setCurrentGroupNameAction,
  setActivePersonalGroupAction,
  updateCamerasInFlistAction,
  setCurrentCameraIdAction,
  changeCustomGroupAction,
} from "./actions";

import {
  selectPersonalGroups,
  selectActivePersonalGroup,
  selectCurrentCameraId,
} from "./selectors";

import { getIdByObjectKey } from "../flist";

import {
  setLinkNameAction,
  setSelectedObjectsAction,
} from "../customGroupsFlist/actions";

import { selectedObjectsCustomGroupSelector } from "../customGroupsFlist/selectors";

import {
  selectedObjectsSelector as selectedCamerasFlistSelector,
  camerasSelector,
} from "../flist/selectors";

import {
  cleanAllAction as cleanAllFlistAction,
  setActiveObjectIdAction as setActiveObjectIdFlistAction,
  getLimitedInfoStartAction,
} from "../flist/actions";

import sendErrorToSentry from "../../helpers/sentry";

import apiMethods from "../../helpers/api/apiMethods";
import { DEFAULT_FETCH_TIMEOUT } from "../../helpers/api";
import { notifyError, notifyInfo } from "../../helpers/toast";
import { parseCamsIds } from "../flist/helpers";
import { mapObjectWithProperty } from "../../helpers/collections";
import { setSelectedCamsToLs } from "../../helpers/flist";

export const saga = function*() {
  yield all([
    fork(getPersonalGroupsWatcher),
    fork(actionsPersonalGroupForUserWatcher),
    fork(editModeWatcher),
    fork(setActivePersonalGroupWatcher),
    fork(addSelectedCamerasFromFlistInCustomGroupWatcher),
    fork(changeCustomGroupWatcher),
    fork(editCameraInCustomGroupWatcher),
  ]);
};

export const getPersonalGroupsWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.GET_PERSONAL_GROUPS_FOR_USER as any,
      getPersonalGroupsWorker
    ),
  ]);
};

export const actionsPersonalGroupForUserWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.ADD_PERSONAL_GROUP_FOR_USER as any,
      addPersonalGroupForUserWorker
    ),
    takeLatest(
      actionTypes.DELETE_PERSONAL_GROUP_FOR_USER as any,
      deletePersonalGroupForUserWorker
    ),
    takeLatest(
      actionTypes.EDIT_PERSONAL_GROUP_FOR_USER as any,
      editPersonalGroupForUserWorker
    ),
  ]);
};

export const editModeWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.OPEN_EDIT_GROUP_MODAL as any,
      openEditGroupModalWorker
    ),
    takeLatest(actionTypes.OPEN_EDIT_MODE as any, openEditModeWorker),
  ]);
};

export const setActivePersonalGroupWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.SET_ACTIVE_PERSONAL_GROUP as any,
      setActivePersonalGroupWorker
    ),
    takeLatest(
      actionTypes.UPDATE_CAMERAS_IN_FLIST as any,
      updateCamerasInFlistWorker
    ),
  ]);
};
export const addSelectedCamerasFromFlistInCustomGroupWatcher = function*() {
  yield all([
    takeLatest(
      actionTypes.ADD_SELECTED_CAMERAS_FROM_FLIST_IN_CUSTOM_GROUP as any,
      addSelectedCamerasFromFlistInCustomGroupWorker
    ),
  ]);
};

export const changeCustomGroupWatcher = function*() {
  yield takeLatest(
    actionTypes.CHANGE_CUSTOM_GROUP as any,
    changeCustomGroupWorker
  );
};

export const editCameraInCustomGroupWatcher = function*() {
  yield takeLatest(
    actionTypes.EDIT_CAMERA_IN_CUSTOM_GROUP as any,
    editCameraInCustomGroupWorker
  );
};

/**
 * Получение персональных групп пользователя
 */
export const getPersonalGroupsWorker = function*() {
  try {
    const { data, timeout } = yield race({
      data: call([apiMethods, apiMethods.getPersonalGroups]),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      throw new Error(
        `Request timeout in getPersonalGroupsWorker. More ${DEFAULT_FETCH_TIMEOUT}`
      );
    }
    yield put(setPersonalGroupsForUserAction(data));
  } catch (e) {
    sendErrorToSentry(`Ошибка при получение групп + ${e.message}`);
  }
};

/**
 * Добавть персональную группу пользователя
 */
export const addPersonalGroupForUserWorker = function*({ payload }: any): any {
  const { personalGroupName } = payload;

  const [selectedObjectsCustomGroupStore] = yield all([
    select(selectedObjectsCustomGroupSelector),
  ]);

  //FIXME: Когда нибудь избавиться от склееных ID камер
  //Получаем из наших склееных данных только id камер(выпарсовываем их)
  const cameraIds = parseCamsIds(selectedObjectsCustomGroupStore, true);

  try {
    const { data, timeout } = yield race({
      data: call([apiMethods, apiMethods.addPersonalGroup], {
        name: personalGroupName,
        customIds: selectedObjectsCustomGroupStore,
        cameraIds: cameraIds,
      }),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      throw new Error(
        `Request timeout in addPersonalGroupForUserWorker. More ${DEFAULT_FETCH_TIMEOUT}`
      );
    }
    if (data) {
      notifyInfo(`Группа ${personalGroupName} добавлена`);
      yield put(getPersonalGroupsForUserAction());
    }
  } catch (e) {
    notifyError(
      `Ошибка при создании группы ${personalGroupName}. Обратитесь к администратору`
    );
    sendErrorToSentry(`Ошибка при создании группы + ${e.message}`);
  }
};

/**
 * Необходимо обновить камеры в модуле flist - главном модуле отображения камер на экране
 */
export const addSelectedCamerasFromFlistInCustomGroupWorker = function*({
  payload,
}: any): any {
  const { isAddCameras } = payload;

  const [selectedFlistStore, selectedObjectsCustomGroupStore] = yield all([
    select(selectedCamerasFlistSelector),
    select(selectedObjectsCustomGroupSelector),
  ]);

  let newSelectedCameraIds;

  if (isAddCameras) {
    const newSelectedObjectsSet = new Set([
      ...selectedFlistStore,
      ...selectedObjectsCustomGroupStore,
    ]);
    newSelectedCameraIds = Array.from(newSelectedObjectsSet.values());
    notifyInfo("Вы добавили все текущие камеры в новую группу");
  } else {
    newSelectedCameraIds = selectedObjectsCustomGroupStore.filter(
      (item: any) => !selectedFlistStore.includes(item)
    );
    notifyInfo("Вы удалили все текущие камеры из новой группы");
  }

  yield put(setSelectedObjectsAction(newSelectedCameraIds));
};

/**
 * Удалить персональную группу пользователя
 */
export const deletePersonalGroupForUserWorker = function*({
  payload,
}: any): any {
  const { personalGroupName } = payload;

  const [personalGroupsStore] = yield all([select(selectPersonalGroups)]);

  const currentPersonalGroup = personalGroupsStore.find(
    (el: any) => el.name === personalGroupName
  );

  try {
    const { timeout } = yield race({
      data: call([apiMethods, apiMethods.deletePersonalGroup], {
        id: currentPersonalGroup.id,
      }),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      throw new Error(
        `Request timeout in deletePersonalGroupForUserWorker. More ${DEFAULT_FETCH_TIMEOUT}`
      );
    }
    notifyInfo(`Группа ${personalGroupName} удалена`);
    yield put(getPersonalGroupsForUserAction());
  } catch (e) {
    notifyError(
      `Ошибка при удалении группы ${personalGroupName}. Обратитесь к администратору`
    );
    sendErrorToSentry(`Ошибка при удалении группы + ${e.message}`);
  }
};

/**
 * Сгенерировать список для модального окна редактирования и установить название для редактирования
 */
export const openEditModeWorker = function*({ payload }: any): any {
  const { currentIdGroup } = payload;

  const [personalGroupsStore] = yield all([select(selectPersonalGroups)]);
  const currentPersonalGroup = personalGroupsStore.find(
    (el: any) => el.id === currentIdGroup
  );

  yield put(setActivePersonalGroupAction(currentIdGroup));
  yield put(setCurrentGroupNameAction(currentPersonalGroup.name));

  //FIXME: Когда нибудь отказаться от склееных ids
  const cameraIds = currentPersonalGroup.customIds;

  //Положить полученные камеры currentPersonalGroup.cameraIds в выбранные камеры модуль customGroupsFlist
  yield put(setSelectedObjectsAction(cameraIds));
};

/**
 * Изменить название для кнопки в случае открытия окна редактирования
 */
export const openEditGroupModalWorker = function*({ payload }: any): any {
  const { showEditGroupModalStatusStore } = payload;

  if (showEditGroupModalStatusStore) {
    yield put(setLinkNameAction("Редактировать список камер"));
  } else {
    yield put(setLinkNameAction(""));
    //Очистить выбранные камеры модуля customGroupsFlist
    yield put(setSelectedObjectsAction([]));
  }
};

/**
 * Отредактировать название группы и список камер в группе
 */
export const editPersonalGroupForUserWorker = function*({ payload }: any): any {
  const { personalGroupName } = payload;

  const [
    selectedObjectsCustomGroupStore,
    activePersonalGroupStore,
  ] = yield all([
    select(selectedObjectsCustomGroupSelector),
    select(selectActivePersonalGroup),
  ]);

  const cameraIds = parseCamsIds(selectedObjectsCustomGroupStore, true);

  try {
    const { timeout } = yield race({
      data: call([apiMethods, apiMethods.editPersonalGroup], {
        name: personalGroupName,
        cameraIds: cameraIds,
        customIds: selectedObjectsCustomGroupStore,
        id: activePersonalGroupStore,
      }),
      timeout: delay(DEFAULT_FETCH_TIMEOUT),
    });
    if (timeout) {
      throw new Error(
        `Request timeout in editPersonalGroupForUserWorker. More ${DEFAULT_FETCH_TIMEOUT}`
      );
    }
    notifyInfo(`Группа ${personalGroupName} обновлена`);
    //Обновляем список групп после редактирования
    yield put(getPersonalGroupsForUserAction());
  } catch (e) {
    notifyError(
      `Ошибка при редактировании группы ${personalGroupName}. Обратитесь к администратору`
    );
    sendErrorToSentry(`Ошибка при редактировании группы + ${e.message}`);
  }
};

/**
 * При выборе активной группы должен пересобраться список камер - очистить старый.
 */
export const setActivePersonalGroupWorker = function*({ payload }: any): any {
  const { activePersonalGroupArg } = payload;

  const [personalGroupsStore] = yield all([select(selectPersonalGroups)]);

  const currentPersonalGroup = personalGroupsStore.find(
    (el: any) => el.id === activePersonalGroupArg
  );

  //FIXME: Когда нибудь избавиться от склееных ID камер
  const cameraIds = currentPersonalGroup.customIds;

  const realIds = parseCamsIds(cameraIds);

  yield put(updateCamerasInFlistAction(realIds, cameraIds));
};

/**
 * Необходимо обновить камеры в модуле flist - главном модуле отображения камер на экране
 */
export const updateCamerasInFlistWorker = function*({ payload }: any): any {
  const { realIds, cameraIds } = payload;

  const [camerasFlistStore] = yield all([select(camerasSelector)]);

  cameraIds.forEach((el: string) => {
    mapObjectWithProperty(
      camerasFlistStore,
      { ID: getIdByObjectKey(el) },
      "ID"
    );
  });

  // очистим прошлый выбор камер
  yield put(cleanAllFlistAction());

  //Устаналиваем родителя по умолчанию умные улицы
  yield put(setActiveObjectIdFlistAction("0_16"));

  //Обновить объект групп и камер в store в модуле flist
  yield put(setSelectedObjectsAction(cameraIds));
  //Обновить информацию о камерах в модуле flist
  yield put(getLimitedInfoStartAction(realIds, cameraIds));

  //Делаем объекты выделенными по умолчанию
  yield setSelectedCamsToLs(cameraIds);
};

/**
 * Запустить изменение кастомных групп
 */
export const changeCustomGroupWorker = function*({ payload }: any): any {
  const { cameraId } = payload;

  //Следующий кусок нужен до рефакторинга по модулю flist для демонстрации работы - иначе работать не будет
  //впоследствии я его сам поправлю
  const [selectedCamerasStore, personalGroupsStore] = yield all([
    select(selectedCamerasFlistSelector),
    select(selectPersonalGroups),
  ]);

  //Впоследствии тут можно будет убрать getIdByObjectKey так как id перестанет быть склееным
  const selectedCamera = selectedCamerasStore.find(
    (el: string) => cameraId == getIdByObjectKey(el)
  );
  //Конец куска

  const newPersonalGroups = [...[], ...personalGroupsStore];

  //Нужно понять можно есть ли камера в группе и выводить в зависмости от этого checkbox

  for (let i = 0; i < personalGroupsStore.length; i++) {
    personalGroupsStore[i].hasSelectedCamera = personalGroupsStore[
      i
    ].customIds.includes(selectedCamera);
  }

  yield put(setPersonalGroupsForUserAction(personalGroupsStore));
  //TODO: Поправить после рефакторинга модуля flist - щас тут склееный ID
  yield put(setCurrentCameraIdAction(selectedCamera));
  yield put(openListGroupsModalAction(true));
};

/**
 * Запустить изменение кастомных групп
 */
export const editCameraInCustomGroupWorker = function*({ payload }: any): any {
  const { customGroupId, typeOfAction } = payload;

  const [personalGroupsStore, currentCameraId] = yield all([
    select(selectPersonalGroups),
    select(selectCurrentCameraId),
  ]);
  //Создать новый экземпляр массива чтобы не попадаться на ссылку
  const newPersonalGroupsStore = [...[], ...personalGroupsStore];
  //TODO: Поправить после рефакторинга модуля flist - щас тут склееный ID
  const newFormatCameraId = +getIdByObjectKey(currentCameraId);
  const currentCustomGroup = newPersonalGroupsStore.find(
    (el: any) => el.id == customGroupId
  );

  if (typeOfAction === "add") {
    //TODO: Поправить после рефакторинга модуля flist - щас тут склееный ID
    currentCustomGroup.customIds.push(currentCameraId);
    currentCustomGroup.cameraIds.push(newFormatCameraId);
  } else if (typeOfAction === "delete") {
    //TODO: Поправить после рефакторинга модуля flist - щас тут склееный ID
    const newCustomIds = currentCustomGroup.customIds.filter(
      (el: any) => el !== currentCameraId
    );
    const newCameraIds = currentCustomGroup.cameraIds.filter(
      (el: any) => el !== newFormatCameraId
    );

    currentCustomGroup.customIds = newCustomIds;
  }

  yield put(setPersonalGroupsForUserAction(newPersonalGroupsStore));
  yield put(changeCustomGroupAction(newFormatCameraId));
};
