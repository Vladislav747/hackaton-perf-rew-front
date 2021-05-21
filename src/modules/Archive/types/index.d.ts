interface updateEventsStartProps {
  CAMERA_ID: number;
  START_DATE: Date;
  END_DATE: Date;
}

type timelineIntervalData = {
  timelineStartPositionInMs: number;
  timelineEndPositionInMs: number;
};
interface archiveSagaShema {
  timelineInterval: timelineIntervalData;
  currentVideoTimestamp: number;

  downloadLink: string;
  name: string;
  loadingProgress: boolean;
  loadingSucess: boolean;
  errorMessage: string;
  userSeletedTimestamp: number;
  live: boolean;
  videoPlayerOffsetInSeconds: number;
  hdState: boolean;
  isOpenModalState: boolean;
  timelineInAction: boolean;
  isPlaying: boolean;
  timelineStartTimestamp: number;
  timelineEndTimestamp: number;
  timelineOffsetInMs: null | number;
  playerUrl: string;
  loadedStart: number;
  loadedEnd: number;
  fragmentOffset: number;

  archiveCursorLocked: boolean;
  speedCoefficient: number;
  downloadMode: boolean;
  downloadRangeArray: Date[];
  cameraData: any;
  cameraName: any;
  canDownload: boolean;
}

interface archiveSagaAction {
  type: string;
  payload: any;
}

interface cameraData {
  OBJECT: string;
  ID: number;
  NAME: string;
  SHORT_NAME: null;
  HLS: string;
  REALTIME_HLS: string;
  ADDRESS: null;
  PORCH: null;
  ACCESS: any;
  SNAPSHOT: any;
  ARCHIVE: any;
  COORDINATES: any;
}
