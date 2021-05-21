const currentTimestamp = new Date().valueOf();
const fiveMinutesAsMs = 5 * 60 * 1000;

export const stateSchema = {
  cameraData: null,
  cameraName: null,
  playerUrl: "",

  currentVideoTimestamp: currentTimestamp,
  timelineInterval: {
    timelineStartPositionInMs: currentTimestamp - fiveMinutesAsMs,
    timelineEndPositionInMs: currentTimestamp,
  },

  archivePlaylistStartTimestamp: 0,
  currentVideoOffsetInSeconds: 0,
  newSelectedVideoOffsetInSeconds: 0,
  live: true,

  downloadMode: false,
  downloadRangeArray: [
    new Date(new Date().getTime() - 30 * 60 * 1000 - new Date().getSeconds()),
    new Date(new Date().getTime() - 15 * 60 * 1000 - new Date().getSeconds()),
  ],

  loadingProgress: false,
  errorMessage: null,
  downloadLink: null,
  name: null,

  currentPlaylistDurarion: null,
  canDownload: true,
};
