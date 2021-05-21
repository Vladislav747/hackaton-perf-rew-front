interface cleanOneCameraWorkerType {
  payload: cleanOneCameraWorkerTypePayload;
}

type cleanOneCameraWorkerTypePayload = {
  id: string;
};

interface updateCamerasWorkerType {
  payload: updateCamerasWorkerTypePayload;
}

type cleanOneCameraWorkerTypePayload = {
  loadingLimitedIds: Array;
  loadingLimitedIdsForSelect: Array;
};

interface getGroupStartWorkerType {
  payload: getGroupStartWorkerTypePayload;
}

type getGroupStartWorkerTypePayload = {
  groupId: string;
  parentObjectId: string;
};

interface getGroupCompleteWorkerType {
  payload: getGroupCompleteWorkerTypePayload;
}

type getGroupCompleteWorkerTypePayload = {
  data: Array;
  groupId: string;
  parentObjectId: string;
};

interface setActiveObjectWorkerType {
  payload: setActiveObjectWorkerTypePayload;
}

type setActiveObjectWorkerTypePayload = {
  id: string;
  init: boolean;
};

type listInitStartWorkerDefaultObjectsIdsType = {
  id: string;
};

type restoreSelectedFromLsWorkerAllSelectedGroupLsType = {
  id: string;
};

interface selectStartWorkerType {
  payload: selectStartWorkerTypePayload;
}

type selectStartWorkerTypePayload = {
  id: string;
};

interface setSelectedObjectsWorkerType {
  payload: setSelectedObjectsWorkerTypePayload;
}

type setSelectedObjectsWorkerTypePayload = {
  selectedObjects: number[];
};

interface changeSearchStringWorkerType {
  payload: changeSearchStringWorkerTypePayload;
}

type changeSearchStringWorkerTypePayload = {
  searchString: string;
  searchStart?: boolean;
};

interface searchStartWorkerType {
  payload: searchStartWorkerTypePayload;
}

type searchStartWorkerTypePayload = {
  searchString: string;
};

interface searchCompleteWorkerType {
  payload: searchCompleteWorkerTypePayload;
}

type searchCompleteWorkerTypePayload = {
  data: object;
  forceSetActiveId: boolean;
};

interface searchCompleteWorkerType {
  payload: searchCompleteWorkerTypePayload;
}

interface saveCurrentGroupToLsWorkerType {
  payload: saveCurrentGroupToLsWorkerTypePayload;
}

type saveCurrentGroupToLsWorkerTypePayload = {
  id: string;
};

interface activeObjectCompleteActionPayload {
  id: string;
}
interface activeObjectCompleteWorkerProps extends Action {
  type: "SET_ACTIVE_OBJECT_ID_COMPLETE";
  payload: activeObjectCompleteActionPayload;
}

type setListWorkerType = {
  payload: string;
};

type setListWorkerTypePayload = {
  id: string;
};
