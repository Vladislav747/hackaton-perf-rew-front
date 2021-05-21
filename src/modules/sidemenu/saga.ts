import { fork, take, takeLatest, all, select, put } from "redux-saga/effects";

import {
  actionTypes,
  setSubmenuStreetsStatusAction,
  setSubmenuCustomGroupsStatusAction,
} from "./actions";

/** NewFlist */
import {
  changeGroupStartAction,
  addGroupToGroupsStoreAction,
  selectAllCamerasInCurrentGroup,
  actionTypes as actionTypesNewFlist,
  setSelectedObjectsFinishAction,
} from "../newFlist/actions";

import {
  openWarningModalAction,
  actionTypes as WarningModalActionTypes,
} from "../WarningModal";

import { getSelectedCamsFromLs } from "../../helpers/flist";

import { getGroupByGroupId } from "../newFlist/selectors";
import {setSelectedCamsToLs} from "../../helpers/newFlist";

export const saga = function*() {
  yield all([fork(chooseCityWatcher), fork(setSidemenuStatusWatcher)]);
};

export const chooseCityWatcher = function*() {
  yield all([takeLatest(actionTypes.CHOOSE_CITY, chooseCityWorker)]);
};

export const setSidemenuStatusWatcher = function*() {
  yield takeLatest(
    actionTypes.SET_EXTENDED_SIDEBAR_STATUS,
    setSidemenuStatusWorker
  );
};

/**
 * Выбор города. При выборе города все камеры получаются и каждая становиться checked
 * @param groupId
 * @param groupName
 */
export const chooseCityWorker = function*({ payload }: any) {
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

  const { groupId, groupName } = payload;

  //Если вдруг по какой то причине группа не попала в state groups ее необходимо занести
  const selectedGroup = yield select(getGroupByGroupId, { groupId });

  const newGroup = {
    groupId: { ID: groupId, NAME: groupName, OBJECT: "GROUP" },
  };

  if (!selectedGroup) {
    yield put(
      addGroupToGroupsStoreAction({
        groupId,
        groupContent: newGroup,
        parentId: 16,
      })
    );
  }

  //Устаналиваем текущую группу
  yield put(changeGroupStartAction(groupId, true));

  yield take(
    (action: Action) =>
      action.type === actionTypesNewFlist.SET_CURRENT_SELECTED_GROUP_FINISH &&
      action.payload &&
      action.payload.groupId === groupId
  );

  yield put(selectAllCamerasInCurrentGroup(groupId));
};

/**
 * Выбор города. При выборе города все камеры получаются и каждая становиться checked
 * @param id
 */
export const setSidemenuStatusWorker = function*({ payload }: any) {
  const { showExtendedSidebarStatusStore } = payload;

  if (showExtendedSidebarStatusStore === false) {
    yield put(setSubmenuStreetsStatusAction(false));
    yield put(setSubmenuCustomGroupsStatusAction(false));
  }
};
