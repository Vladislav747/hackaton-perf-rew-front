type CameraSchema = {
  OBJECT: "CAMERA";
  ID: number;
  NAME: string;
  HLS: string;
  REALTIME_HLS: string;
  ACCESS: {
    LIVE: { STATUS: boolean; REASON: string };
    ARCHIVE: { STATUS: boolean; REASON: string };
    DOWNLOAD: { STATUS: boolean; REASON: string };
    MOVEMENT: { STATUS: boolean; REASON: string };
  };
  SNAPSHOT: {
    HD: string;
    LOSSY: string;
  };
  ARCHIVE: {
    LINK: string;
    START_TIME: string;
    STOP_TIME: string;
  };
};

type ContentSchema = { OBJECT: "GROUP"; ID: number; NAME: string };

type GroupSchema = {
  parentId: number | null;
  content: ContentSchema;
};

type CurrentSelectedGroup = {
  ID: number | string;
  NAME: string;
  PARENT_ID: number | null;
};

type NewFlistSchema = {
  selectedCamerasIds: number[];
  currentSelectedGroupId: number | customGroupId;
  /* Только методанные групп */
  groups: { [id in customGroupId]: GroupSchema };
  /* Только метаданные камер */
  cameras: { [id: number]: CameraSchema };
  /* Контент групп для рендеринга в списке */
  groupsContentById: groupsContentByIdSchema;
  isLoading: boolean;
  rootIsLoaded: boolean;
  loadFailed: boolean;
  isInit: boolean;
  searchString: string;
};

type groupsContentByIdSchema = {
  [id: number]: ContentSchema | CameraSchema | GroupSchema;
};

type customGroupId = number | Record<"search" | "own">;

type groupsSchema = { [id in customGroupId]: GroupSchema };

interface cleanOneCameraWorkerType {
  payload: cleanOneCameraWorkerTypePayload;
}

type cleanOneCameraWorkerTypePayload = {
  id: string;
};
