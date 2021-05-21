interface userSeletedTimestamp {
  timestamp: number;
  timelineOffset: number;
}

interface ArchiveProps {
  updateCameraEvents: Function;
  cleanCamerEvents: Function;
  orderVideo: Function;
  setUserSeletedTimestamp: Function;
  setLive: Function;
  setVideoPlayerOffsetInSeconds: Function;
  setHdState: Function;
  setIsOpenModalState: Function;
  setTimelineInAction: Function;
  timelineEndTimestamp: number;
  timelineStartTimestamp: number;
  archiveUrl: string;
  loadingState: boolean;
  cameraData: CameraData;

  videoLoadInProgress: boolean;
  liveUrl: string;
  cameraName: string;

  userSeletedTimestamp: number;
  live: boolean;
  videoPlayerOffsetInSeconds: number;
  hdState: boolean;
  isOpenModalState: boolean;
  timelineInAction: boolean;
  cameraId: string;
  setIsPlaying: Function;
  isPlaying: boolean;
  timelineOffsetInMs: number;
  playerUrl: string;
  loadedStart: number;
  loadedEnd: number;
  fragmentOffset: number;
  archiveCursorLocked: boolean;
  setArchiveCursorLocked: Function;
  setSpeedСoefficient: Function;
  downloadMode: boolean;
  downloadRangeArray: Date[];
  setDownloadMode: Function;
  setDownloadRangeArray: Function;
  setDownloadLink: Function;
  setDownloadName: Function;
  lastDownloadLink: string;
  lastDownloadName: string;
  loadingProgress: boolean;
  updateCameraData: Function;
  cleanCameraData: Function;
  setNeedUserStartPlayFlag: Function;
  userNeedToStartPlayManual: boolean;

  muteStatusPlayer: boolean;
  volumeLevelPlayer: string;

  setVolumeLevelPlayer: Function;
  setMuteStatusPlayer: Function;
  canDownload: boolean;
}

interface CameraData {
  ID: number;
  NAME: string;
  REALTIME_HLS: string;
  HLS: string;
  ACCESS: any;
}

interface onUpdateProgressBarHandlerProps {
  srcElement: any;
}
