type downloadVideoData = {
  cameraId: number;
  startTimeAsString: string;
  stopTimeAsString: string;
};

type checkVideoData = {
  cameraId: number;
  startTimeAsString: string;
  stopTimeAsString: string;
};

type checkAndGetVideoData = {
  jobId: number;
  cameraId: number;
};

type selectedTimestampData = {
  selectedTimestamp: number;
  timelineOffsetInMs: number;
  videoPlayerOffsetInSeconds: number;
  live: boolean;
  cameraId: number;
  playerUrl: string;
  fragmentOffset: number;
  loadedStart: number;
  loadedEnd: number;
};

interface DownloadVideoData {
  downloadLink: string | undefined;
  name: string | undefined;
}

interface ProcessEnv {
  [key: string]: string | undefined;
}

interface movementRequestData {
  CAMERA_ID: number;
  START_DATE: Date;
  END_DATE?: Date;
}
