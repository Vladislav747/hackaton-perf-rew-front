interface newCleanOneCameraWorkerType {
  payload: newCleanOneCameraWorkerTypePayload;
}

type newCleanOneCameraWorkerTypePayload = {
  cameraId: string;
};

interface selectAllCamerasInCurrentGroupWorkerType {
  payload: selectAllCamerasInCurrentGroupWorkerTypePayload;
}

type selectAllCamerasInCurrentGroupWorkerTypePayload = {
  groupId: string;
};
